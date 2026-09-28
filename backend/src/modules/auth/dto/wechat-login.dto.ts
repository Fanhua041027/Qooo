import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class WechatLoginDto {
  @ApiProperty({ description: 'wx.login 返回的临时 code' })
  @IsString()
  @MinLength(1)
  code: string;
}
