import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { currentContext } from './request-context';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        const { requestId, traceId } = currentContext();
        return { code: 'OK', message: 'success', data, requestId, traceId };
      }),
    );
  }
}
