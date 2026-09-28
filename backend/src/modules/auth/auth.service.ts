import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiError } from '../../common/api-error';
import { ErrorCode } from '../../common/error-codes';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async mockLogin(accountId: string) {
    if (this.config.get('MOCK_LOGIN_ENABLED', 'false') !== 'true') {
      throw new ApiError(ErrorCode.MOCK_LOGIN_DISABLED, '当前环境未开放模拟登录', HttpStatus.FORBIDDEN);
    }

    const user = await this.prisma.user.findFirst({ where: { id: accountId, mockAccount: true } });
    if (!user) {
      throw new ApiError(ErrorCode.MOCK_ACCOUNT_NOT_FOUND, '测试账号不存在', HttpStatus.NOT_FOUND);
    }

    return {
      accessToken: await this.jwt.signAsync({ sub: user.id, role: user.role, nickname: user.nickname }),
      tokenType: 'Bearer',
      expiresIn: this.config.get('JWT_EXPIRES_IN', '7d'),
      user: this.presentUser(user),
    };
  }

  wechatLogin() {
    throw new ApiError(
      ErrorCode.WECHAT_LOGIN_NOT_CONFIGURED,
      '体验环境尚未配置微信 AppID 和 AppSecret，请使用模拟登录',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(ErrorCode.UNAUTHORIZED, '登录状态已失效', HttpStatus.UNAUTHORIZED);
    return this.presentUser(user);
  }

  private presentUser(user: { id: string; nickname: string; avatarUrl: string | null; role: string }) {
    return { id: user.id, nickname: user.nickname, avatarUrl: user.avatarUrl, role: user.role.toLowerCase() };
  }
}
