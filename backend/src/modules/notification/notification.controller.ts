import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../../common/current-user.decorator';
import { NotificationService } from './notification.service';
import { UpdateNotificationPreferenceDto } from './dto/notification-preference.dto';

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

  @Post('read-all')
  @ApiOperation({ summary: '全部标记为已读' })
  readAll(@CurrentUser() user: AuthUser) {
    return this.notifications.markAllRead(user.id);
  }

}

@ApiTags('通知偏好')
@ApiBearerAuth()
@Controller('v1/message-preferences')
export class NotificationPreferenceController {
  constructor(private readonly notifications: NotificationService) {}

  @Get()
  @ApiOperation({ summary: '通知偏好设置' })
  get(@CurrentUser() user: AuthUser) {
    return this.notifications.getPreferences(user.id);
  }

  @Patch()
  @ApiOperation({ summary: '更新通知偏好设置' })
  update(@CurrentUser() user: AuthUser, @Body() input: UpdateNotificationPreferenceDto) {
    return this.notifications.updatePreferences(user.id, input);
  }
}
