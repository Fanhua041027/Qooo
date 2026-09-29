import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiagnosisStatus, Prisma } from '@prisma/client';
import { ApiError } from '../../common/api-error';
import { ErrorCode } from '../../common/error-codes';
import { currentContext, requestContext } from '../../common/request-context';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { RabbitQueueService } from '../../infrastructure/queue/rabbit-queue.service';
import { FarmService } from '../farm/farm.service';
import { DIAGNOSIS_AI_PROVIDER, DiagnosisAiProvider } from './ai-provider';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { ListDiagnosisDto } from './dto/list-diagnosis.dto';
import { VerifyDiagnosisDto } from './dto/verify-diagnosis.dto';
import { canTransitionJev, type JevStage } from './jev-policy';

const DIAGNOSIS_QUEUE = 'diagnosis.analyze';

interface DiagnosisJob {
  diagnosisId: string;
  requestId: string;
  traceId: string;
}

@Injectable()
export class DiagnosisService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queue: RabbitQueueService,
    private readonly farms: FarmService,
    @Inject(DIAGNOSIS_AI_PROVIDER) private readonly ai: DiagnosisAiProvider,
  ) {}

  onModuleInit() {
    this.queue.registerHandler<DiagnosisJob>(DIAGNOSIS_QUEUE, (job) =>
      requestContext.run({ requestId: job.requestId, traceId: job.traceId }, () => this.processDiagnosis(job.diagnosisId)),
    );
  }

  async create(userId: string, input: CreateDiagnosisDto) {
    const existing = await this.prisma.diagnosis.findUnique({
      where: { userId_clientRequestId: { userId, clientRequestId: input.clientRequestId } },
      include: { images: true },
    });
    if (existing) return this.present(existing);

    if (!input.images.length && !input.description?.trim()) {
      throw new ApiError(
        ErrorCode.DIAGNOSIS_EVIDENCE_REQUIRED,
        '请至少提供一张图片或症状描述',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (input.images.length) {
      const objectKeys = input.images.map((image) => image.objectKey);
      const ownedFileCount = await this.prisma.fileObject.count({
        where: { userId, objectKey: { in: objectKeys }, status: 'ready' },
      });
      if (ownedFileCount !== new Set(objectKeys).size) {
        throw new ApiError(ErrorCode.FILE_NOT_FOUND, '诊断图片不存在或不属于当前用户', HttpStatus.BAD_REQUEST);
      }
    }

    let farmId = input.farmId;
    if (input.plotId) {
      const plot = await this.farms.requirePlot(userId, input.plotId);
      farmId = plot.farmId;
    } else if (farmId) {
      await this.farms.requireFarm(userId, farmId);
    }

    const context = currentContext();
    let diagnosis;
    try {
      diagnosis = await this.prisma.diagnosis.create({
        data: {
          userId,
          farmId,
          plotId: input.plotId,
          clientRequestId: input.clientRequestId,
          cropName: input.cropName,
          growthStage: input.growthStage,
          description: input.description,
          requestId: context.requestId,
          traceId: context.traceId,
          images: {
            create: input.images.map((image) => ({
              objectKey: image.objectKey,
              width: image.width,
              height: image.height,
              quality: image.quality as Prisma.InputJsonValue | undefined,
            })),
          },
        },
        include: { images: true },
      });
    } catch (error) {
      // 并发请求可能同时通过前置查询，唯一键冲突时返回已经创建的记录即可。
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') throw error;
      const duplicate = await this.prisma.diagnosis.findUnique({
        where: { userId_clientRequestId: { userId, clientRequestId: input.clientRequestId } },
        include: { images: true },
      });
      if (!duplicate) throw error;
      return this.present(duplicate);
    }

    try {
      await this.publishDiagnosisJob(diagnosis.id, diagnosis.requestId, diagnosis.traceId);
    } catch (error) {
      await this.prisma.diagnosis.update({
        where: { id: diagnosis.id },
        data: { status: DiagnosisStatus.FAILED, failureCode: 'QUEUE_UNAVAILABLE', failureMessage: '诊断任务提交失败' },
      });
      throw error;
    }

    return this.present(diagnosis);
  }

  async list(userId: string, query: ListDiagnosisDto) {
    const status = query.status ? (query.status.toUpperCase() as DiagnosisStatus) : undefined;
    const items = await this.prisma.diagnosis.findMany({
      where: { userId, deletedAt: null, plotId: query.plotId, status },
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    });
    return { items: items.map((item) => this.present(item)), total: items.length };
  }

  async get(userId: string, id: string) {
    const diagnosis = await this.requireDiagnosis(userId, id);
    return this.present(diagnosis);
  }

  async retry(userId: string, id: string) {
    const diagnosis = await this.requireDiagnosis(userId, id);
    if (diagnosis.status !== DiagnosisStatus.FAILED && diagnosis.status !== DiagnosisStatus.NEED_MORE_IMAGES) {
      throw new ApiError(ErrorCode.DIAGNOSIS_INVALID_STATE, '当前诊断状态不能重试', HttpStatus.CONFLICT);
    }
    const updated = await this.prisma.diagnosis.update({
      where: { id },
      data: {
        status: DiagnosisStatus.CREATED,
        failureCode: null,
        failureMessage: null,
        result: Prisma.JsonNull,
        modelName: null,
        modelVersion: null,
        modelTraceId: null,
        expertReviewNeeded: false,
        completedAt: null,
      },
      include: { images: true },
    });
    try {
      await this.publishDiagnosisJob(id, updated.requestId, updated.traceId);
    } catch (error) {
      await this.prisma.diagnosis.update({
        where: { id },
        data: {
          status: DiagnosisStatus.FAILED,
          failureCode: 'QUEUE_UNAVAILABLE',
          failureMessage: '诊断任务提交失败，请稍后重试',
        },
      });
      throw error;
    }
    return this.present(updated);
  }

  async verify(userId: string, id: string, input: VerifyDiagnosisDto) {
    const diagnosis = await this.requireDiagnosis(userId, id);
    if (diagnosis.status !== DiagnosisStatus.COMPLETED && diagnosis.status !== DiagnosisStatus.NEED_EXPERT_REVIEW) {
      throw new ApiError(ErrorCode.DIAGNOSIS_INVALID_STATE, '当前诊断还不能提交复查结果', HttpStatus.CONFLICT);
    }
    const now = new Date().toISOString();
    const currentResult = diagnosis.result && typeof diagnosis.result === 'object' && !Array.isArray(diagnosis.result)
      ? diagnosis.result as Record<string, unknown>
      : {};
    const currentLoop = currentResult.loop && typeof currentResult.loop === 'object' && !Array.isArray(currentResult.loop)
      ? currentResult.loop as Record<string, unknown>
      : {};
    const stage = input.outcome === 'IMPROVED' ? 'CLOSED' : input.outcome === 'UNKNOWN' ? 'VERIFICATION' : 'REASSESSMENT';
    const currentStage = typeof currentLoop.stage === 'string' && ['JUDGMENT', 'EXECUTION', 'VERIFICATION', 'REASSESSMENT', 'CLOSED'].includes(currentLoop.stage)
      ? currentLoop.stage as JevStage
      : 'JUDGMENT';
    const transition = canTransitionJev({
      from: currentStage,
      to: stage,
      hasTask: typeof currentLoop.taskId === 'string' && currentLoop.taskId.length > 0,
      hasNewEvidence: false,
    });
    if (!transition.allowed) {
      throw new ApiError(ErrorCode.DIAGNOSIS_INVALID_STATE, `JEV 状态转换被拒绝: ${transition.reasonCode}`, HttpStatus.CONFLICT);
    }
    const loop = { ...currentLoop, stage, outcome: input.outcome, note: input.note, verifiedAt: now, updatedAt: now };
    const updated = await this.prisma.diagnosis.update({
      where: { id },
      data: { result: { ...currentResult, loop } as Prisma.InputJsonValue, updatedAt: new Date(now) },
      include: { images: true },
    });
    return this.present(updated);
  }

  async remove(userId: string, id: string) {
    await this.requireDiagnosis(userId, id);
    await this.prisma.diagnosis.update({ where: { id }, data: { deletedAt: new Date() } });
    return { id, deleted: true };
  }

  private async processDiagnosis(id: string) {
    const diagnosis = await this.prisma.diagnosis.findUnique({ where: { id }, include: { images: true } });
    if (!diagnosis || diagnosis.deletedAt || diagnosis.status !== DiagnosisStatus.CREATED) return;

    await this.prisma.diagnosis.update({ where: { id }, data: { status: DiagnosisStatus.ANALYZING } });
    try {
      const result = await this.ai.analyze({
        cropName: diagnosis.cropName,
        growthStage: diagnosis.growthStage,
        description: diagnosis.description,
        images: diagnosis.images.map((image) => ({
          objectKey: image.objectKey,
          width: image.width,
          height: image.height,
          quality: image.quality,
        })),
      });
      const status = result.needMoreImages
        ? DiagnosisStatus.NEED_MORE_IMAGES
        : result.needExpertReview
          ? DiagnosisStatus.NEED_EXPERT_REVIEW
          : DiagnosisStatus.COMPLETED;
      const notificationType = status === DiagnosisStatus.NEED_MORE_IMAGES || status === DiagnosisStatus.NEED_EXPERT_REVIEW ? 'SYSTEM' : 'DIAGNOSIS_COMPLETED';
      const operations: Prisma.PrismaPromise<unknown>[] = [this.prisma.diagnosis.update({
        where: { id },
        data: {
          status,
          result: result as unknown as Prisma.InputJsonValue,
          expertReviewNeeded: result.needExpertReview,
          modelName: result.model.name,
          modelVersion: result.model.version,
          modelTraceId: result.model.traceId,
          completedAt: new Date(),
        },
      })];
      if (await this.shouldNotify(diagnosis.userId, notificationType)) {
        operations.push(this.prisma.notification.create({
          data: {
            userId: diagnosis.userId,
            type: notificationType,
            title:
              status === DiagnosisStatus.NEED_MORE_IMAGES
                ? '需要补充图片'
                : status === DiagnosisStatus.NEED_EXPERT_REVIEW
                  ? '诊断结果需要复核'
                  : '诊断结果已生成',
            content:
              status === DiagnosisStatus.NEED_MORE_IMAGES
                ? '当前图片不足以形成可靠判断。'
                : status === DiagnosisStatus.NEED_EXPERT_REVIEW
                  ? '已生成初步判断，建议让农技人员结合田间情况复核。'
                  : '已生成辅助判断和下一步行动。',
            targetType: 'diagnosis',
            targetId: id,
          },
        }));
      }
      await this.prisma.$transaction(operations);
    } catch (error) {
      const failureOperations: Prisma.PrismaPromise<unknown>[] = [this.prisma.diagnosis.update({
          where: { id },
          data: { status: DiagnosisStatus.FAILED, failureCode: 'AI_PROVIDER_ERROR', failureMessage: '诊断服务暂时不可用' },
        })];
      if (await this.shouldNotify(diagnosis.userId, 'DIAGNOSIS_FAILED')) {
        failureOperations.push(this.prisma.notification.create({
          data: {
            userId: diagnosis.userId,
            type: 'DIAGNOSIS_FAILED',
            title: '诊断未完成',
            content: '诊断服务暂时不可用，请稍后重试。',
            targetType: 'diagnosis',
            targetId: id,
          },
        }));
      }
      await this.prisma.$transaction(failureOperations);
      console.error(`诊断 ${id} 处理失败`, error);
    }
  }

  private async publishDiagnosisJob(diagnosisId: string, requestId: string, traceId: string) {
    await this.queue.publish<DiagnosisJob>(DIAGNOSIS_QUEUE, { diagnosisId, requestId, traceId });
  }

  private async shouldNotify(userId: string, type: 'DIAGNOSIS_COMPLETED' | 'DIAGNOSIS_FAILED' | 'SYSTEM') {
    try {
      const preferences = await this.prisma.notificationPreference.findUnique({ where: { userId } });
      if (!preferences) return true;
      if (type === 'DIAGNOSIS_COMPLETED') return preferences.diagnosisCompleted;
      if (type === 'DIAGNOSIS_FAILED') return preferences.diagnosisFailed;
      return preferences.system;
    } catch {
      // 偏好服务不可用时继续发送核心提醒，避免用户错过诊断结果。
      return true;
    }
  }

  private async requireDiagnosis(userId: string, id: string) {
    const diagnosis = await this.prisma.diagnosis.findFirst({
      where: { id, userId, deletedAt: null },
      include: { images: true },
    });
    if (!diagnosis) throw new ApiError(ErrorCode.DIAGNOSIS_NOT_FOUND, '诊断记录不存在', HttpStatus.NOT_FOUND);
    return diagnosis;
  }

  private present(diagnosis: Record<string, unknown> & { status: DiagnosisStatus }) {
    return { ...diagnosis, status: diagnosis.status.toLowerCase() };
  }
}
