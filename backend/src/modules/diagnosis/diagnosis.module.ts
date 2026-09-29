import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FarmModule } from '../farm/farm.module';
import { FileModule } from '../file/file.module';
import { DIAGNOSIS_AI_PROVIDER, MockAiProvider } from './ai-provider';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisService } from './diagnosis.service';
import { ShennongAiProvider } from './shennong-ai-provider';

@Module({
  imports: [FarmModule, FileModule],
  controllers: [DiagnosisController],
  providers: [
    DiagnosisService,
    MockAiProvider,
    ShennongAiProvider,
    {
      provide: DIAGNOSIS_AI_PROVIDER,
      inject: [ConfigService, MockAiProvider, ShennongAiProvider],
      useFactory: (config: ConfigService, mock: MockAiProvider, shennong: ShennongAiProvider) =>
        config.get('AI_PROVIDER', 'mock') === 'shennong' ? shennong : mock,
    },
  ],
})
export class DiagnosisModule {}
