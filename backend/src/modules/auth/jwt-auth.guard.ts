import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ApiError } from '../../common/api-error';
import { AuthUser } from '../../common/current-user.decorator';
import { ErrorCode } from '../../common/error-codes';
import { IS_PUBLIC_KEY } from '../../common/public.decorator';
import { requestContext } from '../../common/request-context';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext) {
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request & { user: AuthUser }>();
    const token = this.extractToken(request);
    if (!token) throw new ApiError(ErrorCode.UNAUTHORIZED, '请先登录', HttpStatus.UNAUTHORIZED);

    try {
      const payload = await this.jwt.verifyAsync<{ sub: string; role: string; nickname: string }>(token);
      request.user = { id: payload.sub, role: payload.role, nickname: payload.nickname };
      const store = requestContext.getStore();
      if (store) store.userId = payload.sub;
      return true;
    } catch {
      throw new ApiError(ErrorCode.UNAUTHORIZED, '登录状态已失效', HttpStatus.UNAUTHORIZED);
    }
  }

  private extractToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
