import { HttpStatus, Injectable } from '@nestjs/common';
import { OpsConfigCategory, OpsConfigStatus, OpsConfigVersionAction, Prisma } from '@prisma/client';
import { ApiError } from '../../common/api-error';
import { ErrorCode } from '../../common/error-codes';
import { currentContext } from '../../common/request-context';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { DEFAULT_OPS_CONFIGS } from './ops-config.defaults';
import { CreateOpsConfigDto, PreviewOpsConfigDto, UpdateOpsConfigDto } from './dto/ops-config.dto';

const OPERATOR_ROLES = new Set(['OPERATOR', 'EXPERT', 'ADMIN']);

@Injectable()
export class OpsConfigService {
  constructor(private readonly prisma: PrismaService) {}

  async list(user: { id: string; role: string }) {
    this.assertOperator(user.role);
    try {
      const items = await this.prisma.opsConfig.findMany({ orderBy: [{ category: 'asc' }, { key: 'asc' }], include: { versions: { orderBy: { version: 'desc' }, take: 20 } } });
      return { items: items.map((item) => this.present(item)), total: items.length };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      return { items: DEFAULT_OPS_CONFIGS.map((item) => this.presentDefault(item)), total: DEFAULT_OPS_CONFIGS.length, fallback: true };
    }
  }

  async get(user: { id: string; role: string }, key: string) {
    this.assertOperator(user.role);
    try {
      const item = await this.prisma.opsConfig.findUnique({ where: { key }, include: { versions: { orderBy: { version: 'desc' }, take: 20 } } });
      if (!item) throw new ApiError(ErrorCode.OPS_CONFIG_NOT_FOUND, '运营配置不存在', HttpStatus.NOT_FOUND);
      return this.present(item);
    } catch (error) {
      if (error instanceof ApiError) {
        const fallback = DEFAULT_OPS_CONFIGS.find((item) => item.key === key);
        if (fallback) return this.presentDefault(fallback);
        throw error;
      }
      const fallback = DEFAULT_OPS_CONFIGS.find((item) => item.key === key);
      if (!fallback) throw new ApiError(ErrorCode.STORAGE_UNAVAILABLE, '配置服务暂时不可用', HttpStatus.SERVICE_UNAVAILABLE);
      return this.presentDefault(fallback);
    }
  }

  async preview(user: { role: string }, input: PreviewOpsConfigDto) {
    this.assertOperator(user.role);
    const content = this.validateContent(input.content, input.category);
    return { key: input.key, category: input.category, content, valid: true, errors: [] as string[] };
  }

