import { create } from 'zustand'
import type { OpsConfig } from '@nongjianzhen/types'
import { API_MODE } from '@/config/env'
import { DEFAULT_OPS_CONFIGS, readMockOpsConfigs } from '../mocks/ops-config'
import { apiClient } from '@/services/client'

export function canManageOpsConfig(role?: string) {
  const normalized = String(role || '').toUpperCase()
  return normalized === 'OPERATOR' || normalized === 'EXPERT' || normalized === 'ADMIN'
}

export function splitOpsContent(content: string) {
  try {
    const payload = JSON.parse(content) as { title?: unknown; label?: unknown; description?: unknown; message?: unknown }
    const title = typeof payload.title === 'string' ? payload.title : typeof payload.label === 'string' ? payload.label : ''
    const body = typeof payload.description === 'string' ? payload.description : typeof payload.message === 'string' ? payload.message : ''
    if (title || body) return { title: title.trim(), body: body.trim() }
  } catch { /* 兼容旧版两行文案 */ }
  const [title = '', ...rest] = content.split(/\r?\n/)
  return { title: title.trim(), body: rest.join('\n').trim() }
}

interface OpsConfigState {
  configs: OpsConfig[]
  loading: boolean
  error: string
  loaded: boolean
  load: (force?: boolean) => Promise<void>
  get: (key: string) => OpsConfig | undefined
  replaceAll: (configs: OpsConfig[]) => void
  replace: (config: OpsConfig) => void
  invalidate: (key?: string) => void
}

const fallback = () => API_MODE === 'mock' ? readMockOpsConfigs() : DEFAULT_OPS_CONFIGS.map((item) => ({ ...item, fallback: true }))
let requestVersion = 0

export const useOpsConfigStore = create<OpsConfigState>((set, get) => ({
  configs: fallback(), loading: false, error: '', loaded: false,
  load: async (force = false) => {
    if (get().loading || (get().loaded && !force)) return
    const version = ++requestVersion
    set({ loading: true, error: '' })
    try {
      const items = API_MODE === 'mock' ? readMockOpsConfigs() : (await apiClient.listOpsConfigs()).data.items
      if (version === requestVersion) set({ configs: items, loaded: true, error: '' })
    } catch (reason) {
      if (version === requestVersion) set({ error: reason instanceof Error ? reason.message : '配置读取失败，已保留上一版文案' })
    } finally {
      if (version === requestVersion) set({ loading: false })
    }
  },
  get: (key) => get().configs.find((item) => item.key === key),
  replaceAll: (configs) => set({ configs: configs.map((item) => ({ ...item, previousVersions: item.previousVersions.map((version) => ({ ...version })) })), loaded: true, error: '' }),
  replace: (config) => set((state) => ({ configs: state.configs.some((item) => item.key === config.key) ? state.configs.map((item) => item.key === config.key ? config : item) : [config, ...state.configs], loaded: true, error: '' })),
  invalidate: (key) => set((state) => ({ configs: key ? state.configs.filter((item) => item.key !== key) : state.configs, loaded: false }))
}))
