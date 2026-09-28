export type ApiCode = 'OK' | string

export interface ApiEnvelope<T> {
  code: ApiCode
  message: string
  data: T
  requestId: string
  traceId?: string
  /** 错误响应中的结构化字段，不参与成功响应的业务数据。 */
  details?: ApiErrorDetails
}

export interface PageResult<T> {
  items: T[]
  total: number
}

export interface ApiErrorDetails {
  action?: string
  field?: string
  fields?: string[]
  [key: string]: unknown
}

export type DiagnosisStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'NEED_MORE_IMAGES' | 'NEED_EXPERT_REVIEW' | 'FAILED'
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type ImageQualityStatus = 'PASS' | 'WARNING' | 'FAILED' | 'UNCHECKED'

export type ImageQualityIssueCode =
  | 'QUALITY_SIGNAL_INVALID'
  | 'IMAGE_TOO_SMALL'
  | 'IMAGE_BLURRY'
  | 'IMAGE_TOO_DARK'
  | 'IMAGE_TOO_BRIGHT'
  | 'SUBJECT_TOO_SMALL'
  | 'SUBJECT_OCCLUDED'

export interface DiagnosisImageQuality {
  status: ImageQualityStatus
  issues: string[]
  issueCodes?: ImageQualityIssueCode[]
  score?: number
}

export interface DiagnosisImage {
  url: string
  objectKey?: string
  fileId?: string
  fileSize?: number
  contentType?: 'image/jpeg' | 'image/png' | 'image/webp'
  width: number
  height: number
  quality: DiagnosisImageQuality
}

export interface CropContext {
  name: string
  growthStage: string
}

export interface CreateDiagnosisInput {
  plotId?: string
  crop: CropContext
  /** 用户对异常位置、出现时间和变化趋势的补充描述。 */
  description?: string
  images: DiagnosisImage[]
  clientRequestId: string
}

export interface PossibleIssue {
  name: string
  confidence: number
  evidence: string[]
  riskLevel?: RiskLevel
  lookalikes?: string[]
}

export interface DiagnosisRisk {
  level: RiskLevel
  label: string
  reason: string
}

export type DiagnosisActionType = 'DO_NOW' | 'OBSERVE' | 'AVOID' | 'EXPERT_REVIEW'

export interface DiagnosisAction {
  type: DiagnosisActionType
  title: string
  description?: string
  dueAt?: string
}

export interface DiagnosisModel {
  name: string
  version: string
  traceId?: string
  provider?: string
  promptVersion?: string
  policyVersion?: string
  knowledgeVersion?: string
}

export type DiagnosisDecision = 'RESULT' | 'ASK_MORE' | 'EXPERT_REVIEW' | 'REJECTED'

export type DiagnosisLoopStage = 'JUDGMENT' | 'EXECUTION' | 'VERIFICATION' | 'REASSESSMENT' | 'CLOSED'
export type DiagnosisVerificationOutcome = 'IMPROVED' | 'UNCHANGED' | 'WORSE' | 'UNKNOWN'

export interface DiagnosisLoopState {
  stage: DiagnosisLoopStage
  taskId?: string
  nextReviewAt?: string
  outcome?: DiagnosisVerificationOutcome
  note?: string
  verifiedAt?: string
  updatedAt: string
}

export interface DiagnosisFollowUpQuestion {
  code: string
  prompt: string
  captureHint?: string
}

export interface DiagnosisExpertReview {
  required: boolean
  reasonCodes: string[]
  message?: string
}

export interface DiagnosisSafety {
  passed: boolean
  violationCodes: string[]
}

export interface DiagnosisRecord {
  id: string
  status: DiagnosisStatus
  crop: string
  plotId?: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
  possibleIssues: PossibleIssue[]
  risk?: DiagnosisRisk
  actions: DiagnosisAction[]
  disclaimer: string
  model: DiagnosisModel
  requestId: string
  decision?: DiagnosisDecision
  loop?: DiagnosisLoopState
  followUpQuestions?: DiagnosisFollowUpQuestion[]
  expertReview?: DiagnosisExpertReview
  safety?: DiagnosisSafety
  progress?: {
    stage: 'UPLOADING' | 'QUALITY_CHECK' | 'ANALYZING' | 'GENERATING_RESULT'
    label: string
    percent: number
  }
  error?: {
    code: string
    message: string
  }
}

export interface Plot {
  id: string
  farmId: string
  name: string
  cropName: string
  growthStage?: string
  areaMu?: number
  plantedAt?: string
}

export interface Farm {
  id: string
  name: string
  location: string
  areaMu?: number
  healthScore?: number
  plots?: Plot[]
}

