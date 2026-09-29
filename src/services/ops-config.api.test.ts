import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClient } from '@nongjianzhen/api-client'

const storage = vi.hoisted(() => new Map<string, unknown>())

vi.mock('@tarojs/taro', () => ({
  default: {
    getStorageSync: (key: string) => storage.get(key),
    setStorageSync: (key: string, value: unknown) => storage.set(key, value),
    removeStorageSync: (key: string) => storage.delete(key)
  }
}))

import { opsConfigApi, resetOpsConfigMock } from './ops-config.api'
import { readMockOpsConfigs, writeMockOpsConfigs } from '@/mocks/ops-config'
import { mockTransport } from '@/mocks/transport'

describe('运营配置 Mock API', () => {
  beforeEach(() => {
    storage.clear()
    storage.set('nongjianzhen_access_token', 'mock_token_ops_p0_001')
    resetOpsConfigMock()
    const seeded = readMockOpsConfigs()
    const medium = seeded.find((item) => item.key === 'risk.medium')!
    medium.version = 'v1.4'
    medium.previousVersions = [{ version: 'v1.3', content: medium.content, updatedAt: medium.updatedAt, updatedBy: medium.updatedBy }]
    const observe = seeded.find((item) => item.key === 'action.observe')!
    observe.version = 'v2.1'
    observe.previousVersions = [{ version: 'v2.0', content: `${observe.content}\n继续观察并记录变化`, updatedAt: observe.updatedAt, updatedBy: observe.updatedBy }]
    writeMockOpsConfigs(seeded)
  })

  it('shared mock config storage', async () => {
    const before = (await opsConfigApi.get('home.quick-start')).data
    const saved = (await opsConfigApi.save(before.key, before.content, before.version)).data
    const client = new ApiClient(mockTransport)
    const fromTransport = (await client.getOpsConfig(before.key)).data
    expect(fromTransport.version).toBe(saved.version)
    expect(fromTransport.content).toBe(saved.content)
  })

  it('列表项包含当前版本和最后修改时间', async () => {
    const response = await opsConfigApi.list()
    expect(response.data.total).toBeGreaterThanOrEqual(10)
    expect(response.data.items[0]).toMatchObject({ version: expect.stringMatching(/^v/), updatedAt: expect.any(String) })
  })

  it('未登录或农户账号不能读取配置', async () => {
    storage.delete('nongjianzhen_access_token')
    await expect(opsConfigApi.list()).rejects.toMatchObject({ code: 'FORBIDDEN' })
    storage.set('nongjianzhen_access_token', 'mock_token_user_p0_farmer_001')
    await expect(opsConfigApi.list()).rejects.toMatchObject({ code: 'FORBIDDEN' })
  })

  it('保存会生成新版本并保留旧版本', async () => {
    const before = (await opsConfigApi.get('risk.medium')).data
    const content = JSON.parse(before.content) as Record<string, unknown>
    content.description = `${String(content.description || '')} 新增复查提醒`
    const after = (await opsConfigApi.save(before.key, JSON.stringify(content))).data

    expect(after.version).toBe('v1.5')
    expect(after.content).toContain('新增复查提醒')
    expect(after.previousVersions[0]).toMatchObject({ version: 'v1.4', content: before.content })
  })

  it('拒绝空文案和演示失败标记', async () => {
    await expect(opsConfigApi.save('action.observe', '   ')).rejects.toThrow('配置内容不能为空')
    await expect(opsConfigApi.save('action.observe', '[保存失败演示]')).rejects.toThrow('配置校验未通过')
  })

  it('恢复历史版本会生成恢复版本并保留当前版本', async () => {
    const before = (await opsConfigApi.get('action.observe')).data
    const after = (await opsConfigApi.rollback(before.key, 'v2.0')).data

    expect(after.version).toBe('v2.2')
    expect(after.content).toContain('继续观察并记录变化')
    expect(after.previousVersions[0]).toMatchObject({ version: 'v2.1', content: before.content })
  })

  it('不存在的配置键会返回明确错误', async () => {
    await expect(opsConfigApi.get('missing.key')).rejects.toThrow('未找到该配置')
    await expect(opsConfigApi.save('missing.key', '有效文案')).rejects.toThrow('配置不存在')
  })

  it('支持创建配置并避免重复键', async () => {
    const created = await opsConfigApi.create({ key: 'home.new-tip', name: '新提示', description: '测试', category: 'HOME', content: '新内容' })
    expect(created.data.version).toBe('v1.0')
    await expect(opsConfigApi.create({ key: 'home.new-tip', name: '重复', description: '重复说明', category: 'HOME', content: '重复' })).rejects.toThrow('配置键已存在')
  })

  it('管理员可以保存安全配置，但不能移除安全边界', async () => {
    storage.set('nongjianzhen_access_token', 'mock_token_ops_admin_p0_001')
    const before = (await opsConfigApi.get('safety.uncertain-pesticide')).data
    const payload = JSON.parse(before.content) as Record<string, unknown>
    payload.description = '请先核对登记信息并咨询当地农技人员。'
    const after = (await opsConfigApi.save(before.key, JSON.stringify(payload), before.version)).data
    expect(after.version).toBe('v1.1')
    await expect(opsConfigApi.save(before.key, JSON.stringify({ title: '危险示例' }), after.version)).rejects.toMatchObject({ code: 'OPS_CONFIG_SAFETY_BLOCKED' })
  })
})
