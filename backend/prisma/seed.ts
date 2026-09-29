import { OpsConfigCategory, OpsConfigStatus, OpsConfigVersionAction, PrismaClient, TaskPriority, TaskStatus, UserRole } from '@prisma/client';
import { DEFAULT_OPS_CONFIGS } from '../src/modules/ops/ops-config.defaults';

const prisma = new PrismaClient();

async function main() {
  const farmer = await prisma.user.upsert({
    where: { id: 'user_p0_farmer_001' },
    update: {},
    create: {
      id: 'user_p0_farmer_001',
      nickname: '向阳农场主',
      role: UserRole.FARMER,
      mockAccount: true,
    },
  });

  await prisma.user.upsert({
    where: { id: 'user_p0_farmer_low_001' },
    update: {},
    create: {
      id: 'user_p0_farmer_low_001',
      nickname: '新手农户',
      role: UserRole.FARMER,
      mockAccount: true,
    },
  });

  await prisma.user.upsert({
    where: { id: 'ops_p0_001' },
    update: {},
    create: {
      id: 'ops_p0_001',
      nickname: '运营测试账号',
      role: UserRole.OPERATOR,
      mockAccount: true,
    },
  });

  await prisma.user.upsert({
    where: { id: 'ops_admin_p0_001' },
    update: {},
    create: {
      id: 'ops_admin_p0_001',
      nickname: '管理员测试账号',
      role: UserRole.ADMIN,
      mockAccount: true,
    },
  });

  await prisma.user.upsert({
    where: { id: 'ops_expert_p0_001' },
    update: {},
    create: {
      id: 'ops_expert_p0_001',
      nickname: '农艺专家测试账号',
      role: UserRole.EXPERT,
      mockAccount: true,
    },
  });

  const farm = await prisma.farm.upsert({
    where: { id: 'farm_demo_001' },
    update: {},
    create: {
      id: 'farm_demo_001',
      ownerId: farmer.id,
      name: '向阳示范农场',
      region: '浙江省杭州市临安区',
      areaMu: 18.6,
    },
  });

  await prisma.plot.upsert({
    where: { id: 'plot_demo_001' },
    update: {},
    create: {
      id: 'plot_demo_001',
      farmId: farm.id,
      name: '东一号棚',
      areaMu: 3.2,
      cropName: '番茄',
      cropVariety: '普罗旺斯',
      plantedAt: new Date('2026-07-01T00:00:00.000Z'),
      growthStage: '结果期',
    },
  });

  await prisma.task.upsert({
    where: { id: 'task_demo_001' },
    update: {},
    create: {
      id: 'task_demo_001',
      userId: farmer.id,
      farmId: farm.id,
      plotId: 'plot_demo_001',
      title: '检查番茄叶片背面',
      description: '拍摄叶片正反面并记录病斑变化。',
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await prisma.knowledgeArticle.upsert({
    where: { slug: 'tomato-late-blight-basics' },
    update: {},
    create: {
      slug: 'tomato-late-blight-basics',
      title: '番茄晚疫病基础识别',
      summary: '了解叶片、茎秆和果实上的典型症状，以及需要补拍的部位。',
      content: '发现疑似症状后，应先隔离异常植株并补拍叶片背面、茎部和整株照片。涉及用药时，应核对当地登记信息并咨询农技员。',
      cropName: '番茄',
      tags: ['番茄', '晚疫病', '病害识别'],
      published: true,
    },
  });

  for (const config of DEFAULT_OPS_CONFIGS) {
    const saved = await prisma.opsConfig.upsert({
      where: { key: config.key },
      update: {},
      create: {
        key: config.key,
        name: config.name,
        description: config.description,
        category: config.category as OpsConfigCategory,
        status: OpsConfigStatus.PUBLISHED,
        content: config.content,
        version: 1,
        updatedById: 'ops_p0_001',
        updatedBy: '运营测试账号',
      },
    });
    const existingVersion = await prisma.opsConfigVersion.findUnique({ where: { configId_version: { configId: saved.id, version: 1 } } });
    if (!existingVersion) {
      await prisma.opsConfigVersion.create({
        data: {
          configId: saved.id,
          version: 1,
          content: config.content,
          action: OpsConfigVersionAction.UPDATE,
          changedById: 'ops_p0_001',
          changedBy: '运营测试账号',
          requestId: 'seed_ops_config',
          traceId: 'seed_ops_config',
        },
      });
    }
  }
}

main()
  .finally(async () => prisma.$disconnect());
