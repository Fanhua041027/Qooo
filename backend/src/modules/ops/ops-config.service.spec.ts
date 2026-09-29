import { HttpStatus } from '@nestjs/common';
import { OpsConfigService } from './ops-config.service';
import { requestContext } from '../../common/request-context';

function config(overrides: Record<string, unknown> = {}) {
  return {
    id: 'cfg-1',
    key: 'risk.medium.label',
    name: '中风险文案',
    description: '结果页风险说明',
    category: 'RISK',
    status: 'PUBLISHED',
    content: '中风险\n请继续观察',
    version: 1,
    updatedAt: new Date('2026-09-29T00:00:00.000Z'),
    updatedBy: '运营测试账号',
    versions: [],
    ...overrides,
  };
}

function createPrismaMock() {
  return {
    opsConfig: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    opsConfigVersion: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(async (operations: Promise<unknown>[]) => Promise.all(operations)),
  } as any;
}

describe('OpsConfigService P0-11 API', () => {
  it('拒绝未授权角色读取配置', async () => {
    const service = new OpsConfigService(createPrismaMock());
    await expect(service.list({ id: 'farmer', role: 'FARMER' })).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
  });

  it('正常读取配置并保留版本字段', async () => {
    const prisma = createPrismaMock();
    prisma.opsConfig.findMany.mockResolvedValue([config()]);
    const result = await new OpsConfigService(prisma).list({ id: 'ops', role: 'OPERATOR' });
    expect(result).toMatchObject({ total: 1, items: [{ key: 'risk.medium.label', version: 'v1', previousVersions: [] }] });
  });

  it('新增配置并建立初始版本', async () => {
    const prisma = createPrismaMock();
    prisma.opsConfig.create.mockResolvedValue(config({ key: 'home.quick-start', version: 1, content: '拍照引导', versions: [] }));
    const result = await new OpsConfigService(prisma).create({ id: 'ops', role: 'OPERATOR', nickname: '运营测试账号' }, {
      key: 'home.quick-start', name: '首页引导', description: '首页说明', category: 'HOME', content: '拍照引导',
    });
    expect(prisma.opsConfig.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ key: 'home.quick-start', version: 1 }) }));
    expect(result.version).toBe('v1');
  });

  it('编辑配置生成新版本，保存失败时返回服务错误', async () => {
    const prisma = createPrismaMock();
    prisma.opsConfig.findUnique.mockResolvedValue(config());
    prisma.opsConfig.update.mockResolvedValue(config({ version: 2, content: '新文案' }));
    const service = new OpsConfigService(prisma);
    const result = await service.update({ id: 'ops', role: 'OPERATOR', nickname: '运营测试账号' }, 'risk.medium.label', { content: '新文案' });
    expect(result.version).toBe('v2');

    prisma.$transaction.mockRejectedValueOnce(new Error('network down'));
    await expect(service.update({ id: 'ops', role: 'OPERATOR', nickname: '运营测试账号' }, 'risk.medium.label', { content: '再次保存' })).rejects.toMatchObject({ status: HttpStatus.SERVICE_UNAVAILABLE });
  });

  it('恢复历史版本并生成递增版本', async () => {
    const prisma = createPrismaMock();
    prisma.opsConfig.findUnique.mockResolvedValue(config({ version: 2 }));
    prisma.opsConfigVersion.findUnique.mockResolvedValue({ content: '历史文案' });
    prisma.opsConfig.update.mockResolvedValue(config({ version: 3, content: '历史文案' }));
    const result = await new OpsConfigService(prisma).rollback({ id: 'ops', role: 'OPERATOR', nickname: '运营测试账号' }, 'risk.medium.label', 'v1');
    expect(result).toMatchObject({ version: 'v3', content: '历史文案' });
  });

  it('所有运营配置操作都拒绝普通农户', async () => {
    const service = new OpsConfigService(createPrismaMock());
    const farmer = { id: 'farmer', role: 'FARMER', nickname: '农户' };
    await expect(service.get(farmer, 'risk.medium.label')).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
    await expect(service.preview(farmer, { content: '安全提示' } as any)).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
    await expect(service.create(farmer, { key: 'home.test', name: '测试', description: '测试', category: 'HOME', content: '提示' } as any)).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
    await expect(service.update(farmer, 'risk.medium.label', { content: '提示' } as any)).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
    await expect(service.rollback(farmer, 'risk.medium.label', 'v1')).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
    await expect(service.versions(farmer, 'risk.medium.label')).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
  });

  it('拒绝空内容、超长内容和确定性表述', async () => {
    const service = new OpsConfigService(createPrismaMock());
    const operator = { id: 'ops', role: 'OPERATOR', nickname: '运营' };
    await expect(service.preview(operator, { content: '   ' } as any)).rejects.toMatchObject({ status: HttpStatus.BAD_REQUEST });
    await expect(service.preview(operator, { content: 'x'.repeat(2001) } as any)).rejects.toMatchObject({ status: HttpStatus.BAD_REQUEST });
    await expect(service.preview(operator, { content: '这个结果可以确诊晚疫病' } as any)).rejects.toMatchObject({ status: HttpStatus.BAD_REQUEST });
  });

  it('保存版本时记录 requestId 和 traceId，并保留旧版本', async () => {
    const prisma = createPrismaMock();
    const current = config({ version: 2, content: '旧文案' });
    prisma.opsConfig.findUnique.mockResolvedValue(current);
    prisma.opsConfig.update.mockResolvedValue(config({ version: 3, content: '新文案', versions: [{ version: 3, content: '新文案', createdAt: new Date(), changedBy: '运营' }, { version: 2, content: '旧文案', createdAt: new Date(), changedBy: '运营' }] }));
    const service = new OpsConfigService(prisma);
    const result = await requestContext.run({ requestId: 'req_test', traceId: 'trace_test' }, () => service.update({ id: 'ops', role: 'OPERATOR', nickname: '运营' }, current.key, { content: '新文案', expectedVersion: 'v2' }));
    expect(result).toMatchObject({ version: 'v3', content: '新文案', previousVersions: expect.arrayContaining([expect.objectContaining({ version: 'v2', content: '旧文案' })]) });
    expect(prisma.opsConfigVersion.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ version: 3, requestId: 'req_test', traceId: 'trace_test' }) }));
  });

  it('版本冲突时不覆盖当前内容', async () => {
    const prisma = createPrismaMock();
    prisma.opsConfig.findUnique.mockResolvedValue(config({ version: 4, content: '最新文案' }));
    const service = new OpsConfigService(prisma);
    await expect(service.update({ id: 'ops', role: 'OPERATOR', nickname: '运营' }, 'risk.medium.label', { content: '覆盖文案', expectedVersion: 'v3' })).rejects.toMatchObject({ code: 'OPS_CONFIG_VERSION_CONFLICT', status: HttpStatus.CONFLICT });
    expect(prisma.opsConfig.update).not.toHaveBeenCalled();
  });

  it('数据库读取失败时返回稳定默认配置', async () => {
    const prisma = createPrismaMock();
    prisma.opsConfig.findMany.mockRejectedValue(new Error('database unavailable'));
    prisma.opsConfig.findUnique.mockRejectedValue(new Error('database unavailable'));
    const service = new OpsConfigService(prisma);
    const operator = { id: 'ops', role: 'OPERATOR' };
    await expect(service.list(operator)).resolves.toMatchObject({ fallback: true, items: expect.arrayContaining([expect.objectContaining({ key: 'risk.medium' })]) });
    await expect(service.get(operator, 'risk.medium')).resolves.toMatchObject({ key: 'risk.medium', version: 'v1' });
  });

  it('历史版本不存在时拒绝回滚，事务失败时返回存储错误', async () => {
    const prisma = createPrismaMock();
    prisma.opsConfig.findUnique.mockResolvedValue(config({ version: 2 }));
    prisma.opsConfigVersion.findUnique.mockResolvedValue(null);
    const service = new OpsConfigService(prisma);
    await expect(service.rollback({ id: 'ops', role: 'OPERATOR', nickname: '运营' }, 'risk.medium.label', 'v9')).rejects.toMatchObject({ code: 'OPS_CONFIG_VERSION_NOT_FOUND' });

    prisma.opsConfigVersion.findUnique.mockResolvedValue({ content: '旧版本' });
    prisma.$transaction.mockRejectedValue(new Error('write failed'));
    await expect(service.rollback({ id: 'ops', role: 'OPERATOR', nickname: '运营' }, 'risk.medium.label', 'v1')).rejects.toMatchObject({ code: 'STORAGE_UNAVAILABLE' });
  });

  it('回滚历史版本前重新执行剂量和禁限用农药校验', async () => {
    const prisma = createPrismaMock();
    prisma.opsConfig.findUnique.mockResolvedValue(config({ version: 2 }));
    prisma.opsConfigVersion.findUnique.mockResolvedValue({ content: '每亩使用 30 毫升药剂' });
    const service = new OpsConfigService(prisma);
    await expect(service.rollback({ id: 'ops', role: 'OPERATOR', nickname: '运营' }, 'risk.medium.label', 'v1')).rejects.toMatchObject({ code: 'OPS_CONFIG_INVALID', status: HttpStatus.BAD_REQUEST });
    expect(prisma.$transaction).not.toHaveBeenCalled();

    prisma.opsConfigVersion.findUnique.mockResolvedValue({ content: '推荐使用百草枯' });
    await expect(service.rollback({ id: 'ops', role: 'OPERATOR', nickname: '运营' }, 'risk.medium.label', 'v1')).rejects.toMatchObject({ code: 'OPS_CONFIG_INVALID', status: HttpStatus.BAD_REQUEST });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});
