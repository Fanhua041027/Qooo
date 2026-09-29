import Taro from '@tarojs/taro'
import type { OpsConfig, OpsConfigCategory, OpsConfigStatus, OpsConfigVersion, OpsConfigPreview } from '@nongjianzhen/types'
import { API_MODE, AUTH_TOKEN_STORAGE_KEY } from '@/config/env'
import { apiClient } from './client'
import { ApiRequestError } from './http'
import { canManageOpsConfig } from '@/store/ops-config.store'
import { DEFAULT_OPS_CONFIGS, readMockOpsConfigs, writeMockOpsConfigs, resetOpsConfigMock as resetMockStorage } from '../mocks/ops-config'
import { validateOpsConfigContent } from '@/pages/ops-config/policy'

export type { OpsConfig, OpsConfigCategory, OpsConfigStatus, OpsConfigVersion }
export interface OpsConfigEnvelope<T> { code: 'OK'; message: string; data: T; requestId: string }
export interface CreateOpsConfigInput { key: string; name: string; description: string; category: OpsConfigCategory; content: string }

const delay = () => new Promise((resolve) => setTimeout(resolve, 260))
const mockEnvelope = <T,>(data: T): OpsConfigEnvelope<T> => ({ code: 'OK', message: 'success', data, requestId: `mock_ops_${Date.now()}` })
function nextVersion(version: string) { const match = version.match(/^v(\d+)(?:\.(\d+))?/i); if (!match) return 'v1.0'; return `v${Number(match[1])}.${(match[2] === undefined ? 0 : Number(match[2])) + 1}` }
function validateOpsContent(content: string, category?: OpsConfigCategory) {
  const normalized = content.trim()
  const error = validateOpsConfigContent(normalized, category)
  if (error) throw new ApiRequestError(category === 'SAFETY' ? 'OPS_CONFIG_SAFETY_BLOCKED' : 'OPS_CONFIG_INVALID', error)
  return normalized
}
function assertMockOperator() {
  const token = Taro.getStorageSync<string>(AUTH_TOKEN_STORAGE_KEY) || ''
  const accountId = token.startsWith('mock_token_') ? token.slice('mock_token_'.length) : ''
  if (!accountId || !canManageOpsConfig(accountId === 'ops_admin_p0_001' ? 'ADMIN' : accountId === 'ops_expert_p0_001' ? 'EXPERT' : accountId === 'ops_p0_001' ? 'OPERATOR' : 'FARMER')) throw new ApiRequestError('FORBIDDEN', '没有运营配置权限')
}

function mockRole() {
  const token = Taro.getStorageSync<string>(AUTH_TOKEN_STORAGE_KEY) || ''
  if (token === 'mock_token_ops_admin_p0_001') return 'ADMIN'
  if (token === 'mock_token_ops_expert_p0_001') return 'EXPERT'
  return 'OPERATOR'
}

function mockDisplayName() {
  const role = mockRole()
  return role === 'ADMIN' ? '管理员测试账号' : role === 'EXPERT' ? '农艺专家测试账号' : '运营测试账号'
}
const mockApi = {
  async list() { assertMockOperator(); await delay(); const items = readMockOpsConfigs(); return mockEnvelope({ items, total: items.length }) },
  async get(key: string) { assertMockOperator(); await delay(); const item = readMockOpsConfigs().find((config) => config.key === key); if (!item) throw new ApiRequestError('OPS_CONFIG_NOT_FOUND', '未找到该配置，请刷新后重试'); return mockEnvelope(item) },
  async save(key: string, content: string, expectedVersion?: string) {
    assertMockOperator(); await delay()
    const items = readMockOpsConfigs(); const index = items.findIndex((config) => config.key === key); if (index < 0) throw new ApiRequestError('OPS_CONFIG_NOT_FOUND', '配置不存在，无法保存')
    if (content.includes('[保存失败演示]')) throw new ApiRequestError('OPS_CONFIG_INVALID', '配置校验未通过：文案包含保存失败演示标记')
    const current = items[index]; const normalized = validateOpsContent(content, current.category); const now = new Date().toISOString(); const updated: OpsConfig = { ...current, content: normalized, version: nextVersion(current.version), status: 'PUBLISHED', updatedAt: now, updatedBy: mockDisplayName(), previousVersions: [{ version: current.version, content: current.content, updatedAt: current.updatedAt, updatedBy: current.updatedBy }, ...current.previousVersions] }
    if (current.category === 'SAFETY' && !['EXPERT', 'ADMIN'].includes(mockRole())) throw new ApiRequestError('FORBIDDEN', '安全配置只能由农艺专家或管理员发布')
    if (expectedVersion && expectedVersion !== current.version) throw new ApiRequestError('OPS_CONFIG_VERSION_CONFLICT', '配置版本已更新，请重新加载后再保存')
    items[index] = updated; writeMockOpsConfigs(items); return mockEnvelope(updated)
  },
  async rollback(key: string, version: string) {
    assertMockOperator(); await delay(); const items = readMockOpsConfigs(); const index = items.findIndex((config) => config.key === key); if (index < 0) throw new ApiRequestError('OPS_CONFIG_NOT_FOUND', '配置不存在，无法恢复')
    const current = items[index]; const target = current.previousVersions.find((item) => item.version === version); if (!target) throw new ApiRequestError('OPS_CONFIG_VERSION_NOT_FOUND', '上一版本不存在，请刷新后重试')
    if (current.category === 'SAFETY' && !['EXPERT', 'ADMIN'].includes(mockRole())) throw new ApiRequestError('FORBIDDEN', '安全配置只能由农艺专家或管理员回滚')
    const now = new Date().toISOString(); const updated: OpsConfig = { ...current, content: target.content, version: nextVersion(current.version), status: 'PUBLISHED', updatedAt: now, updatedBy: mockDisplayName(), previousVersions: [{ version: current.version, content: current.content, updatedAt: current.updatedAt, updatedBy: current.updatedBy }, ...current.previousVersions] }
    items[index] = updated; writeMockOpsConfigs(items); return mockEnvelope(updated)
  },
  async preview(key: string, content: string) {
    assertMockOperator(); await delay()
    const current = readMockOpsConfigs().find((item) => item.key === key)
    const normalized = validateOpsContent(content, current?.category)
    return mockEnvelope<OpsConfigPreview>({ key, content: normalized, valid: true, errors: [] })
  }
}

