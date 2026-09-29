import Taro from '@tarojs/taro'
import type { ApiEnvelope } from '@nongjianzhen/types'
import type { ApiTransport, TransportRequest } from '@nongjianzhen/api-client'
import { API_BASE_URL, AUTH_TOKEN_STORAGE_KEY } from '@/config/env'
import { createClientRequestId } from '@/utils/id'
import { clearAuthSession } from './auth-session'

export class ApiRequestError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly requestId?: string,
    public readonly details?: unknown,
    public readonly traceId?: string
  ) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

function buildUrl(path: string, query?: TransportRequest['query']) {
  const pairs = Object.entries(query || {}).filter(([, value]) => value !== undefined)
  const search = pairs.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`).join('&')
  return `${API_BASE_URL}${path}${search ? `?${search}` : ''}`
}

function getAccessToken() {
  try {
    return Taro.getStorageSync<string>(AUTH_TOKEN_STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

function normalizeErrorCode(code: string) {
  if (code === 'OPS_CONFIG_VERSION_CONFLICT') return 'CONFIG_VERSION_CONFLICT'
  return code
}

export const taroTransport: ApiTransport = {
  async request<TResponse, TBody>(request: TransportRequest<TBody>) {
    const requestId = createClientRequestId('req')
    const traceId = createClientRequestId('trace')
    const accessToken = getAccessToken()
    try {
      const response = await Taro.request<ApiEnvelope<TResponse>>({
        url: buildUrl(request.path, request.query),
        method: request.method,
        data: request.body,
        timeout: 15000,
        header: {
          'content-type': 'application/json',
          'X-Request-Id': requestId,
          'X-Trace-Id': traceId,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...(request.idempotencyKey ? { 'Idempotency-Key': request.idempotencyKey } : {})
        }
      })
      const envelope = response.data as Partial<ApiEnvelope<TResponse>> | undefined
      const errorEnvelope = envelope as (Partial<ApiEnvelope<TResponse>> & { details?: unknown }) | undefined
      const code = normalizeErrorCode(envelope?.code || (response.statusCode >= 200 && response.statusCode < 300 ? 'INVALID_RESPONSE' : 'HTTP_ERROR'))
      if (response.statusCode < 200 || response.statusCode >= 300 || envelope?.code !== 'OK') {
        if (response.statusCode === 401 || code === 'UNAUTHORIZED' || code === 'AUTH_EXPIRED') clearAuthSession('expired')
        throw new ApiRequestError(code, envelope?.message || '请求失败，请稍后重试', envelope?.requestId || requestId, errorEnvelope?.details ?? envelope?.data, envelope?.traceId || traceId)
      }
      return envelope as ApiEnvelope<TResponse>
    } catch (error) {
      if (error instanceof ApiRequestError) throw error
      throw new ApiRequestError('NETWORK_ERROR', '网络连接失败，请检查网络后重试', requestId, error, traceId)
    }
  }
}
