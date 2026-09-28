import { describe, expect, it } from 'vitest'
import { ApiClient, type ApiTransport } from './index'

describe('ApiClient', () => {
  it('创建诊断时透传契约路径和幂等键', async () => {
    let captured: unknown
    const transport: ApiTransport = {
      async request(request) {
        captured = request
        return { code: 'OK', message: 'success', data: {} as never, requestId: 'req_test' }
      }
    }
    const client = new ApiClient(transport)

    await client.createDiagnosis({
      crop: { name: '番茄', growthStage: '开花期' },
      description: '下部叶片三天前开始变黄',
      images: [],
      clientRequestId: 'client_req_001'
    })

    expect(captured).toMatchObject({
      method: 'POST',
      path: '/api/v1/diagnoses',
      idempotencyKey: 'client_req_001',
      body: { description: '下部叶片三天前开始变黄' }
    })
  })

  it('兼容 Mock transport 的稳定前端类型，保留农场位置和诊断状态', async () => {
    const transport: ApiTransport = {
      async request(request) {
        if (request.path === '/api/v1/farms') {
          return { code: 'OK', message: 'success', requestId: 'req_farm', data: { items: [{ id: 'farm_1', name: '向阳农场', location: '杭州', plots: [] }], total: 1 } } as never
        }
        return { code: 'OK', message: 'success', requestId: 'req_diag', data: { items: [{ id: 'diag_1', status: 'analyzing', cropName: '番茄', requestId: 'req_diag', createdAt: '2026-01-01', updatedAt: '2026-01-01', result: null }], total: 1 } } as never
      }
    }
    const client = new ApiClient(transport)

    await expect(client.listFarms()).resolves.toMatchObject({ data: { items: [{ location: '杭州' }] } })
    await expect(client.listDiagnoses()).resolves.toMatchObject({ data: { items: [{ status: 'PROCESSING', crop: '番茄' }] } })
  })

  it('服务端结果缺少模型元数据时仍能安全归一化', async () => {
    const transport: ApiTransport = {
      async request() {
        return {
          code: 'OK',
          message: 'success',
          requestId: 'req_partial',
          data: { items: [{
            id: 'diag_partial',
            status: 'completed',
            cropName: '番茄',
            requestId: 'req_partial',
            createdAt: '2026-01-01',
            updatedAt: '2026-01-01',
            result: {
              decision: 'result',
              possibleProblems: [{ name: '待复核问题', confidence: 0.4, riskLevel: 'unknown', evidence: [] }]
            }
          }], total: 1 }
        } as never
      }
    }

    await expect(new ApiClient(transport).listDiagnoses()).resolves.toMatchObject({
      data: { items: [{ model: { name: 'unknown' }, possibleIssues: [{ riskLevel: 'MEDIUM' }] }] }
    })
  })

  it('消息接口统一服务端类型大小写并保留已读状态', async () => {
    const transport: ApiTransport = {
      async request() {
        return { code: 'OK', message: 'success', requestId: 'req_message', data: { items: [{ id: 'm1', type: 'diagnosis_completed', title: '完成', content: '查看结果', readAt: null, createdAt: '2026-01-01' }], total: 1 } } as never
      }
    }
    await expect(new ApiClient(transport).listMessages()).resolves.toMatchObject({
      data: { items: [{ type: 'DIAGNOSIS_COMPLETED', readAt: null }] }
    })
  })

  it('创建任务透传客户端幂等键并保留请求体契约字段', async () => {
    let captured: unknown
    const transport: ApiTransport = {
      async request(request) {
        captured = request
        return { code: 'OK', message: 'success', data: { status: 'pending', priority: 'medium' } as never, requestId: 'req_task' }
      }
    }
    await new ApiClient(transport).createTask({ title: '复查叶片', clientRequestId: 'client_task_001', priority: 'MEDIUM' })

    expect(captured).toMatchObject({
      method: 'POST',
      path: '/api/v1/tasks',
      idempotencyKey: 'client_task_001',
      body: { clientRequestId: 'client_task_001', title: '复查叶片', priority: 'medium' }
    })
  })

  it('农场和地块编辑删除使用稳定的 REST 契约', async () => {
    const requests: unknown[] = []
    const transport: ApiTransport = {
      async request(request) {
        requests.push(request)
        if (request.method === 'DELETE') return { code: 'OK', message: 'success', requestId: 'req_delete', data: { id: 'plot_1', deleted: true } } as never
        return { code: 'OK', message: 'success', requestId: 'req_update', data: { id: 'farm_1', name: '新农场', region: '杭州', plots: [] } } as never
      }
    }
    const client = new ApiClient(transport)

    await client.updateFarm('farm_1', { name: '新农场', location: '杭州' })
    await client.updatePlot('plot_1', { cropName: '番茄', plantedAt: '2026-09-01' })
    await client.deletePlot('plot_1')

    expect(requests).toEqual([
      expect.objectContaining({ method: 'PATCH', path: '/api/v1/farms/farm_1', body: { name: '新农场', region: '杭州' } }),
      expect.objectContaining({ method: 'PATCH', path: '/api/v1/plots/plot_1', body: { cropName: '番茄', plantedAt: '2026-09-01' } }),
      expect.objectContaining({ method: 'DELETE', path: '/api/v1/plots/plot_1' })
    ])
  })

  it('更新任务时不发送 undefined 优先级覆盖已有值', async () => {
    let captured: unknown
    const transport: ApiTransport = {
      async request(request) {
        captured = request
        return { code: 'OK', message: 'success', requestId: 'req_task_update', data: { id: 'task_1', title: '复查', status: 'pending', priority: 'medium' } as never }
      }
    }
    await new ApiClient(transport).updateTask('task_1', { title: '调整后的复查' })
    expect(captured).toMatchObject({ method: 'PATCH', path: '/api/v1/tasks/task_1', body: { title: '调整后的复查' } })
    expect((captured as { body: Record<string, unknown> }).body).not.toHaveProperty('priority')
  })
})
