import Taro from '@tarojs/taro'
import type { ApiEnvelope, CreateFarmInput, CreatePlotInput, CreateTaskInput, DiagnosisRecord, DiagnosisLoopState, DiagnosisVerificationOutcome, Farm, FarmTask, LoginResult, Notification, PageResult, Plot, ServerCreateDiagnosisInput, ServerDiagnosisRecord, ServerDiagnosisResult, UpdateTaskInput } from '@nongjianzhen/types'
import type { ApiTransport, TransportRequest } from '@nongjianzhen/api-client'
import { ApiRequestError } from '@/services/http'
import { buildMockKnowledgeResult } from './agriculture-knowledge'
import { seedDiagnoses, seedFarms, seedTasks } from './seed'

const STORAGE_KEY = 'nongjianzhen_mock_db_v1'
const ACCESS_TOKEN_STORAGE_KEY = 'nongjianzhen_access_token'
const DEFAULT_ACCOUNT_ID = 'user_p0_farmer_001'

interface MockDiagnosis extends DiagnosisRecord {
  clientRequestId?: string
  availableAt?: number
  growthStage?: string
  description?: string
}

interface MockTask extends FarmTask {
  clientRequestId?: string
  completedNote?: string
}

function defaultLoop(now = new Date().toISOString()): DiagnosisLoopState {
  return { stage: 'JUDGMENT', updatedAt: now }
}

interface MockDatabase {
  farms: Farm[]
  diagnoses: MockDiagnosis[]
  tasks: MockTask[]
  messages: Notification[]
  sequence: number
}

function toServerDiagnosisRecord(record: MockDiagnosis): ServerDiagnosisRecord {
  const result: ServerDiagnosisResult | null = record.possibleIssues.length > 0 || record.actions.length > 0 || record.decision || record.loop
    ? {
        decision: record.decision === 'ASK_MORE' ? 'ask_more' : record.decision === 'EXPERT_REVIEW' ? 'expert_review' : record.decision === 'REJECTED' ? 'rejected' : 'result',
        model: {
          name: record.model.name,
          version: record.model.version,
          traceId: record.model.traceId || `mock_trace_${record.id}`,
          knowledgeVersion: record.model.knowledgeVersion || 'mock-knowledge'
        },
        crop: record.crop,
        stage: record.growthStage || '',
        possibleProblems: record.possibleIssues.map((issue) => ({
          name: issue.name,
          confidence: issue.confidence,
          riskLevel: (issue.riskLevel || record.risk?.level || 'medium').toLowerCase() as 'low' | 'medium' | 'high' | 'critical',
          evidence: issue.evidence,
          lookalikes: issue.lookalikes
        })),
        actions: record.actions.map((action) => ({
          title: action.title,
          description: action.description || '',
          priority: action.type === 'DO_NOW' ? 'now' : action.type === 'OBSERVE' ? 'follow_up' : 'today'
        })),
        avoidActions: record.actions.filter((action) => action.type === 'AVOID').map((action) => action.title),
        followUpQuestions: record.followUpQuestions || [],
        needExpertReview: record.expertReview?.required || record.status === 'NEED_EXPERT_REVIEW',
        expertReviewReasons: record.expertReview?.reasonCodes || [],
        needMoreImages: record.status === 'NEED_MORE_IMAGES' || record.decision === 'ASK_MORE',
        safety: record.safety || { passed: true, violationCodes: [] },
        disclaimer: record.disclaimer,
        loop: record.loop || defaultLoop(record.updatedAt)
      }
    : null

  return {
    id: record.id,
    status: record.status === 'PENDING' ? 'created' : record.status === 'PROCESSING' ? 'analyzing' : record.status === 'COMPLETED' ? 'completed' : record.status === 'NEED_MORE_IMAGES' ? 'need_more_images' : record.status === 'NEED_EXPERT_REVIEW' ? 'need_expert_review' : 'failed',
    plotId: record.plotId,
    cropName: record.crop,
    requestId: record.requestId,
    traceId: record.model.traceId || `mock_trace_${record.id}`,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    result,
    failureCode: record.error?.code,
    failureMessage: record.error?.message
  }
}

