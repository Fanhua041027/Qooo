import type { ApiEnvelope, AuthIdentity, CreateDiagnosisInput, CreateFarmInput, CreatePlotInput, CreateTaskInput, CreateUploadInput, CreateOpsConfigInput, CreateCommunityPostInput, CreateShopOrderInput, DiagnosisAction, DiagnosisRecord, DiagnosisLoopState, DiagnosisVerificationOutcome, Farm, FarmTask, LoginResult, Notification, NotificationPreferences, OpsConfig, OpsConfigPreview, OpsConfigVersion, PageResult, Plot, ServerCreateDiagnosisInput, ServerDiagnosisRecord, ServerFarm, ServerFarmTask, ServerPlot, ServerRiskLevel, UpdateFarmInput, UpdatePlotInput, UpdateTaskInput, UploadTicket, WeatherOverview, WeatherForecastResult, WeatherHistoryResult, ShopProduct, ShopOrder, CommunityPost, ExpertProfile, ExpertChatSession, ChatMessage } from '@nongjianzhen/types'

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
export interface TransportRequest<TBody = unknown> { method: HttpMethod; path: string; body?: TBody; query?: Record<string, string | number | boolean | undefined>; idempotencyKey?: string }
export interface ApiTransport { request<TResponse, TBody = unknown>(request: TransportRequest<TBody>): Promise<ApiEnvelope<TResponse>> }

const riskMap: Record<ServerRiskLevel, NonNullable<DiagnosisRecord['risk']>['level']> = { low: 'LOW', medium: 'MEDIUM', high: 'HIGH', critical: 'CRITICAL' }

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : []
}

const actionTypes: DiagnosisAction['type'][] = ['DO_NOW', 'OBSERVE', 'AVOID', 'EXPERT_REVIEW']

