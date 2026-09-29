import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({ example: '向阳示范农场' })
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: '浙江省杭州市临安区' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  region: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @ApiPropertyOptional({ example: 18.6 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  areaMu?: number;
}

export class UpdateFarmDto extends PartialType(CreateFarmDto) {}
