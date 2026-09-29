import { Global, Module } from '@nestjs/common';
import { RabbitQueueService } from './rabbit-queue.service';

@Global()
@Module({ providers: [RabbitQueueService], exports: [RabbitQueueService] })
export class QueueModule {}
