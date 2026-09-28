import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateUploadDto {
  @ApiProperty({ enum: ['image/jpeg', 'image/png', 'image/webp'] })
  @IsIn(['image/jpeg', 'image/png', 'image/webp'])
  contentType: string;

  @ApiProperty({ enum: ['jpg', 'jpeg', 'png', 'webp'] })
  @IsIn(['jpg', 'jpeg', 'png', 'webp'])
  extension: string;

  @ApiProperty({ required: false, maximum: 10485760 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10 * 1024 * 1024)
  size?: number;

  @ApiProperty({ required: false, example: 'diagnoses' })
  @IsOptional()
  @IsString()
  purpose?: string;
}
