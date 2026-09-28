import Taro from '@tarojs/taro'
import { create } from 'zustand'
import type { AuthIdentity } from '@nongjianzhen/types'
import { toAuthIdentity } from '@nongjianzhen/api-client'
import { API_MODE, AUTH_TOKEN_STORAGE_KEY } from '@/config/env'
import { mockLogin } from '@/services/auth.api'
import { apiClient } from '@/services/client'

const STORAGE_KEY = 'nongjianzhen_auth_identity'

interface AuthState {
  identity: AuthIdentity | null
  initialized: boolean
  loading: boolean
  initialize: () => void
  loginWithMock: () => Promise<void>
  loginWithWechat: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  identity: null,
  initialized: false,
  loading: false,
  initialize: () => {
    const storedIdentity = Taro.getStorageSync<AuthIdentity>(STORAGE_KEY) || null
    const token = Taro.getStorageSync<string>(AUTH_TOKEN_STORAGE_KEY) || ''
    const identity = API_MODE === 'real' && storedIdentity && !token ? null : storedIdentity
    if (!identity && storedIdentity) Taro.removeStorageSync(STORAGE_KEY)
    set({ identity, initialized: true })
  },
  loginWithMock: async () => {
    set({ loading: true })
    try {
      const result = API_MODE === 'mock' ? null : await apiClient.mockLogin()
      const identity = result ? toAuthIdentity(result.data) : await mockLogin()
      if (result?.data.accessToken) Taro.setStorageSync(AUTH_TOKEN_STORAGE_KEY, result.data.accessToken)
      Taro.setStorageSync(STORAGE_KEY, identity)
      set({ identity })
    } finally {
      set({ loading: false })
    }
  },
  loginWithWechat: async () => {
    set({ loading: true })
    try {
      const codeResult = await Taro.login()
      if (!codeResult.code) throw new Error('未获得微信登录 code')
      const result = await apiClient.wechatLogin(codeResult.code)
      Taro.setStorageSync(AUTH_TOKEN_STORAGE_KEY, result.data.accessToken)
      const identity = toAuthIdentity(result.data)
      Taro.setStorageSync(STORAGE_KEY, identity)
      set({ identity })
    } finally {
      set({ loading: false })
    }
  },
  logout: () => {
    void apiClient.logout().catch(() => undefined)
    Taro.removeStorageSync(STORAGE_KEY)
    Taro.removeStorageSync(AUTH_TOKEN_STORAGE_KEY)
    set({ identity: null })
  }
}))