export interface CreateFarmInput {
  name: string
  location: string
}

export type UpdateFarmInput = Partial<CreateFarmInput>

export interface CreatePlotInput {
  name: string
  cropName: string
  growthStage?: string
  areaMu?: number
  plantedAt?: string
}

export type UpdatePlotInput = Partial<CreatePlotInput>

export type TaskStatus = 'PENDING' | 'COMPLETED' | 'OVERDUE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface FarmTask {
  id: string
  title: string
  description?: string
  farmId?: string
  plotId?: string
  diagnosisId?: string
  priority: TaskPriority
  status: TaskStatus
  dueAt?: string
  createdAt: string
  updatedAt: string
}

export type NotificationType = 'DIAGNOSIS_COMPLETED' | 'DIAGNOSIS_FAILED' | 'TASK_DUE' | 'TASK_OVERDUE' | 'SYSTEM'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  content: string
  targetType?: string
  targetId?: string
  readAt?: string | null
  createdAt: string
}

export interface CreateTaskInput {
  /** 客户端重试时复用，服务端据此保证同一任务不会重复创建。 */
  clientRequestId?: string
  title: string
  description?: string
  farmId?: string
  plotId?: string
  diagnosisId?: string
  priority?: TaskPriority
  dueAt?: string
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  priority?: TaskPriority
  dueAt?: string
}

export interface AuthIdentity {
  userId: string
  displayName: string
  isMock: boolean
}

// 以下类型严格对应后端 HTTP 契约；页面通过 API Client 适配为上方稳定的 UI 类型。
export type ServerDiagnosisStatus = 'created' | 'uploading' | 'analyzing' | 'completed' | 'need_more_images' | 'need_expert_review' | 'failed'
export type ServerRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface ServerDiagnosisImageInput {
  objectKey: string
  width?: number
  height?: number
  quality?: Record<string, unknown>
}

export interface ServerCreateDiagnosisInput {
  clientRequestId: string
  farmId?: string
  plotId?: string
  cropName?: string
  growthStage?: string
  description?: string
  images: ServerDiagnosisImageInput[]
}

export interface ServerDiagnosisResult {
  decision: 'result' | 'ask_more' | 'expert_review' | 'rejected'
  model: {
    name: string
    version: string
    traceId: string
    knowledgeVersion: string
    promptVersion?: string
    policyVersion?: string
  }
  crop: string
  stage: string
  possibleProblems: Array<{
    name: string
    confidence: number
    riskLevel: ServerRiskLevel
    evidence: string[]
    lookalikes?: string[]
  }>
  actions: Array<{
    title: string
    description: string
    priority: 'now' | 'today' | 'follow_up'
  }>
  avoidActions: string[]
  followUpQuestions: Array<{ code: string; prompt: string; captureHint?: string }>
  needExpertReview: boolean
  expertReviewReasons: string[]
  needMoreImages: boolean
  safety: { passed: boolean; violationCodes: string[] }
  disclaimer: string
  loop?: DiagnosisLoopState
}

export interface ServerDiagnosisRecord {
  id: string
  status: ServerDiagnosisStatus
  farmId?: string | null
  plotId?: string | null
  cropName?: string | null
  growthStage?: string | null
  result?: ServerDiagnosisResult | null
  failureCode?: string | null
  failureMessage?: string | null
  requestId: string
  traceId: string
  createdAt: string
  updatedAt: string
}

export interface CreateUploadInput {
  contentType: 'image/jpeg' | 'image/png' | 'image/webp'
  extension: 'jpg' | 'jpeg' | 'png' | 'webp'
  size?: number
  purpose?: 'diagnoses' | 'avatar'
}

export interface UploadTicket {
  fileId: string
  objectKey: string
  uploadUrl: string
  expiresIn: number
  method: 'PUT'
  contentType: string
}

export interface ServerFarm {
  id: string
  name: string
  region: string
  address?: string | null
  areaMu?: number | null
  healthScore?: number
  plots?: ServerPlot[]
}

export interface ServerPlot {
  id: string
  farmId: string
  name: string
  cropName: string
  cropVariety?: string | null
  growthStage?: string | null
  areaMu?: number | null
  plantedAt?: string
}

export interface ServerFarmTask extends Omit<FarmTask, 'status' | 'priority'> {
  status: 'pending' | 'completed' | 'overdue' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
}

export interface LoginResult {
  accessToken: string
  tokenType: 'Bearer'
  expiresIn: string
  user: {
    id: string
    nickname: string
    avatarUrl?: string | null
    role: string
  }
}
