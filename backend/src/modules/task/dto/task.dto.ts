import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiPropertyOptional({ description: '客户端重试幂等键；同一用户和键只创建一条任务' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  clientRequestId?: string;

  @ApiProperty({ example: '检查番茄叶片背面' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  farmId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plotId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  diagnosisId?: string;

  @ApiPropertyOptional({ enum: ['low', 'medium', 'high'], default: 'medium' })
  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dueAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  assignee?: string;
}

export class UpdateTaskDto extends PartialType(OmitType(CreateTaskDto, ['clientRequestId'] as const)) {}

export class CompleteTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}