function getAccountId() {
  const token = Taro.getStorageSync<string>(ACCESS_TOKEN_STORAGE_KEY)
  if (typeof token === 'string' && token.startsWith('mock_token_')) return token.slice('mock_token_'.length) || DEFAULT_ACCOUNT_ID
  return DEFAULT_ACCOUNT_ID
}

function getStorageKey(accountId = getAccountId()) {
  // 保留默认账号的旧键，兼容已有本地演示数据和测试夹具。
  return accountId === DEFAULT_ACCOUNT_ID ? STORAGE_KEY : `${STORAGE_KEY}:${accountId}`
}

function getDatabase(): MockDatabase {
  const storageKey = getStorageKey()
  const stored = Taro.getStorageSync<MockDatabase>(storageKey)
  if (stored?.farms && stored?.diagnoses && stored?.tasks) {
    if (!stored.messages) {
      stored.messages = []
      saveDatabase(stored)
    }
    return stored
  }
  const initial: MockDatabase = {
    farms: seedFarms.map((farm) => ({ ...farm, plots: farm.plots?.map((plot) => ({ ...plot })) })),
    diagnoses: seedDiagnoses.map((diagnosis) => ({
      ...diagnosis,
      possibleIssues: diagnosis.possibleIssues.map((issue) => ({ ...issue, evidence: [...issue.evidence], lookalikes: issue.lookalikes ? [...issue.lookalikes] : undefined })),
      risk: diagnosis.risk ? { ...diagnosis.risk } : undefined,
      actions: diagnosis.actions.map((action) => ({ ...action })),
      model: { ...diagnosis.model },
      expertReview: diagnosis.expertReview ? { ...diagnosis.expertReview, reasonCodes: [...diagnosis.expertReview.reasonCodes] } : undefined,
      followUpQuestions: diagnosis.followUpQuestions?.map((question) => ({ ...question })),
      safety: diagnosis.safety ? { ...diagnosis.safety, violationCodes: [...diagnosis.safety.violationCodes] } : undefined,
      loop: diagnosis.loop ? { ...diagnosis.loop } : defaultLoop(diagnosis.updatedAt)
    })),
    tasks: seedTasks.map((task) => ({ ...task })),
    messages: [{ id: 'message_demo_001', type: 'SYSTEM', title: '欢迎使用农间诊', content: '拍下作物异常部位，先获得一个可执行的初步判断。', targetType: 'diagnosis', createdAt: new Date().toISOString(), readAt: null }],
    sequence: 10
  }
  Taro.setStorageSync(storageKey, initial)
  return initial
}

function saveDatabase(database: MockDatabase) {
  Taro.setStorageSync(getStorageKey(), database)
}

function nextId(database: MockDatabase, prefix: string) {
  database.sequence += 1
  return `${prefix}_mock_${String(database.sequence).padStart(4, '0')}`
}

function response<T>(database: MockDatabase, data: T): ApiEnvelope<T> {
  return { code: 'OK', message: 'success', data, requestId: `mock_req_${String(database.sequence).padStart(4, '0')}` }
}

function completeDiagnosis(record: MockDiagnosis): MockDiagnosis {
  if (record.status !== 'PROCESSING' || Date.now() < (record.availableAt || 0)) return record
  const result = buildMockKnowledgeResult(record.crop)
  return {
    ...record,
    status: 'COMPLETED',
    updatedAt: new Date().toISOString(),
    progress: undefined,
    ...result
  }
}

function syncDiagnosisMessage(database: MockDatabase, record: MockDiagnosis) {
  if (record.status !== 'COMPLETED') return
  const dedupeKey = `diagnosis-completed:${record.id}`
  if (database.messages.some((message) => message.id === dedupeKey)) return
  database.messages.unshift({
    id: dedupeKey,
    type: 'DIAGNOSIS_COMPLETED',
    title: '诊断结果已生成',
    content: `${record.crop} 的初步判断已经完成，点击查看下一步行动。`,
    targetType: 'diagnosis',
    targetId: record.id,
    readAt: null,
    createdAt: record.updatedAt
  })
}

async function delay() {
  await new Promise((resolve) => setTimeout(resolve, 520))
}

