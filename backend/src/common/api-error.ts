import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeValue } from './error-codes';

export class ApiError extends HttpException {
  constructor(
    public readonly code: ErrorCodeValue,
    message: string,
    status: HttpStatus,
    public readonly details: Record<string, unknown> = {},
  ) {
    super(message, status);
  }
}
