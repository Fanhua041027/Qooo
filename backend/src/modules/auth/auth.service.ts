import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
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

  async wechatLogin(code: string) {
    const appId = this.config.get<string>('WECHAT_APP_ID');
    const appSecret = this.config.get<string>('WECHAT_APP_SECRET');
    if (!appId || !appSecret) {
      throw new ApiError(
        ErrorCode.WECHAT_LOGIN_NOT_CONFIGURED,
        '当前环境尚未配置微信 AppID 和 AppSecret，请联系管理员',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }

    let payload: { openid?: string; unionid?: string; errcode?: number; errmsg?: string };
    try {
      const response = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: { appid: appId, secret: appSecret, js_code: code, grant_type: 'authorization_code' },
        timeout: 8000,
      });
      payload = response.data as typeof payload;
    } catch {
      throw new ApiError(ErrorCode.UPSTREAM_ERROR, '微信登录服务暂时不可用，请稍后重试', HttpStatus.BAD_GATEWAY);
    }
    if (!payload.openid || payload.errcode) {
      throw new ApiError(ErrorCode.UNAUTHORIZED, payload.errmsg || '微信登录凭证无效，请重新登录', HttpStatus.UNAUTHORIZED, { wechatCode: payload.errcode });
    }

    const user = await this.prisma.user.upsert({
      where: { wechatOpenId: payload.openid },
      create: { wechatOpenId: payload.openid, nickname: '微信农户', role: 'FARMER' },
      update: payload.unionid ? { nickname: '微信农户' } : {},
    });
    return {
      accessToken: await this.jwt.signAsync({ sub: user.id, role: user.role, nickname: user.nickname }),
      tokenType: 'Bearer',
      expiresIn: this.config.get('JWT_EXPIRES_IN', '7d'),
      user: this.presentUser(user),
    };
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
