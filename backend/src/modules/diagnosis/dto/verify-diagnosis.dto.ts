import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class VerifyDiagnosisDto {
  @ApiProperty({ enum: ['IMPROVED', 'UNCHANGED', 'WORSE', 'UNKNOWN'] })
  @IsIn(['IMPROVED', 'UNCHANGED', 'WORSE', 'UNKNOWN'])
  outcome: 'IMPROVED' | 'UNCHANGED' | 'WORSE' | 'UNKNOWN';

  @ApiPropertyOptional({ description: '复查时记录的现场变化' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
