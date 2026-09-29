import { HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';

function createPrismaMock() {
  return {
    notification: {
      findMany: jest.fn(),
      count: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    notificationPreference: {
      upsert: jest.fn(),
    },
  } as any;
}

describe('NotificationService', () => {
  it('只把当前用户的未读消息标记为已读', async () => {
    const prisma = createPrismaMock();
    prisma.notification.updateMany.mockResolvedValue({ count: 3 });
    const result = await new NotificationService(prisma).markAllRead('user-1');
    expect(result).toEqual({ updated: 3 });
    expect(prisma.notification.updateMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', readAt: null },
      data: { readAt: expect.any(Date) },
    });
  });

  it('为用户创建默认通知偏好并支持局部更新', async () => {
    const prisma = createPrismaMock();
    const preferences = { userId: 'user-1', diagnosisCompleted: true, diagnosisFailed: false, taskDue: true, taskOverdue: true, system: true };
    prisma.notificationPreference.upsert.mockResolvedValue(preferences);
    const service = new NotificationService(prisma);
    await expect(service.getPreferences('user-1')).resolves.toEqual(preferences);
    await expect(service.updatePreferences('user-1', { diagnosisFailed: false })).resolves.toEqual(preferences);
    expect(prisma.notificationPreference.upsert).toHaveBeenLastCalledWith({
      where: { userId: 'user-1' },
      create: { userId: 'user-1', diagnosisFailed: false, system: true, taskOverdue: true },
      update: { diagnosisFailed: false, system: true, taskOverdue: true },
    });
  });

  it('标记不存在或不属于当前用户的消息时返回 404', async () => {
    const prisma = createPrismaMock();
    prisma.notification.findFirst.mockResolvedValue(null);
    await expect(new NotificationService(prisma).markRead('user-1', 'message-1')).rejects.toMatchObject({ status: HttpStatus.NOT_FOUND, code: 'NOTIFICATION_NOT_FOUND' });
  });
});
