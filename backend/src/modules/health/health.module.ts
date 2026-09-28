import { Module } from '@nestjs/common';
import { FileModule } from '../file/file.module';
import { HealthController } from './health.controller';

@Module({ imports: [FileModule], controllers: [HealthController] })
export class HealthModule {}