  async create(user: { id: string; role: string; nickname: string }, input: CreateOpsConfigDto) {
    this.assertOperator(user.role);
    const content = this.validateContent(input.content, input.category);
    this.assertSafetyPermission(user.role, input.category, content);
    const key = input.key.trim();
    const name = input.name.trim();
    const description = input.description.trim();
    if (!key || !name || !description) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '配置 key、名称和说明不能为空', HttpStatus.BAD_REQUEST);
    const now = new Date();
    try {
      const created = await this.prisma.opsConfig.create({
        data: {
          key,
          name,
          description,
          category: input.category as OpsConfigCategory,
          status: OpsConfigStatus.PUBLISHED,
          content,
          version: 1,
          updatedById: user.id,
          updatedBy: user.nickname,
          versions: {
            create: {
              version: 1,
              content,
              action: OpsConfigVersionAction.UPDATE,
              changedById: user.id,
              changedBy: user.nickname,
              requestId: currentContext().requestId,
              traceId: currentContext().traceId,
            },
          },
        },
        include: { versions: { orderBy: { version: 'desc' }, take: 20 } },
      });
      return this.present(created);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '配置 key 已存在', HttpStatus.CONFLICT, { field: 'key' });
      }
      throw new ApiError(ErrorCode.STORAGE_UNAVAILABLE, `配置保存失败，当前版本未改变（${now.toISOString()}）`, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async update(user: { id: string; role: string; nickname: string }, key: string, input: UpdateOpsConfigDto) {
    this.assertOperator(user.role);
    const current = await this.requireConfig(key);
    const content = this.validateContent(input.content, current.category);
    this.assertSafetyPermission(user.role, current.category, content);
    if (input.expectedVersion && input.expectedVersion !== `v${current.version}`) {
      throw new ApiError(ErrorCode.OPS_CONFIG_VERSION_CONFLICT, '配置已被其他运营人员更新，请刷新后再保存', HttpStatus.CONFLICT, { expectedVersion: input.expectedVersion, actualVersion: `v${current.version}` });
    }
    const context = currentContext();
    const nextVersion = current.version + 1;
    try {
      const [, updated] = await this.prisma.$transaction([
        this.prisma.opsConfigVersion.create({ data: { configId: current.id, version: nextVersion, content, action: OpsConfigVersionAction.UPDATE, changedById: user.id, changedBy: user.nickname, requestId: context.requestId, traceId: context.traceId } }),
        this.prisma.opsConfig.update({ where: { id: current.id }, data: { content, version: nextVersion, status: OpsConfigStatus.PUBLISHED, updatedById: user.id, updatedBy: user.nickname }, include: { versions: { orderBy: { version: 'desc' }, take: 20 } } }),
      ]);
      return this.present(updated);
    } catch {
      throw new ApiError(ErrorCode.STORAGE_UNAVAILABLE, '配置保存失败，当前版本未改变', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async rollback(user: { id: string; role: string; nickname: string }, key: string, version: string) {
    this.assertOperator(user.role);
    const current = await this.requireConfig(key);
    this.assertSafetyPermission(user.role, current.category);
    const targetVersion = Number(version.slice(1));
    if (!Number.isInteger(targetVersion) || targetVersion < 1 || targetVersion >= current.version) throw new ApiError(ErrorCode.OPS_CONFIG_VERSION_NOT_FOUND, '要恢复的配置版本不存在', HttpStatus.NOT_FOUND);
    const target = await this.prisma.opsConfigVersion.findUnique({ where: { configId_version: { configId: current.id, version: targetVersion } } });
    if (!target) throw new ApiError(ErrorCode.OPS_CONFIG_VERSION_NOT_FOUND, '要恢复的配置版本不存在', HttpStatus.NOT_FOUND);
    // 回滚也必须重新执行当前安全规则，避免历史版本绕过最新的文案和剂量校验。
    const content = this.validateContent(target.content, current.category);
    this.assertSafetyPermission(user.role, current.category, content);
    const context = currentContext();
    const nextVersion = current.version + 1;
    try {
      const [, updated] = await this.prisma.$transaction([
        this.prisma.opsConfigVersion.create({ data: { configId: current.id, version: nextVersion, content, action: OpsConfigVersionAction.ROLLBACK, changedById: user.id, changedBy: user.nickname, requestId: context.requestId, traceId: context.traceId } }),
        this.prisma.opsConfig.update({ where: { id: current.id }, data: { content, version: nextVersion, status: OpsConfigStatus.PUBLISHED, updatedById: user.id, updatedBy: user.nickname }, include: { versions: { orderBy: { version: 'desc' }, take: 20 } } }),
      ]);
      return this.present(updated);
    } catch {
      throw new ApiError(ErrorCode.STORAGE_UNAVAILABLE, '配置回滚失败，当前版本未改变', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async versions(user: { role: string }, key: string) {
    this.assertOperator(user.role);
    const config = await this.requireConfig(key);
    try {
      const items = await this.prisma.opsConfigVersion.findMany({ where: { configId: config.id }, orderBy: { version: 'desc' }, take: 50 });
      const history = items
        .filter((item) => item.version < config.version)
        .map((item) => ({ version: `v${item.version}`, content: item.content, updatedAt: item.createdAt.toISOString(), updatedBy: item.changedBy, action: item.action, requestId: item.requestId, traceId: item.traceId }));
      return { items: [{ version: `v${config.version}`, content: config.content, updatedAt: config.updatedAt.toISOString(), updatedBy: config.updatedBy }, ...history], total: history.length + 1 };
    } catch {
      return { items: [{ version: `v${config.version}`, content: config.content, updatedAt: config.updatedAt.toISOString(), updatedBy: config.updatedBy }], total: 1, fallback: true };
    }
  }

  private async requireConfig(key: string) {
    try {
      const item = await this.prisma.opsConfig.findUnique({ where: { key } });
      if (!item) throw new ApiError(ErrorCode.OPS_CONFIG_NOT_FOUND, '运营配置不存在', HttpStatus.NOT_FOUND);
      return item;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(ErrorCode.STORAGE_UNAVAILABLE, '配置服务暂时不可用', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  private assertOperator(role: string) {
    if (!OPERATOR_ROLES.has(String(role).toUpperCase())) throw new ApiError(ErrorCode.FORBIDDEN, '只有运营、农艺专家或管理员可以管理配置', HttpStatus.FORBIDDEN);
  }

  private assertSafetyPermission(role: string, category: string, content?: string) {
    if (category !== 'SAFETY') return;
    if (!['EXPERT', 'ADMIN'].includes(String(role).toUpperCase())) throw new ApiError(ErrorCode.FORBIDDEN, '安全配置只能由农艺专家或管理员发布', HttpStatus.FORBIDDEN);
    if (!content) return;
    try {
      const payload = JSON.parse(content) as { blockAction?: boolean; requiredEscalation?: string; allowDose?: boolean; ruleCode?: string };
      if (!payload.ruleCode || payload.blockAction !== true || !payload.requiredEscalation || payload.allowDose !== false) throw new Error('invalid');
    } catch {
      throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '安全配置必须包含 ruleCode、blockAction=true、requiredEscalation，且 allowDose 固定为 false', HttpStatus.BAD_REQUEST, { field: 'content' });
    }
  }

  private validateContent(content: string, category?: string) {
    const normalized = content.trim();
    if (!normalized || normalized.length > 2000) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '配置内容不能为空且不能超过 2000 字', HttpStatus.BAD_REQUEST, { field: 'content' });
    if (/确诊|保证治愈|保证有效|一定有效|自行加量|缩短安全间隔|100\s*%/.test(normalized)) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '配置文案不能使用确定性或危险用药表述', HttpStatus.BAD_REQUEST, { field: 'content' });
    if (/(?:每亩|每公顷|稀释|安全间隔期)\s*(?:使用|用|为|是|需等待)?\s*\d+|\d+(?:\.\d+)?\s*(?:ml|mL|毫升|g|克|kg|公斤|倍液|倍)(?=$|[\s，。；、,;]|[\u4e00-\u9fff])/u.test(normalized)) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '配置文案不能包含未经核验的具体剂量或安全间隔', HttpStatus.BAD_REQUEST, { field: 'content' });
    const restrictedPesticides = /百草枯|甲胺磷|甲基对硫磷|对硫磷|久效磷|磷胺|六六六|滴滴涕|毒杀芬|杀虫脒|氟乙酰胺|毒鼠强/u;
    const prohibition = /(?:不要|禁止|严禁|不得|不可|停止|停用)(?:使用|用)?\s*$/u;
    const recommendsRestrictedPesticide = normalized.split(/[\n。！？；]/u).some((sentence) => {
      const match = sentence.match(restrictedPesticides);
      return Boolean(match && match.index !== undefined && !prohibition.test(sentence.slice(0, match.index).trim()));
    });
    if (recommendsRestrictedPesticide) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '配置文案不能推荐禁限用农药', HttpStatus.BAD_REQUEST, { field: 'content' });
    const looksLikeJson = normalized.startsWith('{') || normalized.startsWith('[');
    if (!looksLikeJson) return normalized;
    let payload: Record<string, unknown>;
    try {
      const parsed = JSON.parse(normalized) as unknown;
      if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error('配置 JSON 必须是对象');
      payload = parsed as Record<string, unknown>;
    } catch (error) {
      throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, error instanceof Error ? error.message : '配置 JSON 格式错误，请检查逗号、引号和括号', HttpStatus.BAD_REQUEST, { field: 'content' });
    }
    const title = payload.title ?? payload.label;
    const description = payload.description ?? payload.message;
    if (typeof title !== 'string' || !title.trim()) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '配置缺少必填字段：title 或 label', HttpStatus.BAD_REQUEST, { field: 'content.title' });
    if (typeof description !== 'string' || !description.trim()) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '配置缺少必填字段：description 或 message', HttpStatus.BAD_REQUEST, { field: 'content.description' });
    if (category === 'RISK') {
      if (!['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(String(payload.level).toUpperCase())) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '风险配置的 level 不合法', HttpStatus.BAD_REQUEST, { field: 'content.level' });
      if (typeof payload.actionWindow !== 'string' || !payload.actionWindow.trim()) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '风险配置缺少必填字段：actionWindow', HttpStatus.BAD_REQUEST, { field: 'content.actionWindow' });
      if (payload.marker !== undefined && !['success', 'warning', 'danger', 'critical'].includes(String(payload.marker))) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '风险配置的 marker 不合法', HttpStatus.BAD_REQUEST, { field: 'content.marker' });
    }
    if (category === 'ACTION' && !['DO_NOW', 'OBSERVE', 'AVOID', 'EXPERT_REVIEW'].includes(String(payload.type))) throw new ApiError(ErrorCode.OPS_CONFIG_INVALID, '处理建议的 type 不合法', HttpStatus.BAD_REQUEST, { field: 'content.type' });
    return normalized;
  }

  private present(item: any) {
    return { key: item.key, name: item.name, description: item.description, category: item.category, status: item.status, content: item.content, version: `v${item.version}`, locale: 'zh-CN', sortOrder: 0, updatedAt: item.updatedAt.toISOString(), updatedBy: item.updatedBy, previousVersions: (item.versions || []).filter((version: any) => version.version < item.version).map((version: any) => ({ version: `v${version.version}`, content: version.content, updatedAt: version.createdAt.toISOString(), updatedBy: version.changedBy, action: version.action, requestId: version.requestId, traceId: version.traceId })) };
  }

  private presentDefault(item: (typeof DEFAULT_OPS_CONFIGS)[number]) {
    return { ...item, status: 'PUBLISHED' as const, version: 'v1', locale: 'zh-CN' as const, sortOrder: 0, updatedAt: '2026-01-01T00:00:00.000Z', updatedBy: '系统默认', previousVersions: [], fallback: true };
  }
}
