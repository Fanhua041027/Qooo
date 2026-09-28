import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class DiagnosisImageDto {
  @ApiProperty({ example: 'users/user_p0_farmer_001/diagnoses/demo.jpg' })
  @IsString()
  @MinLength(1)
  objectKey: string;

  @ApiPropertyOptional({ example: 1200 })
  @IsOptional()
  @IsInt()
  @Min(1)
  width?: number;

  @ApiPropertyOptional({ example: 1600 })
  @IsOptional()
  @IsInt()
  @Min(1)
  height?: number;

  @ApiPropertyOptional({ example: { status: 'pass', issues: [] } })
  @IsOptional()
  @IsObject()
  quality?: Record<string, unknown>;
}

export class CreateDiagnosisDto {
  @ApiProperty({ description: '客户端生成的幂等键', example: 'client_req_demo_001' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  clientRequestId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  farmId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plotId?: string;

  @ApiPropertyOptional({ example: '番茄' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  cropName?: string;

  @ApiPropertyOptional({ example: '结果期' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  growthStage?: string;

  @ApiPropertyOptional({ example: '叶片出现水渍状病斑' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ type: [DiagnosisImageDto], minItems: 1, maxItems: 6 })
  @IsArray()
  @ArrayMaxSize(6)
  @ValidateNested({ each: true })
  @Type(() => DiagnosisImageDto)
  images: DiagnosisImageDto[];
}
