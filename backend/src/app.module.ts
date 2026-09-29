import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { DatabaseModule } from './infrastructure/database/database.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { RequestContextMiddleware } from './common/request-context.middleware';
import { FarmModule } from './modules/farm/farm.module';
import { DiagnosisModule } from './modules/diagnosis/diagnosis.module';
import { TaskModule } from './modules/task/task.module';
import { NotificationModule } from './modules/notification/notification.module';
import { FileModule } from './modules/file/file.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { HealthModule } from './modules/health/health.module';
import { OpsModule } from './modules/ops/ops.module';
import { FieldServicesModule } from './modules/field-services/field-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RedisModule,
    QueueModule,
    AuthModule,
    FarmModule,
    DiagnosisModule,
    TaskModule,
    NotificationModule,
    FileModule,
    KnowledgeModule,
    HealthModule,
    OpsModule,
    FieldServicesModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
