import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../../common/current-user.decorator';
import { NotificationService } from './notification.service';

@ApiTags('站内消息')
@ApiBearerAuth()
@Controller('v1/messages')
export class NotificationController {
  constructor(private readonly notifications: NotificationService) {}

  @Get()
  @ApiOperation({ summary: '消息列表' })
  list(@CurrentUser() user: AuthUser) {
    return this.notifications.list(user.id);
  }

  @Get('unread-count')
  @ApiOperation({ summary: '未读数量' })
  unread(@CurrentUser() user: AuthUser) {
    return this.notifications.unreadCount(user.id);
  }

  @Post(':id/read')
  @ApiOperation({ summary: '标记已读' })
  read(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.notifications.markRead(user.id, id);
  }
}