export const mockTransport: ApiTransport = {
  async request<TResponse, TBody>(request: TransportRequest<TBody>) {
    await delay()
    const database = getDatabase()
    const { method, path } = request

    if (method === 'POST' && path === '/api/v1/auth/mock-login') {
      const accountId = (request.body as { accountId?: string } | undefined)?.accountId || 'user_p0_farmer_001'
      return response(database, {
        accessToken: `mock_token_${accountId}`,
        tokenType: 'Bearer',
        expiresIn: '7d',
        user: { id: accountId, nickname: '向阳农场主', role: 'farmer' }
      } satisfies LoginResult) as ApiEnvelope<TResponse>
    }

    if (method === 'POST' && path === '/api/v1/auth/logout') {
      return response(database, undefined) as ApiEnvelope<TResponse>
    }

    if (method === 'GET' && path === '/api/v1/farms') {
      return response(database, { items: database.farms, total: database.farms.length }) as ApiEnvelope<TResponse>
    }

    if (method === 'POST' && path === '/api/v1/farms') {
      const input = request.body as CreateFarmInput & { region?: string }
      const farm: Farm = { id: nextId(database, 'farm'), name: input.name, location: input.location || input.region || '', plots: [] }
      database.farms.unshift(farm)
      saveDatabase(database)
      return response(database, farm) as ApiEnvelope<TResponse>
    }

    const farmMatch = path.match(/^\/api\/v1\/farms\/([^/]+)$/)
    if (farmMatch && method === 'PATCH') {
      const farm = database.farms.find((item) => item.id === decodeURIComponent(farmMatch[1]))
      if (!farm) throw new ApiRequestError('FARM_NOT_FOUND', '未找到该农场')
      const input = request.body as { name?: string; region?: string }
      if (input.name !== undefined) farm.name = input.name
      if (input.region !== undefined) farm.location = input.region
      saveDatabase(database)
      return response(database, farm) as ApiEnvelope<TResponse>
    }

    const plotsMatch = path.match(/^\/api\/v1\/farms\/([^/]+)\/plots$/)
    if (plotsMatch) {
      const farm = database.farms.find((item) => item.id === decodeURIComponent(plotsMatch[1]))
      if (!farm) throw new ApiRequestError('FARM_NOT_FOUND', '未找到该农场')
      if (method === 'GET') {
        const plots = farm.plots || []
        return response(database, { items: plots, total: plots.length } as PageResult<Plot>) as ApiEnvelope<TResponse>
      }
      if (method === 'POST') {
        const input = request.body as CreatePlotInput
        const plot: Plot = { id: nextId(database, 'plot'), farmId: farm.id, ...input }
        farm.plots = [plot, ...(farm.plots || [])]
        saveDatabase(database)
        return response(database, plot) as ApiEnvelope<TResponse>
      }
    }

    const plotMatch = path.match(/^\/api\/v1\/plots\/([^/]+)$/)
    if (plotMatch) {
      const plotIndex = database.farms.findIndex((farm) => (farm.plots || []).some((plot) => plot.id === decodeURIComponent(plotMatch[1])))
      const farm = database.farms[plotIndex]
      const plot = farm?.plots?.find((item) => item.id === decodeURIComponent(plotMatch[1]))
      if (!farm || !plot) throw new ApiRequestError('PLOT_NOT_FOUND', '未找到该地块')
      if (method === 'PATCH') {
        const input = request.body as Partial<Plot>
        Object.assign(plot, input)
        saveDatabase(database)
        return response(database, plot) as ApiEnvelope<TResponse>
      }
      if (method === 'DELETE') {
        farm.plots = (farm.plots || []).filter((item) => item.id !== plot.id)
        saveDatabase(database)
        return response(database, { id: plot.id, deleted: true }) as ApiEnvelope<TResponse>
      }
    }

    if (method === 'POST' && path === '/api/v1/diagnoses') {
      const input = request.body as ServerCreateDiagnosisInput
      const existing = database.diagnoses.find((item) => item.clientRequestId === input.clientRequestId)
      if (existing) return response(database, toServerDiagnosisRecord(existing)) as ApiEnvelope<TResponse>
      const now = new Date().toISOString()
      const id = nextId(database, 'diag')
      const record: MockDiagnosis = {
        id,
        status: 'PROCESSING',
        crop: input.cropName || '待确认作物',
        growthStage: input.growthStage,
        description: input.description,
        plotId: input.plotId,
        imageUrl: input.images[0]?.objectKey,
        createdAt: now,
        updatedAt: now,
        possibleIssues: [],
        actions: [],
        disclaimer: '以上为辅助判断，请结合当地农技员意见确认。',
        model: { name: 'demo-diagnosis-model', version: 'mock-1.0.0' },
        requestId: `mock_req_${id}`,
        loop: defaultLoop(now),
        progress: { stage: 'ANALYZING', label: '正在比对症状特征', percent: 62 },
        clientRequestId: input.clientRequestId,
        availableAt: Date.now() + 1600
      }
      database.diagnoses.unshift(record)
      saveDatabase(database)
      return response(database, toServerDiagnosisRecord(record)) as ApiEnvelope<TResponse>
    }

    if (method === 'GET' && path === '/api/v1/diagnoses') {
      database.diagnoses = database.diagnoses.map(completeDiagnosis)
      database.diagnoses.forEach((record) => syncDiagnosisMessage(database, record))
      saveDatabase(database)
      return response(database, { items: database.diagnoses.map(toServerDiagnosisRecord), total: database.diagnoses.length }) as ApiEnvelope<TResponse>
    }

    const resultMatch = path.match(/^\/api\/v1\/diagnoses\/([^/]+)\/result$/)
    const retryMatch = path.match(/^\/api\/v1\/diagnoses\/([^/]+)\/retry$/)
    const detailMatch = path.match(/^\/api\/v1\/diagnoses\/([^/]+)$/)
    if (method === 'POST' && retryMatch) {
      const index = database.diagnoses.findIndex((item) => item.id === decodeURIComponent(retryMatch[1]))
      if (index < 0) throw new ApiRequestError('DIAGNOSIS_NOT_FOUND', '未找到该诊断记录')
      const current = database.diagnoses[index]
      if (current.status !== 'FAILED' && current.status !== 'NEED_MORE_IMAGES') {
        throw new ApiRequestError('DIAGNOSIS_INVALID_STATE', '当前诊断状态不能重试')
      }
      const now = new Date().toISOString()
      database.diagnoses[index] = {
        ...current,
        status: 'PROCESSING',
        updatedAt: now,
        possibleIssues: [],
        risk: undefined,
        actions: [],
        decision: undefined,
        followUpQuestions: undefined,
        expertReview: undefined,
        safety: undefined,
        error: undefined,
        progress: { stage: 'ANALYZING', label: '正在重新分析图片', percent: 62 },
        availableAt: Date.now() + 1600
      }
      saveDatabase(database)
      return response(database, toServerDiagnosisRecord(database.diagnoses[index])) as ApiEnvelope<TResponse>
    }
    const verifyMatch = path.match(/^\/api\/v1\/diagnoses\/([^/]+)\/verify$/)
    if (method === 'POST' && verifyMatch) {
      const index = database.diagnoses.findIndex((item) => item.id === decodeURIComponent(verifyMatch[1]))
      if (index < 0) throw new ApiRequestError('DIAGNOSIS_NOT_FOUND', '未找到该诊断记录')
      const input = request.body as { outcome?: DiagnosisVerificationOutcome; note?: string }
      const outcome = input.outcome
      if (!outcome || !['IMPROVED', 'UNCHANGED', 'WORSE', 'UNKNOWN'].includes(outcome)) throw new ApiRequestError('DIAGNOSIS_INVALID_VERIFICATION', '复查结果不完整')
      const now = new Date().toISOString()
      const current = database.diagnoses[index]
      current.loop = { ...(current.loop || defaultLoop(current.updatedAt)), stage: outcome === 'IMPROVED' ? 'CLOSED' : outcome === 'UNKNOWN' ? 'VERIFICATION' : 'REASSESSMENT', outcome, note: input.note, verifiedAt: now, updatedAt: now }
      current.updatedAt = now
      saveDatabase(database)
      return response(database, toServerDiagnosisRecord(current)) as ApiEnvelope<TResponse>
    }
    const diagnosisId = resultMatch?.[1] || detailMatch?.[1]
    if (method === 'GET' && diagnosisId) {
      const index = database.diagnoses.findIndex((item) => item.id === decodeURIComponent(diagnosisId))
      if (index < 0) throw new ApiRequestError('DIAGNOSIS_NOT_FOUND', '未找到该诊断记录')
      database.diagnoses[index] = completeDiagnosis(database.diagnoses[index])
      syncDiagnosisMessage(database, database.diagnoses[index])
      saveDatabase(database)
      return response(database, toServerDiagnosisRecord(database.diagnoses[index])) as ApiEnvelope<TResponse>
    }

    if (method === 'GET' && path === '/api/v1/tasks') {
      return response(database, { items: database.tasks, total: database.tasks.length }) as ApiEnvelope<TResponse>
    }

    if (method === 'GET' && path === '/api/v1/messages') {
      return response(database, { items: database.messages, total: database.messages.length }) as ApiEnvelope<TResponse>
    }

    if (method === 'GET' && path === '/api/v1/messages/unread-count') {
      return response(database, { count: database.messages.filter((message) => !message.readAt).length }) as ApiEnvelope<TResponse>
    }

    const messageReadMatch = path.match(/^\/api\/v1\/messages\/([^/]+)\/read$/)
    if (method === 'POST' && messageReadMatch) {
      const message = database.messages.find((item) => item.id === decodeURIComponent(messageReadMatch[1]))
      if (!message) throw new ApiRequestError('MESSAGE_NOT_FOUND', '未找到该消息')
      message.readAt ||= new Date().toISOString()
      saveDatabase(database)
      return response(database, message) as ApiEnvelope<TResponse>
    }

    if (method === 'POST' && path === '/api/v1/tasks') {
      const input = request.body as CreateTaskInput
      const existing = input.clientRequestId
        ? database.tasks.find((item) => item.clientRequestId === input.clientRequestId)
        : undefined
      if (existing) return response(database, existing) as ApiEnvelope<TResponse>
      const now = new Date().toISOString()
      const task: MockTask = {
        id: nextId(database, 'task'),
        clientRequestId: input.clientRequestId,
        title: input.title,
        description: input.description,
        farmId: input.farmId,
        plotId: input.plotId,
        diagnosisId: input.diagnosisId,
        priority: input.priority || 'MEDIUM',
        status: 'PENDING',
        dueAt: input.dueAt,
        createdAt: now,
        updatedAt: now
      }
      database.tasks.unshift(task)
      if (task.diagnosisId) {
        const diagnosis = database.diagnoses.find((item) => item.id === task.diagnosisId)
        if (diagnosis) diagnosis.loop = { ...(diagnosis.loop || defaultLoop(diagnosis.updatedAt)), stage: 'EXECUTION', taskId: task.id, nextReviewAt: task.dueAt, updatedAt: now }
      }
      saveDatabase(database)
      return response(database, task) as ApiEnvelope<TResponse>
    }

    const completeTaskMatch = path.match(/^\/api\/v1\/tasks\/([^/]+)\/complete$/)
    if (method === 'POST' && completeTaskMatch) {
      const task = database.tasks.find((item) => item.id === completeTaskMatch[1])
      if (!task) throw new ApiRequestError('TASK_NOT_FOUND', '未找到该任务')
      const input = request.body as { note?: string } | undefined
      task.status = 'COMPLETED'
      task.completedNote = input?.note?.trim() || undefined
      task.updatedAt = new Date().toISOString()
      if (task.diagnosisId) {
        const diagnosis = database.diagnoses.find((item) => item.id === task.diagnosisId)
        if (diagnosis) diagnosis.loop = { ...(diagnosis.loop || defaultLoop(diagnosis.updatedAt)), stage: 'VERIFICATION', taskId: task.id, updatedAt: task.updatedAt }
      }
      saveDatabase(database)
      return response(database, task) as ApiEnvelope<TResponse>
    }

    const updateTaskMatch = path.match(/^\/api\/v1\/tasks\/([^/]+)$/)
    if (method === 'PATCH' && updateTaskMatch) {
      const task = database.tasks.find((item) => item.id === updateTaskMatch[1])
      if (!task) throw new ApiRequestError('TASK_NOT_FOUND', '未找到该任务')
      Object.assign(task, request.body as UpdateTaskInput, { updatedAt: new Date().toISOString() })
      saveDatabase(database)
      return response(database, task) as ApiEnvelope<TResponse>
    }

    throw new ApiRequestError('MOCK_ROUTE_NOT_FOUND', `Mock 未实现接口：${method} ${path}`)
  }
}
