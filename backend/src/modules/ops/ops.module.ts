import { Module } from '@nestjs/common';
import { OpsConfigController } from './ops-config.controller';
import { OpsConfigService } from './ops-config.service';

@Module({
  controllers: [OpsConfigController],
  providers: [OpsConfigService],
  exports: [OpsConfigService],
})
export class OpsModule {}
