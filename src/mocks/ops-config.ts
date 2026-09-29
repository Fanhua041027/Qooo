import Taro from '@tarojs/taro'
import type { OpsConfig } from '@nongjianzhen/types'
import { AGRICULTURE_OPS_CONFIGS } from '@/content/ops-config-seed'

export const OPS_CONFIG_STORAGE_KEY = 'nongjianzhen_ops_configs_v1'

/** Mock 环境直接使用农业内容负责人交付的结构化配置，避免页面和知识库各自维护文案。 */
export const DEFAULT_OPS_CONFIGS: OpsConfig[] = AGRICULTURE_OPS_CONFIGS

function clone(items: OpsConfig[]) {
  return items.map((item) => ({ ...item, previousVersions: item.previousVersions.map((version) => ({ ...version })) }))
}

function mergeDefaults(items: OpsConfig[]) {
  const keys = new Set(items.map((item) => item.key))
  return [...items, ...DEFAULT_OPS_CONFIGS.filter((item) => !keys.has(item.key))]
}

export function readMockOpsConfigs() {
  const stored = Taro.getStorageSync<OpsConfig[]>(OPS_CONFIG_STORAGE_KEY)
  if (Array.isArray(stored)) {
    const migrated = mergeDefaults(stored)
    if (migrated.length !== stored.length) Taro.setStorageSync(OPS_CONFIG_STORAGE_KEY, migrated)
    return clone(migrated)
  }
  const seeded = clone(DEFAULT_OPS_CONFIGS)
  Taro.setStorageSync(OPS_CONFIG_STORAGE_KEY, seeded)
  return seeded
}

export function writeMockOpsConfigs(items: OpsConfig[]) {
  Taro.setStorageSync(OPS_CONFIG_STORAGE_KEY, clone(items))
}

export function resetOpsConfigMock() {
  Taro.removeStorageSync(OPS_CONFIG_STORAGE_KEY)
}
