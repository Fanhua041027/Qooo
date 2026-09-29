import Taro from '@tarojs/taro'
import { AUTH_TOKEN_STORAGE_KEY } from '@/config/env'

export type AuthSessionEvent = 'expired' | 'logout'
type AuthSessionListener = (event: AuthSessionEvent) => void

const IDENTITY_STORAGE_KEY = 'nongjianzhen_auth_identity'
const listeners = new Set<AuthSessionListener>()
let lastExpiredAt = 0

export function onAuthSessionChange(listener: AuthSessionListener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function clearAuthSession(event: AuthSessionEvent = 'expired') {
  if (event === 'expired' && Date.now() - lastExpiredAt < 1000) return
  if (event === 'expired') lastExpiredAt = Date.now()
  try {
    Taro.removeStorageSync(AUTH_TOKEN_STORAGE_KEY)
    Taro.removeStorageSync(IDENTITY_STORAGE_KEY)
  } catch {
    // 存储不可用时仍然通知内存态，页面可以进入登录恢复流程。
  }
  listeners.forEach((listener) => listener(event))
}