export const opsConfigApi = {
  async list() {
    try { return API_MODE === 'mock' ? await mockApi.list() : await apiClient.listOpsConfigs() }
    catch (reason) {
      if (reason instanceof ApiRequestError && ['FORBIDDEN', 'UNAUTHORIZED'].includes(reason.code)) throw reason
      return mockEnvelope({ items: DEFAULT_OPS_CONFIGS.map((item) => ({ ...item, fallback: true })), total: DEFAULT_OPS_CONFIGS.length })
    }
  },
  async get(key: string) {
    try { return API_MODE === 'mock' ? await mockApi.get(key) : await apiClient.getOpsConfig(key) }
    catch (reason) {
      if (reason instanceof ApiRequestError && ['FORBIDDEN', 'UNAUTHORIZED'].includes(reason.code)) throw reason
      const fallback = DEFAULT_OPS_CONFIGS.find((item) => item.key === key)
      if (!fallback) throw reason
      return mockEnvelope({ ...fallback, fallback: true })
    }
  },
  save: (key: string, content: string, expectedVersion?: string) => API_MODE === 'mock' ? mockApi.save(key, content, expectedVersion) : apiClient.updateOpsConfig(key, content, expectedVersion),
  preview: (key: string, content: string, category?: OpsConfigCategory) => API_MODE === 'mock' ? mockApi.preview(key, content) : apiClient.previewOpsConfig({ key, content, category }) as Promise<{ data: OpsConfigPreview }>,
  rollback: (key: string, version: string) => API_MODE === 'mock' ? mockApi.rollback(key, version) : apiClient.rollbackOpsConfig(key, version),
  async create(input: CreateOpsConfigInput) {
    if (API_MODE === 'real') return apiClient.createOpsConfig(input)
    assertMockOperator(); await delay(); const content = input.content.trim(); const key = input.key.trim();
    if (!key || !input.name.trim() || !content) throw new ApiRequestError('OPS_CONFIG_INVALID', '配置键、名称和内容不能为空')
    if (content.length > 2000) throw new ApiRequestError('OPS_CONFIG_INVALID', '配置内容不能超过 2000 个字符')
    const validationError = validateOpsConfigContent(content, input.category)
    if (validationError) throw new ApiRequestError(input.category === 'SAFETY' ? 'OPS_CONFIG_SAFETY_BLOCKED' : 'OPS_CONFIG_INVALID', validationError)
    const items = readMockOpsConfigs(); if (items.some((item) => item.key === key)) throw new ApiRequestError('OPS_CONFIG_INVALID', '配置键已存在，请换一个键名')
    if (!input.description.trim()) throw new ApiRequestError('OPS_CONFIG_INVALID', '配置说明不能为空')
    if (!(['RISK', 'ACTION', 'IMAGE_QUALITY', 'SAFETY', 'EXPERT_REVIEW', 'HOME'] as string[]).includes(input.category)) throw new ApiRequestError('OPS_CONFIG_INVALID', '配置分类不合法')
    if (input.category === 'SAFETY' && !['EXPERT', 'ADMIN'].includes(mockRole())) throw new ApiRequestError('FORBIDDEN', '安全配置只能由农艺专家或管理员发布')
    const normalized = validateOpsContent(content, input.category); const now = new Date().toISOString(); const item: OpsConfig = { key, name: input.name.trim(), description: input.description.trim(), category: input.category, status: 'PUBLISHED', content: normalized, version: 'v1.0', updatedAt: now, updatedBy: mockDisplayName(), previousVersions: [] }; writeMockOpsConfigs([item, ...items]); return mockEnvelope(item)
  }
}
export function resetOpsConfigMock() { resetMockStorage() }
