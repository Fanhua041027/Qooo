import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiError } from '../../common/api-error';
import { ErrorCode } from '../../common/error-codes';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    const items = await this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    return { items: items.map((item) => ({ ...item, type: item.type.toLowerCase() })), total: items.length };
  }

  async unreadCount(userId: string) {
    return { count: await this.prisma.notification.count({ where: { userId, readAt: null } }) };
  }

  async markRead(userId: string, id: string) {
    const notification = await this.prisma.notification.findFirst({ where: { id, userId } });
    if (!notification) {
      throw new ApiError(ErrorCode.NOTIFICATION_NOT_FOUND, '消息不存在', HttpStatus.NOT_FOUND);
    }
    return this.prisma.notification.update({ where: { id }, data: { readAt: notification.readAt ?? new Date() } });
  }
}
