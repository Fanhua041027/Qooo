import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

const KEY_PATTERN = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)+$/;

export class OpsConfigKeyDto {
  @ApiProperty({ example: 'risk.medium.label' })
  @IsString()
  @Matches(KEY_PATTERN, { message: '配置 key 只能使用小写字母、数字、点、下划线和短横线' })
  key: string;
}

export class UpdateOpsConfigDto {
  @ApiProperty({ example: '中风险｜建议 24 小时内复查\n当前情况可能影响叶片或果实。' })
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  content: string;

  @ApiPropertyOptional({ example: 'v3', description: '客户端读取到的版本；不一致时拒绝覆盖' })
  @IsOptional()
  @IsString()
  @Matches(/^v[1-9][0-9]*(?:\.[0-9]+)?$/, { message: '版本号格式应为 v 加数字版本' })
  expectedVersion?: string;
}

export class CreateOpsConfigDto extends UpdateOpsConfigDto {
  @ApiProperty({ example: 'home.quick-start' })
  @Matches(KEY_PATTERN, { message: '配置 key 只能使用小写字母、数字、点、下划线和短横线' })
  key: string;

  @ApiProperty({ example: '首页拍照引导' })
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: '首页主操作区的辅助说明' })
  @IsString()
  @MaxLength(200)
  description: string;

  @ApiProperty({ enum: ['RISK', 'ACTION', 'IMAGE_QUALITY', 'SAFETY', 'EXPERT_REVIEW', 'HOME'] })
  @IsIn(['RISK', 'ACTION', 'IMAGE_QUALITY', 'SAFETY', 'EXPERT_REVIEW', 'HOME'])
  category: string;
}

export class PreviewOpsConfigDto extends UpdateOpsConfigDto {
  @ApiPropertyOptional({ example: 'risk.medium.label' })
  @IsOptional()
  @IsString()
  @Matches(KEY_PATTERN, { message: '配置 key 只能使用小写字母、数字、点、下划线和短横线' })
  key?: string;

  @ApiPropertyOptional({ enum: ['RISK', 'ACTION', 'IMAGE_QUALITY', 'SAFETY', 'EXPERT_REVIEW', 'HOME'] })
  @IsOptional()
  @IsIn(['RISK', 'ACTION', 'IMAGE_QUALITY', 'SAFETY', 'EXPERT_REVIEW', 'HOME'])
  category?: string;
}

export class RollbackOpsConfigDto {
  @ApiProperty({ example: 'v2' })
  @IsString()
  @Matches(/^v[1-9][0-9]*$/, { message: '版本号格式应为 v 加正整数' })
  version: string;
}