function normalizeDiagnosis(raw: ServerDiagnosisRecord): DiagnosisRecord {
  const result = raw.result && typeof raw.result === 'object' ? raw.result : undefined
  const possibleProblems = Array.isArray(result?.possibleProblems)
    ? result.possibleProblems.filter((item) => item && typeof item.name === 'string')
    : []
  const top = possibleProblems[0]
  const topRiskLevel = top ? riskMap[top.riskLevel] || 'MEDIUM' : undefined
  const risk = top && topRiskLevel ? { level: topRiskLevel, label: { low: '低风险', medium: '中风险', high: '高风险', critical: '极高风险' }[top.riskLevel] || '中风险', reason: result?.needExpertReview ? '当前结果建议结合农技员意见复核。' : '建议按下一步行动完成观察和复查。' } : undefined
  const actions: DiagnosisAction[] = (Array.isArray(result?.actions) ? result.actions : [])
    .filter((item) => item && typeof item.title === 'string')
    .map((item) => ({ type: item.title.includes('不要') || item.title.includes('避免') || item.title.includes('暂不') ? 'AVOID' : item.priority === 'now' ? 'DO_NOW' : 'OBSERVE', title: item.title, description: item.description, dueAt: item.priority === 'now' ? new Date(Date.now() + 86400000).toISOString() : undefined }))
  const status = raw.status === 'created' || raw.status === 'uploading' ? 'PENDING' : raw.status === 'analyzing' ? 'PROCESSING' : raw.status === 'completed' ? 'COMPLETED' : raw.status === 'need_more_images' ? 'NEED_MORE_IMAGES' : raw.status === 'need_expert_review' ? 'NEED_EXPERT_REVIEW' : 'FAILED'
  const serverActions = (Array.isArray(result?.actions) ? result.actions : []).filter((item) => item && typeof item.title === 'string')
  serverActions.forEach((item, index) => {
    const action = actions[index]
    if (!action) return
    if (item.type && actionTypes.includes(item.type)) action.type = item.type
    if (item.dueAt) action.dueAt = item.dueAt
    if (item.safetyLevel) action.safetyLevel = item.safetyLevel
  })
  actions.forEach((action) => { action.safetyLevel = action.safetyLevel || (action.type === 'EXPERT_REVIEW' ? 'BIOSECURITY' : action.type === 'AVOID' ? 'BIOSECURITY' : 'OBSERVATION') })
  const followUpQuestions = Array.isArray(result?.followUpQuestions)
    ? result.followUpQuestions.filter((item) => item && typeof item.code === 'string' && typeof item.prompt === 'string')
    : undefined
  const needExpertReview = Boolean(result?.needExpertReview)
  const loop = result?.loop ? { ...result.loop } : undefined
  return { id: raw.id, status, crop: result?.crop || raw.cropName || '待确认作物', plotId: raw.plotId || undefined, createdAt: raw.createdAt, updatedAt: raw.updatedAt, possibleIssues: possibleProblems.map((item) => ({ name: item.name, confidence: typeof item.confidence === 'number' && Number.isFinite(item.confidence) ? Math.min(1, Math.max(0, item.confidence)) : 0, evidence: stringArray(item.evidence), riskLevel: riskMap[item.riskLevel] || 'MEDIUM', lookalikes: stringArray(item.lookalikes) })), risk, actions, disclaimer: result?.disclaimer || '以上为辅助判断，请结合当地农技员意见确认。', model: { name: result?.model?.name || 'unknown', version: result?.model?.version || 'unknown', traceId: result?.model?.traceId, knowledgeVersion: result?.model?.knowledgeVersion, configVersion: result?.model?.configVersion, configSnapshot: result?.model?.configSnapshot }, requestId: raw.requestId, decision: result?.decision?.toUpperCase() as DiagnosisRecord['decision'], loop, followUpQuestions, expertReview: result ? { required: needExpertReview, reasonCodes: stringArray(result.expertReviewReasons), message: needExpertReview ? '建议让农技人员结合田间情况复核。' : undefined } : undefined, safety: result?.safety, progress: status === 'PROCESSING' ? { stage: 'ANALYZING', label: '正在比对症状特征', percent: 62 } : undefined, error: status === 'FAILED' ? { code: raw.failureCode || 'DIAGNOSIS_FAILED', message: raw.failureMessage || '诊断服务暂时不可用' } : undefined }
}

function normalizeFarm(raw: ServerFarm | Farm): Farm {
  const location = 'region' in raw
    ? raw.region || raw.address || ''
    : raw.location || ''
  return {
    id: raw.id,
    name: raw.name,
    location,
    areaMu: raw.areaMu ?? undefined,
    healthScore: raw.healthScore,
    plots: raw.plots?.map((plot) => normalizePlot(plot as ServerPlot))
  }
}
function normalizePlot(raw: ServerPlot): Plot { return { id: raw.id, farmId: raw.farmId, name: raw.name, cropName: raw.cropName, growthStage: raw.growthStage || undefined, areaMu: raw.areaMu || undefined, plantedAt: raw.plantedAt, cropVariety: raw.cropVariety || undefined } }
function normalizeTask(raw: ServerFarmTask): FarmTask { return { ...raw, status: raw.status.toUpperCase() as FarmTask['status'], priority: raw.priority.toUpperCase() as FarmTask['priority'] } }
function normalizeMessage(raw: Notification): Notification {
  return { ...raw, type: raw.type.toUpperCase() as Notification['type'], readAt: raw.readAt || null }
}

