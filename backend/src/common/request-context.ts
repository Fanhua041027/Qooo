import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestContextValue {
  requestId: string;
  traceId: string;
  userId?: string;
}

export const requestContext = new AsyncLocalStorage<RequestContextValue>();

export function currentContext(): RequestContextValue {
  return requestContext.getStore() ?? {
    requestId: 'req_unknown',
    traceId: 'trace_unknown',
  };
}
