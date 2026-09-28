import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, TaskPriority, TaskStatus } from '@prisma/client';
import { ApiError } from '../../common/api-error';
import { ErrorCode } from '../../common/error-codes';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { FarmService } from '../farm/farm.service';
import { CompleteTaskDto, CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService, private readonly farms: FarmService) {}

  async list(userId: string) {
    await this.prisma.task.updateMany({
      where: { userId, status: TaskStatus.PENDING, dueAt: { lt: new Date() } },
      data: { status: TaskStatus.OVERDUE },
    });
    const items = await this.prisma.task.findMany({ where: { userId }, orderBy: [{ dueAt: 'asc' }, { createdAt: 'desc' }] });
    return { items: items.map((item) => this.present(item)), total: items.length };
  }

  async create(userId: string, input: CreateTaskDto) {
    if (input.clientRequestId) {
      const existing = await this.prisma.task.findUnique({
        where: { userId_clientRequestId: { userId, clientRequestId: input.clientRequestId } },
      });
      if (existing) return this.present(existing);
    }
    if (input.plotId) await this.farms.requirePlot(userId, input.plotId);
    else if (input.farmId) await this.farms.requireFarm(userId, input.farmId);
    if (input.diagnosisId) {
      const diagnosis = await this.prisma.diagnosis.findFirst({ where: { id: input.diagnosisId, userId, deletedAt: null } });
      if (!diagnosis) throw new ApiError(ErrorCode.DIAGNOSIS_NOT_FOUND, '诊断记录不存在', HttpStatus.NOT_FOUND);
    }
    let task;
    try {
      task = await this.prisma.task.create({
        data: {
          userId,
          clientRequestId: input.clientRequestId,
          title: input.title,
          description: input.description,
          farmId: input.farmId,
          plotId: input.plotId,
          diagnosisId: input.diagnosisId,
          assignee: input.assignee,
          dueAt: input.dueAt ? new Date(input.dueAt) : undefined,
          priority: (input.priority?.toUpperCase() as TaskPriority) ?? TaskPriority.MEDIUM,
        },
      });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002' || !input.clientRequestId) throw error;
      const duplicate = await this.prisma.task.findUnique({
        where: { userId_clientRequestId: { userId, clientRequestId: input.clientRequestId } },
      });
      if (!duplicate) throw error;
      return this.present(duplicate);
    }
    if (task.diagnosisId) await this.updateDiagnosisLoop(task.diagnosisId, { stage: 'EXECUTION', taskId: task.id, nextReviewAt: task.dueAt?.toISOString() });
    return this.present(task);
  }

  async update(userId: string, id: string, input: UpdateTaskDto) {
    await this.requireTask(userId, id);
    const task = await this.prisma.task.update({
      where: { id },
      data: {
        title: input.title,
        description: input.description,
        farmId: input.farmId,
        plotId: input.plotId,
        diagnosisId: input.diagnosisId,
        assignee: input.assignee,
        dueAt: input.dueAt ? new Date(input.dueAt) : undefined,
        priority: input.priority ? (input.priority.toUpperCase() as TaskPriority) : undefined,
      },
    });
    if (task.diagnosisId) await this.updateDiagnosisLoop(task.diagnosisId, { stage: 'VERIFICATION', taskId: task.id });
    return this.present(task);
  }

  private async updateDiagnosisLoop(diagnosisId: string, patch: { stage: 'EXECUTION' | 'VERIFICATION'; taskId: string; nextReviewAt?: string }) {
    const diagnosis = await this.prisma.diagnosis.findUnique({ where: { id: diagnosisId } });
    if (!diagnosis || !diagnosis.result || typeof diagnosis.result !== 'object' || Array.isArray(diagnosis.result)) return;
    const result = diagnosis.result as Record<string, unknown>;
    const loop = result.loop && typeof result.loop === 'object' && !Array.isArray(result.loop) ? result.loop as Record<string, unknown> : {};
    await this.prisma.diagnosis.update({
      where: { id: diagnosisId },
      data: { result: { ...result, loop: { ...loop, ...patch, updatedAt: new Date().toISOString() } } as Prisma.InputJsonValue },
    });
  }

  async complete(userId: string, id: string, input: CompleteTaskDto) {
    await this.requireTask(userId, id);
    const task = await this.prisma.task.update({
      where: { id },
      data: { status: TaskStatus.COMPLETED, completedAt: new Date(), completedNote: input.note },
    });
    if (task.diagnosisId) await this.updateDiagnosisLoop(task.diagnosisId, { stage: 'VERIFICATION', taskId: task.id });
    return this.present(task);
  }

  private async requireTask(userId: string, id: string) {
    const task = await this.prisma.task.findFirst({ where: { id, userId } });
    if (!task) throw new ApiError(ErrorCode.TASK_NOT_FOUND, '农事任务不存在', HttpStatus.NOT_FOUND);
    return task;
  }

  private present(task: Record<string, unknown> & { status: TaskStatus; priority: TaskPriority }) {
    return { ...task, status: task.status.toLowerCase(), priority: task.priority.toLowerCase() };
  }
}
