import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import { requestContext } from './request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const requestId = this.header(request, 'x-request-id') ?? `req_${randomUUID()}`;
    const traceId = this.header(request, 'x-trace-id') ?? `trace_${randomUUID()}`;

    response.setHeader('X-Request-Id', requestId);
    response.setHeader('X-Trace-Id', traceId);
    requestContext.run({ requestId, traceId }, next);
  }

  private header(request: Request, name: string) {
    const value = request.headers[name];
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
  }
}
