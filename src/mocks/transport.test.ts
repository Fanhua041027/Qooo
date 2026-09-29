import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClient } from '@nongjianzhen/api-client'
import { ApiRequestError } from '@/services/http'

const storage = vi.hoisted(() => new Map<string, unknown>())

vi.mock('@tarojs/taro', () => ({
  default: {
    getStorageSync: (key: string) => storage.get(key),
    setStorageSync: (key: string, value: unknown) => storage.set(key, value)
  }
}))

import { mockTransport } from './transport'

describe('Mock API transport', () => {
  beforeEach(() => storage.clear())

  it('按服务端契约创建诊断并支持幂等重试', async () => {
    const client = new ApiClient(mockTransport)
    const input = {
      crop: { name: '番茄', growthStage: '开花期' },
      images: [{ url: 'wxfile://diagnosis.jpg', objectKey: 'diagnoses/diagnosis.jpg', width: 1280, height: 960, quality: { status: 'PASS' as const, issues: [] } }],
      clientRequestId: 'client_diag_test_001'
    }

    const first = await client.createDiagnosis(input)
    const second = await client.createDiagnosis(input)

    expect(first.data.id).toBe(second.data.id)
    expect(first.data.crop).toBe('番茄')
    expect(first.data.status).toBe('PROCESSING')
  })

  it('历史记录经过归一化后仍保留作物和结构化判断', async () => {
    const client = new ApiClient(mockTransport)
    const history = await client.listDiagnoses()

    expect(history.data.items[0].crop).toBe('番茄')
    expect(history.data.items[0].possibleIssues[0]?.name).toBe('疑似晚疫病')
  })

  it('失败诊断通过重试接口回到处理中', async () => {
    const client = new ApiClient(mockTransport)
    const created = await client.createDiagnosis({
      crop: { name: '番茄', growthStage: '开花期' },
      images: [{ url: 'wxfile://retry.jpg', objectKey: 'diagnoses/retry.jpg', width: 1280, height: 960, quality: { status: 'PASS' as const, issues: [] } }],
      clientRequestId: 'client_diag_retry_001'
    })
    const database = storage.get('nongjianzhen_mock_db_v1') as { diagnoses: Array<Record<string, unknown>> }
    database.diagnoses[0] = { ...database.diagnoses[0], status: 'FAILED', error: { code: 'AI_PROVIDER_ERROR', message: '诊断服务暂时不可用' } }
    storage.set('nongjianzhen_mock_db_v1', database)

    const retried = await client.retryDiagnosis(created.data.id)

    expect(retried.data.id).toBe(created.data.id)
    expect(retried.data.status).toBe('PROCESSING')
  })

  it('创建农场时接受 API Client 转换后的 region 字段', async () => {
    const client = new ApiClient(mockTransport)
    const created = await client.createFarm({ name: '测试农场', location: '浙江杭州' })

    expect(created.data).toMatchObject({ name: '测试农场', location: '浙江杭州' })
  })

  it('农场和地块编辑删除后仍能通过列表读取最新状态', async () => {
    const client = new ApiClient(mockTransport)
    const farm = (await client.listFarms()).data.items[0]!
    const originalPlot = farm.plots![0]!

    await client.updateFarm(farm.id, { name: '更新后的农场', location: '新的地区' })
    await client.updatePlot(originalPlot.id, { growthStage: '采收期' })
    await client.deletePlot(originalPlot.id)

    const farms = await client.listFarms()
    expect(farms.data.items[0]).toMatchObject({ name: '更新后的农场', location: '新的地区' })
    expect(farms.data.items[0]!.plots).not.toEqual(expect.arrayContaining([expect.objectContaining({ id: originalPlot.id })]))
  })

  it('同一任务幂等键重复提交只返回同一条任务', async () => {
    const client = new ApiClient(mockTransport)
    const input = { title: '复查叶片', clientRequestId: 'client_task_test_001', priority: 'MEDIUM' as const }

    const first = await client.createTask(input)
    const second = await client.createTask(input)

    expect(second.data.id).toBe(first.data.id)
    expect((await client.listTasks()).data.items.filter((task) => task.title === '复查叶片')).toHaveLength(1)
  })

  it('任务可以调整执行内容和日期并持久化', async () => {
    const client = new ApiClient(mockTransport)
    const task = (await client.listTasks()).data.items[0]!
    await client.updateTask(task.id, { title: '调整后的复查任务', description: '补拍叶片背面', dueAt: '2026-10-01T09:00:00.000Z' })

    const updated = (await client.listTasks()).data.items.find((item) => item.id === task.id)
    expect(updated).toMatchObject({ title: '调整后的复查任务', description: '补拍叶片背面', dueAt: '2026-10-01T09:00:00.000Z' })
  })

  it('消息列表支持未读统计与标记已读', async () => {
    const client = new ApiClient(mockTransport)
    const before = await client.unreadMessageCount()
    expect(before.data.count).toBe(1)

    const messages = await client.listMessages()
    expect(messages.data.items[0]?.title).toBe('欢迎使用农间诊')
    await client.markMessageRead(messages.data.items[0]!.id)

    const after = await client.unreadMessageCount()
    expect(after.data.count).toBe(0)
  })

  it('JEV 闭环会随任务创建、完成和复查推进', async () => {
    const client = new ApiClient(mockTransport)
    const diagnosis = await client.createDiagnosis({
      crop: { name: '番茄', growthStage: '结果期' },
      images: [{ url: 'wxfile://jev.jpg', objectKey: 'diagnoses/jev.jpg', width: 1280, height: 960, quality: { status: 'PASS' as const, issues: [] } }],
      clientRequestId: 'client_diag_jev_001'
    })
    const task = await client.createTask({ title: '复查异常植株', diagnosisId: diagnosis.data.id, priority: 'MEDIUM' })
    const executing = await client.getDiagnosis(diagnosis.data.id)
    expect(executing.data.loop?.stage).toBe('EXECUTION')
    expect(executing.data.model.configVersion).toBe('ops-1.0.0')
    expect(executing.data.model.configSnapshot?.['action.observe']).toBeTruthy()
    await client.completeTask(task.data.id, '叶片已恢复，继续观察三天')
    const completedDatabase = storage.get('nongjianzhen_mock_db_v1') as { tasks: Array<{ id: string; completedNote?: string }> }
    expect(completedDatabase.tasks.find((item) => item.id === task.data.id)?.completedNote).toBe('叶片已恢复，继续观察三天')
    expect((await client.getDiagnosis(diagnosis.data.id)).data.loop?.stage).toBe('VERIFICATION')
    const verified = await client.verifyDiagnosis(diagnosis.data.id, 'IMPROVED')
    expect(verified.data.loop).toMatchObject({ stage: 'CLOSED', outcome: 'IMPROVED' })
  })

  it('切换模拟账号时保持数据分区隔离', async () => {
    const client = new ApiClient(mockTransport)
    const accountA = await client.mockLogin('user_p0_farmer_a')
    storage.set('nongjianzhen_access_token', accountA.data.accessToken)
    await client.createFarm({ name: 'A 账号农场', location: 'A' })

    const accountB = await client.mockLogin('user_p0_farmer_b')
    storage.set('nongjianzhen_access_token', accountB.data.accessToken)
    const farmsB = await client.listFarms()

    expect(farmsB.data.items.some((farm) => farm.name === 'A 账号农场')).toBe(false)
    expect(farmsB.data.items[0]?.id).toBe('farm_demo_001')
  })

  it('运营配置 Transport 与真实契约一致，且普通用户不能访问', async () => {
    const client = new ApiClient(mockTransport)
    await expect(client.listOpsConfigs()).rejects.toBeInstanceOf(ApiRequestError)

    const login = await client.mockLogin('ops_p0_001')
    storage.set('nongjianzhen_access_token', login.data.accessToken)
    const listed = await client.listOpsConfigs()
    const config = listed.data.items.find((item) => item.key === 'home.quick-start')!
    const originalVersion = config.version
    const originalContent = config.content
    const preview = await client.previewOpsConfig({ key: config.key, category: config.category, content: '请拍清叶片正面和背面' })
    expect(preview.data).toMatchObject({ valid: true, key: config.key })

    const updated = await client.updateOpsConfig(config.key, '请拍清叶片正面和背面后再提交', originalVersion)
    expect(updated.data.version).not.toBe(originalVersion)
    const updatedVersion = updated.data.version
    const versions = await client.listOpsConfigVersions(config.key)
    expect(versions.data.items.map((item) => item.version)).toContain(originalVersion)
    const rolledBack = await client.rollbackOpsConfig(config.key, originalVersion)
    expect(rolledBack.data.content).toBe(originalContent)
    expect(rolledBack.data.previousVersions.some((item) => item.version === updatedVersion)).toBe(true)
    expect(rolledBack.requestId).toMatch(/^mock_req_/)
    expect(rolledBack.traceId).toMatch(/^mock_trace_/)
  })

  it('旧 Mock 数据会补齐新增运营配置，且安全配置版本号连续', async () => {
    storage.set('nongjianzhen_access_token', 'mock_token_ops_p0_001')
    storage.set('nongjianzhen_mock_db_v1:ops_p0_001', { farms: [], diagnoses: [], tasks: [], messages: [], opsConfigs: [{ key: 'risk.medium', name: '旧配置', description: '旧配置', category: 'RISK', status: 'PUBLISHED', content: '{}', version: 'v1.0', updatedAt: '2026-01-01T00:00:00.000Z', updatedBy: '旧版本', previousVersions: [] }], sequence: 1 })
    const client = new ApiClient(mockTransport)
    const list = await client.listOpsConfigs()
    expect(list.data.items.some((item) => item.key === 'safety.uncertain-pesticide')).toBe(true)
    const safety = list.data.items.find((item) => item.key === 'safety.uncertain-pesticide')!
    storage.set('nongjianzhen_access_token', 'mock_token_ops_admin_p0_001')
    const updated = await client.updateOpsConfig(safety.key, safety.content, safety.version)
    expect(updated.data.version).toBe('v1.1')
  })

  it('未知 ops 账号不能绕过运营配置权限', async () => {
    storage.set('nongjianzhen_access_token', 'mock_token_ops_unknown')
    const client = new ApiClient(mockTransport)
    await expect(client.listOpsConfigs()).rejects.toMatchObject({ code: 'FORBIDDEN' })
  })

  it('消息支持全部已读和通知偏好持久化', async () => {
    const client = new ApiClient(mockTransport)
    const before = await client.unreadMessageCount()
    expect(before.data.count).toBeGreaterThan(0)
    await expect(client.markAllMessagesRead()).resolves.toMatchObject({ data: { updated: before.data.count } })
    await expect(client.unreadMessageCount()).resolves.toMatchObject({ data: { count: 0 } })

    await expect(client.getMessagePreferences()).resolves.toMatchObject({ data: { system: true } })
    await client.updateMessagePreferences({ taskDue: false })
    await expect(client.getMessagePreferences()).resolves.toMatchObject({ data: { taskDue: false } })
  })

  it('安全配置允许专家和管理员，普通运营账号被拒绝', async () => {
    const client = new ApiClient(mockTransport)
    storage.set('nongjianzhen_access_token', 'mock_token_ops_expert_p0_001')
    const listed = await client.listOpsConfigs()
    const safety = listed.data.items.find((item) => item.category === 'SAFETY')!
    const updated = await client.updateOpsConfig(safety.key, safety.content, safety.version)
    expect(updated.data.version).toBe('v1.1')

    storage.set('nongjianzhen_access_token', 'mock_token_ops_p0_001')
    await expect(client.updateOpsConfig(safety.key, safety.content, updated.data.version)).rejects.toMatchObject({ code: 'FORBIDDEN' })

    storage.set('nongjianzhen_access_token', 'mock_token_ops_admin_p0_001')
    const adminSafety = (await client.listOpsConfigs()).data.items.find((item) => item.category === 'SAFETY')!
    await expect(client.updateOpsConfig(adminSafety.key, adminSafety.content, adminSafety.version)).resolves.toMatchObject({ data: { version: 'v1.2' } })
  })
})
