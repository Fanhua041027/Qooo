import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiError } from './api-error';
import { ErrorCode } from './error-codes';
import { currentContext } from './request-context';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { requestId, traceId } = currentContext();

    if (exception instanceof ApiError) {
      response.status(exception.getStatus()).json({
        code: exception.code,
        message: exception.message,
        details: exception.details,
        requestId,
        traceId,
      });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      const validationMessages =
        typeof body === 'object' && body && 'message' in body ? (body as { message: unknown }).message : undefined;
      response.status(status).json({
        code: status === HttpStatus.UNAUTHORIZED ? ErrorCode.UNAUTHORIZED : ErrorCode.VALIDATION_ERROR,
        message: Array.isArray(validationMessages) ? validationMessages.join('；') : exception.message,
        details: {},
        requestId,
        traceId,
      });
      return;
    }

    console.error(`[${requestId}] [${traceId}]`, exception);
    response.status(500).json({
      code: ErrorCode.INTERNAL_ERROR,
      message: '服务暂时不可用',
      details: {},
      requestId,
      traceId,
    });
  }
}
