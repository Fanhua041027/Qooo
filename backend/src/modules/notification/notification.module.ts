import { Module } from '@nestjs/common';
import { NotificationController, NotificationPreferenceController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({ controllers: [NotificationController, NotificationPreferenceController], providers: [NotificationService] })
export class NotificationModule {}
