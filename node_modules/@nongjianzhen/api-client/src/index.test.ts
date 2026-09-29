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
    await new ApiClient(transport).createTask({ title: '复查叶片', clientRequestId: 'client_task_001', priority: 'MEDIUM', assignee: '张农技' })

    expect(captured).toMatchObject({
      method: 'POST',
      path: '/api/v1/tasks',
      idempotencyKey: 'client_task_001',
      body: { clientRequestId: 'client_task_001', title: '复查叶片', priority: 'medium', assignee: '张农技' }
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

  it('保留服务端已取消任务状态，避免被误归类为待处理', async () => {
    const transport: ApiTransport = {
      async request() {
        return { code: 'OK', message: 'success', requestId: 'req_cancelled', data: { items: [{ id: 'task_cancelled', title: '已取消任务', status: 'cancelled', priority: 'low', createdAt: '2026-01-01', updatedAt: '2026-01-01' }], total: 1 } } as never
      }
    }
    await expect(new ApiClient(transport).listTasks()).resolves.toMatchObject({ data: { items: [{ status: 'CANCELLED' }] } })
  })

  it('运营配置使用独立契约路径并编码配置 key', async () => {
    const requests: unknown[] = []
    const transport: ApiTransport = {
      async request(request) {
        requests.push(request)
        return { code: 'OK', message: 'success', requestId: 'req_ops', data: { key: 'risk.medium.label', content: '中风险' } as never }
      }
    }
    const client = new ApiClient(transport)
    await client.getOpsConfig('risk.medium/label')
    await client.updateOpsConfig('risk.medium/label', '新的风险文案')
    expect(requests).toEqual([
      expect.objectContaining({ method: 'GET', path: '/api/v1/ops/configs/risk.medium%2Flabel' }),
      expect.objectContaining({ method: 'PUT', path: '/api/v1/ops/configs/risk.medium%2Flabel', body: { content: '新的风险文案', expectedVersion: undefined } })
    ])
  })

  it('保留服务端动作的安全等级、类型、截止时间和配置版本', async () => {
    const transport: ApiTransport = {
      async request() {
        return {
          code: 'OK', message: 'success', requestId: 'req_action',
          data: {
            id: 'diag_action', status: 'completed', cropName: '番茄', requestId: 'req_action', createdAt: '2026-01-01', updatedAt: '2026-01-01',
            result: {
              decision: 'expert_review', model: { name: 'mock', version: '1', traceId: 'trace', knowledgeVersion: 'k1', configVersion: 'ops-1.0.0' },
              possibleProblems: [{ name: '疑似问题', confidence: 0.8, riskLevel: 'high', evidence: [] }],
              actions: [{ type: 'EXPERT_REVIEW', title: '请复核', description: '先隔离观察', priority: 'now', dueAt: '2026-01-02T00:00:00.000Z', safetyLevel: 'BIOSECURITY' }],
              needExpertReview: true, expertReviewReasons: ['HIGH_RISK'], needMoreImages: false, avoidActions: [], followUpQuestions: [], safety: { passed: true, violationCodes: [] }, disclaimer: '辅助判断'
            }
          }
        } as never
      }
    }
    const result = await new ApiClient(transport).listDiagnoses()
    expect(result.data.items[0]).toMatchObject({
      model: { configVersion: 'ops-1.0.0' },
      actions: [{ type: 'EXPERT_REVIEW', dueAt: '2026-01-02T00:00:00.000Z', safetyLevel: 'BIOSECURITY' }]
    })
  })

  it('消息支持全部已读和通知偏好接口', async () => {
    const requests: unknown[] = []
    const transport: ApiTransport = {
      async request(request) {
        requests.push(request)
        if (request.path === '/api/v1/messages/read-all') return { code: 'OK', message: 'success', requestId: 'req_read_all', data: { updated: 2 } } as never
        return { code: 'OK', message: 'success', requestId: 'req_preferences', data: { diagnosisCompleted: true, diagnosisFailed: true, taskDue: false, taskOverdue: true, system: true } } as never
      }
    }
    const client = new ApiClient(transport)
    await expect(client.markAllMessagesRead()).resolves.toMatchObject({ data: { updated: 2 } })
    await client.getMessagePreferences()
    await client.updateMessagePreferences({ taskDue: false })
    expect(requests).toEqual([
      expect.objectContaining({ method: 'POST', path: '/api/v1/messages/read-all' }),
      expect.objectContaining({ method: 'GET', path: '/api/v1/message-preferences' }),
      expect.objectContaining({ method: 'PATCH', path: '/api/v1/message-preferences', body: { taskDue: false } })
    ])
  })
  it('田间服务使用稳定的天气、商城、社区和专家复核路径', async () => {
    const requests: unknown[] = []
    const transport: ApiTransport = {
      async request(request) {
        requests.push(request)
        return { code: 'OK', message: 'success', requestId: 'req_field', data: {} as never }
      }
    }
    const client = new ApiClient(transport)
    await client.getWeather('临安')
    await client.getWeatherForecast({ location: '临安', days: 5, granularity: 'daily' })
    await client.getWeatherHistory({ location: '临安', startDate: '2026-09-22', endDate: '2026-09-29' })
    await client.listShopProducts('TOOLS')
    await client.createShopOrder({ items: [{ productId: 'product-tool-001', quantity: 1 }], address: '向阳农场' })
    await client.listCommunityPosts('番茄')
    await client.createCommunityPost({ title: '叶片变化', content: '记录今天的观察' })
    await client.likeCommunityPost('post_1')
    await client.listExperts()
    await client.getExpertChat('expert-001')
    await client.sendExpertMessage('expert-001', '请帮我复核')

    expect(requests).toEqual([
      expect.objectContaining({ method: 'GET', path: '/api/v1/weather/overview', query: { location: '临安' } }),
      expect.objectContaining({ method: 'GET', path: '/api/v1/weather/forecast', query: { location: '临安', days: 5, granularity: 'daily' } }),
      expect.objectContaining({ method: 'GET', path: '/api/v1/weather/history', query: { location: '临安', startDate: '2026-09-22', endDate: '2026-09-29' } }),
      expect.objectContaining({ method: 'GET', path: '/api/v1/shop/products', query: { category: 'TOOLS' } }),
      expect.objectContaining({ method: 'POST', path: '/api/v1/shop/orders', body: { items: [{ productId: 'product-tool-001', quantity: 1 }], address: '向阳农场' } }),
      expect.objectContaining({ method: 'GET', path: '/api/v1/community/posts', query: { topic: '番茄' } }),
      expect.objectContaining({ method: 'POST', path: '/api/v1/community/posts' }),
      expect.objectContaining({ method: 'POST', path: '/api/v1/community/posts/post_1/like' }),
      expect.objectContaining({ method: 'GET', path: '/api/v1/experts' }),
      expect.objectContaining({ method: 'GET', path: '/api/v1/expert-chats/expert-001' }),
      expect.objectContaining({ method: 'POST', path: '/api/v1/expert-chats/expert-001/messages', body: { text: '请帮我复核' } })
    ])
  })
})