export class ApiClient {
  constructor(private readonly transport: ApiTransport) {}
  mockLogin(accountId = 'user_p0_farmer_001') { return this.transport.request<LoginResult, { accountId: string }>({ method: 'POST', path: '/api/v1/auth/mock-login', body: { accountId } }) }
  wechatLogin(code: string) { return this.transport.request<LoginResult, { code: string }>({ method: 'POST', path: '/api/v1/auth/wechat-login', body: { code } }) }
  me() { return this.transport.request<{ id: string; nickname: string; avatarUrl?: string | null; role: string }>({ method: 'GET', path: '/api/v1/me' }) }
  logout() { return this.transport.request<undefined>({ method: 'POST', path: '/api/v1/auth/logout' }) }
  listFarms() { return this.transport.request<PageResult<ServerFarm>>({ method: 'GET', path: '/api/v1/farms' }).then((response) => ({ ...response, data: { ...response.data, items: response.data.items.map(normalizeFarm) } })) }
  createFarm(input: CreateFarmInput) { return this.transport.request<ServerFarm, { name: string; region: string }>({ method: 'POST', path: '/api/v1/farms', body: { name: input.name, region: input.location } }).then((response) => ({ ...response, data: normalizeFarm(response.data) })) }
  updateFarm(farmId: string, input: UpdateFarmInput) { const body = { ...input, ...(input.location !== undefined ? { region: input.location } : {}) }; delete (body as { location?: string }).location; return this.transport.request<ServerFarm, { name?: string; region?: string }>({ method: 'PATCH', path: `/api/v1/farms/${farmId}`, body }).then((response) => ({ ...response, data: normalizeFarm(response.data) })) }
  listPlots(farmId: string) { return this.transport.request<PageResult<ServerPlot>>({ method: 'GET', path: `/api/v1/farms/${farmId}/plots` }).then((response) => ({ ...response, data: { ...response.data, items: response.data.items.map(normalizePlot) } })) }
  createPlot(farmId: string, input: CreatePlotInput) { return this.transport.request<ServerPlot, CreatePlotInput>({ method: 'POST', path: `/api/v1/farms/${farmId}/plots`, body: input }).then((response) => ({ ...response, data: normalizePlot(response.data) })) }
  updatePlot(plotId: string, input: UpdatePlotInput) { return this.transport.request<ServerPlot, UpdatePlotInput>({ method: 'PATCH', path: `/api/v1/plots/${plotId}`, body: input }).then((response) => ({ ...response, data: normalizePlot(response.data) })) }
  deletePlot(plotId: string) { return this.transport.request<{ id: string; deleted: boolean }>({ method: 'DELETE', path: `/api/v1/plots/${plotId}` }) }
  createDiagnosis(input: CreateDiagnosisInput) { const body: ServerCreateDiagnosisInput = { clientRequestId: input.clientRequestId, plotId: input.plotId, cropName: input.crop.name, growthStage: input.crop.growthStage, description: input.description?.trim() || undefined, images: input.images.map((image) => ({ objectKey: image.objectKey || image.url, width: image.width, height: image.height, quality: image.quality as unknown as Record<string, unknown> })) }; return this.transport.request<ServerDiagnosisRecord, ServerCreateDiagnosisInput>({ method: 'POST', path: '/api/v1/diagnoses', body, idempotencyKey: input.clientRequestId }).then((response) => ({ ...response, data: normalizeDiagnosis(response.data) })) }
  getDiagnosis(diagnosisId: string) { return this.transport.request<ServerDiagnosisRecord>({ method: 'GET', path: `/api/v1/diagnoses/${diagnosisId}` }).then((response) => ({ ...response, data: normalizeDiagnosis(response.data) })) }
  getDiagnosisResult(diagnosisId: string) { return this.getDiagnosis(diagnosisId) }
  listDiagnoses() {
    return this.transport.request<PageResult<ServerDiagnosisRecord> | ServerDiagnosisRecord>({ method: 'GET', path: '/api/v1/diagnoses' }).then((response) => {
      const payload = response.data as PageResult<ServerDiagnosisRecord> | ServerDiagnosisRecord | undefined
      const candidateItems = payload && typeof payload === 'object' ? (payload as { items?: unknown }).items : undefined
      const items: ServerDiagnosisRecord[] = Array.isArray(candidateItems) ? candidateItems as ServerDiagnosisRecord[] : payload ? [payload as ServerDiagnosisRecord] : []
      const total = payload && typeof payload === 'object' && typeof (payload as { total?: unknown }).total === 'number' ? (payload as { total: number }).total : items.length
      return { ...response, data: { items: items.map(normalizeDiagnosis), total } }
    })
  }
  retryDiagnosis(diagnosisId: string) { return this.transport.request<ServerDiagnosisRecord>({ method: 'POST', path: `/api/v1/diagnoses/${diagnosisId}/retry` }).then((response) => ({ ...response, data: normalizeDiagnosis(response.data) })) }
  verifyDiagnosis(diagnosisId: string, outcome: DiagnosisVerificationOutcome, note?: string) { return this.transport.request<ServerDiagnosisRecord, { outcome: DiagnosisVerificationOutcome; note?: string }>({ method: 'POST', path: `/api/v1/diagnoses/${diagnosisId}/verify`, body: { outcome, note } }).then((response) => ({ ...response, data: normalizeDiagnosis(response.data) })) }
  createUpload(input: CreateUploadInput) { return this.transport.request<UploadTicket, CreateUploadInput>({ method: 'POST', path: '/api/v1/files/upload-url', body: input }) }
  completeUpload(fileId: string) { return this.transport.request<{ id: string; status: string }>({ method: 'POST', path: `/api/v1/files/${fileId}/complete` }) }
  listTasks() { return this.transport.request<PageResult<ServerFarmTask>>({ method: 'GET', path: '/api/v1/tasks' }).then((response) => ({ ...response, data: { ...response.data, items: response.data.items.map(normalizeTask) } })) }
  createTask(input: CreateTaskInput) {
    const { clientRequestId, ...taskInput } = input
    const body = { ...taskInput, priority: input.priority?.toLowerCase() as 'low' | 'medium' | 'high' | undefined, ...(clientRequestId ? { clientRequestId } : {}) }
    return this.transport.request<ServerFarmTask, typeof body>({ method: 'POST', path: '/api/v1/tasks', body, idempotencyKey: clientRequestId }).then((response) => ({ ...response, data: normalizeTask(response.data) }))
  }
  updateTask(taskId: string, input: UpdateTaskInput) { const { priority, ...rest } = input; const body = { ...rest, ...(priority ? { priority: priority.toLowerCase() as 'low' | 'medium' | 'high' } : {}) }; return this.transport.request<ServerFarmTask, typeof body>({ method: 'PATCH', path: `/api/v1/tasks/${taskId}`, body }).then((response) => ({ ...response, data: normalizeTask(response.data) })) }
  completeTask(taskId: string, note?: string) { return this.transport.request<ServerFarmTask, { note?: string }>({ method: 'POST', path: `/api/v1/tasks/${taskId}/complete`, body: { note } }).then((response) => ({ ...response, data: normalizeTask(response.data) })) }
  listMessages() { return this.transport.request<PageResult<Notification>>({ method: 'GET', path: '/api/v1/messages' }).then((response) => ({ ...response, data: { ...response.data, items: response.data.items.map(normalizeMessage) } })) }
  unreadMessageCount() { return this.transport.request<{ count: number }>({ method: 'GET', path: '/api/v1/messages/unread-count' }) }
  markMessageRead(messageId: string) { return this.transport.request<Notification>({ method: 'POST', path: `/api/v1/messages/${messageId}/read` }).then((response) => ({ ...response, data: normalizeMessage(response.data) })) }
  markAllMessagesRead() { return this.transport.request<{ updated: number }>({ method: 'POST', path: '/api/v1/messages/read-all' }) }
  getMessagePreferences() { return this.transport.request<NotificationPreferences>({ method: 'GET', path: '/api/v1/message-preferences' }) }
  updateMessagePreferences(input: Partial<NotificationPreferences>) { return this.transport.request<NotificationPreferences, Partial<NotificationPreferences>>({ method: 'PATCH', path: '/api/v1/message-preferences', body: input }) }
  getWeather(location?: string, latitude?: number, longitude?: number) { return this.transport.request<WeatherOverview>({ method: 'GET', path: '/api/v1/weather/overview', query: { location, latitude, longitude } }) }
  getWeatherForecast(input: { location?: string; latitude?: number; longitude?: number; days?: number; granularity?: 'daily' | 'hourly' } = {}) { return this.transport.request<WeatherForecastResult>({ method: 'GET', path: '/api/v1/weather/forecast', query: input }) }
  getWeatherHistory(input: { location?: string; latitude?: number; longitude?: number; startDate?: string; endDate?: string } = {}) { return this.transport.request<WeatherHistoryResult>({ method: 'GET', path: '/api/v1/weather/history', query: input }) }
  listShopProducts(category?: string) { return this.transport.request<PageResult<ShopProduct>>({ method: 'GET', path: '/api/v1/shop/products', query: { category } }) }
  createShopOrder(input: CreateShopOrderInput) { return this.transport.request<ShopOrder, CreateShopOrderInput>({ method: 'POST', path: '/api/v1/shop/orders', body: input, idempotencyKey: `shop_${Date.now()}` }) }
  listCommunityPosts(topic?: string) { return this.transport.request<PageResult<CommunityPost>>({ method: 'GET', path: '/api/v1/community/posts', query: { topic } }) }
  createCommunityPost(input: CreateCommunityPostInput) { return this.transport.request<CommunityPost, CreateCommunityPostInput>({ method: 'POST', path: '/api/v1/community/posts', body: input }) }
  likeCommunityPost(postId: string) { return this.transport.request<CommunityPost>({ method: 'POST', path: `/api/v1/community/posts/${postId}/like` }) }
  listExperts() { return this.transport.request<PageResult<ExpertProfile>>({ method: 'GET', path: '/api/v1/experts' }) }
  getExpertChat(expertId: string) { return this.transport.request<ExpertChatSession>({ method: 'GET', path: `/api/v1/expert-chats/${expertId}` }) }
  sendExpertMessage(expertId: string, text: string) { return this.transport.request<ChatMessage, { text: string }>({ method: 'POST', path: `/api/v1/expert-chats/${expertId}/messages`, body: { text } }) }
  listOpsConfigs() { return this.transport.request<PageResult<OpsConfig>>({ method: 'GET', path: '/api/v1/ops/configs' }) }
  createOpsConfig(input: CreateOpsConfigInput) { return this.transport.request<OpsConfig, CreateOpsConfigInput>({ method: 'POST', path: '/api/v1/ops/configs', body: input }) }
  getOpsConfig(configKey: string) { return this.transport.request<OpsConfig>({ method: 'GET', path: `/api/v1/ops/configs/${encodeURIComponent(configKey)}` }) }
  previewOpsConfig(input: { key?: string; category?: string; content: string }) { return this.transport.request<OpsConfigPreview, typeof input>({ method: 'POST', path: '/api/v1/ops/configs/preview', body: input }) }
  updateOpsConfig(configKey: string, content: string, expectedVersion?: string) { return this.transport.request<OpsConfig, { content: string; expectedVersion?: string }>({ method: 'PUT', path: `/api/v1/ops/configs/${encodeURIComponent(configKey)}`, body: { content, expectedVersion } }) }
  rollbackOpsConfig(configKey: string, version: string) { return this.transport.request<OpsConfig, { version: string }>({ method: 'POST', path: `/api/v1/ops/configs/${encodeURIComponent(configKey)}/rollback`, body: { version } }) }
  listOpsConfigVersions(configKey: string) { return this.transport.request<PageResult<OpsConfigVersion>>({ method: 'GET', path: `/api/v1/ops/configs/${encodeURIComponent(configKey)}/versions` }) }
}

export function toAuthIdentity(result: LoginResult): AuthIdentity { return { userId: result.user.id, displayName: result.user.nickname, isMock: result.user.id.startsWith('user_p0_') || result.user.id.startsWith('ops_p0_'), role: result.user.role.toUpperCase() } }
export * from '@nongjianzhen/types'
