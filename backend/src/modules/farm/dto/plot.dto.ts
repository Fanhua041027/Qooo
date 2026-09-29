import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePlotDto {
  @ApiProperty({ example: '东一号棚' })
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: '番茄' })
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  cropName: string;

  @ApiPropertyOptional({ example: '普罗旺斯' })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  cropVariety?: string;

  @ApiProperty({ example: '2026-07-01' })
  @IsDateString()
  plantedAt: string;

  @ApiPropertyOptional({ example: '结果期' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  growthStage?: string;

  @ApiPropertyOptional({ example: 3.2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  areaMu?: number;
}

export class UpdatePlotDto extends PartialType(CreatePlotDto) {}
