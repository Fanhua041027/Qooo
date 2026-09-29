import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/public.decorator';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { RabbitQueueService } from '../../infrastructure/queue/rabbit-queue.service';
import { RedisService } from '../../infrastructure/redis/redis.service';
import { FileService } from '../file/file.service';

@ApiTags('运行状态')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly queue: RabbitQueueService,
    private readonly files: FileService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: '服务及依赖健康检查' })
  async check() {
    await this.prisma.$queryRaw`SELECT 1`;
    const [redis, rabbitmq, objectStorage] = await Promise.all([
      this.redis.ping().then((value) => value === 'PONG'),
      this.queue.ping(),
      this.files.health(),
    ]);
    return { service: 'nongjianzhen-mvp-api', status: 'healthy', dependencies: { postgres: true, redis, rabbitmq, objectStorage } };
  }
}
