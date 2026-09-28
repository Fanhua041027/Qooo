import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClient } from '@nongjianzhen/api-client'

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
    expect((await client.getDiagnosis(diagnosis.data.id)).data.loop?.stage).toBe('EXECUTION')
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
})
