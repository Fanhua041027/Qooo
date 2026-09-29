export type ApiMode = 'mock' | 'real'

export const API_MODE: ApiMode = process.env.TARO_APP_API_MODE === 'real' ? 'real' : 'mock'
export const API_BASE_URL = process.env.TARO_APP_API_BASE_URL || 'http://127.0.0.1:3000'
export const AUTH_TOKEN_STORAGE_KEY = 'nongjianzhen_access_token'
export const SUBSCRIBE_TEMPLATE_IDS = (process.env.TARO_APP_SUBSCRIBE_TEMPLATE_IDS || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean)
