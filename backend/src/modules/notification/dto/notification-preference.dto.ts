import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationPreferenceDto {
  @ApiPropertyOptional({ description: '诊断完成通知', default: true })
  @IsOptional()
  @IsBoolean()
  diagnosisCompleted?: boolean;

  @ApiPropertyOptional({ description: '诊断失败通知', default: true })
  @IsOptional()
  @IsBoolean()
  diagnosisFailed?: boolean;

  @ApiPropertyOptional({ description: '任务到期通知', default: true })
  @IsOptional()
  @IsBoolean()
  taskDue?: boolean;

  @ApiPropertyOptional({ description: '任务逾期通知', default: true })
  @IsOptional()
  @IsBoolean()
  taskOverdue?: boolean;

  @ApiPropertyOptional({ description: '系统通知', default: true })
  @IsOptional()
  @IsBoolean()
  system?: boolean;
}
