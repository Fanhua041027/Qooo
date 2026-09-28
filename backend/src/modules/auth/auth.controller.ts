import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, AuthUser } from '../../common/current-user.decorator';
import { Public } from '../../common/public.decorator';
import { AuthService } from './auth.service';
import { MockLoginDto } from './dto/mock-login.dto';
import { WechatLoginDto } from './dto/wechat-login.dto';

@ApiTags('认证')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('mock-login')
  @HttpCode(200)
  @ApiOperation({ summary: '开发和体验环境模拟登录' })
  mockLogin(@Body() input: MockLoginDto) {
    return this.auth.mockLogin(input.accountId);
  }

  @Public()
  @Post('wechat-login')
  @HttpCode(200)
  @ApiOperation({ summary: '微信 code 登录适配入口' })
  wechatLogin(@Body() _input: WechatLoginDto) {
    return this.auth.wechatLogin();
  }

  @Post('logout')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: '退出登录；客户端删除无状态访问令牌' })
  logout() {
    return { loggedOut: true };
  }

}

@ApiTags('认证')
@ApiBearerAuth()
@Controller('v1/me')
export class MeController {
  constructor(private readonly auth: AuthService) {}

  @Get()
  @ApiOperation({ summary: '当前用户资料' })
  profile(@CurrentUser() user: AuthUser) {
    return this.auth.getMe(user.id);
  }
}
