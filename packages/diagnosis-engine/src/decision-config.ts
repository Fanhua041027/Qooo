import type { DiagnosisAction, DiagnosisActionType, DiagnosisLoopStage, RiskLevel } from '@nongjianzhen/types'

/** 运营配置只允许改变已声明的决策边界，不能关闭安全闸门。 */
export const DIAGNOSIS_CONFIG_SCHEMA_VERSION = '1.0.0'
export const DEFAULT_DIAGNOSIS_CONFIG_VERSION = 'ops-1.0.0'

export type SafetyLevel = NonNullable<DiagnosisAction['safetyLevel']>
export type ConfigAction = Required<Pick<DiagnosisAction, 'type' | 'title' | 'description' | 'safetyLevel'>> & Pick<DiagnosisAction, 'dueAt'>

export interface RiskLevelConfig {
  label: string
  resultHint: string
  minimumReviewConfidence: number
  forceExpertReview: boolean
  displayOrder: number
}

export interface DiagnosisSafetyRuleConfig {
  allowChemicalAdvice: false
  allowDosage: false
  requireRegisteredProduct: true
  requireExpertReviewForChemical: true
  blockedTextPatterns: string[]
  restrictedPesticides: string[]
  fallbackAction: ConfigAction
  fallbackDisclaimer: string
}

export interface DiagnosisJevConfig {
  allowedTransitions: Partial<Record<DiagnosisLoopStage, DiagnosisLoopStage[]>>
  requireTaskForExecution: true
  verificationOutcomes: Array<'IMPROVED' | 'UNCHANGED' | 'WORSE' | 'UNKNOWN'>
  reassessmentRequiresNewEvidence: true
}

export interface DiagnosisOperationsConfig {
  schemaVersion: string
  configVersion: string
  riskLevels: Record<RiskLevel, RiskLevelConfig>
  safety: DiagnosisSafetyRuleConfig
  jev: DiagnosisJevConfig
}

const fallbackAction: ConfigAction = {
  type: 'EXPERT_REVIEW',
  title: '请由农技人员复核后再处理',
  description: '当前建议未通过安全校验，已隐藏可能造成误用的处理内容。',
  safetyLevel: 'BIOSECURITY',
  dueAt: undefined,
}

export const DEFAULT_DIAGNOSIS_CONFIG: DiagnosisOperationsConfig = {
  schemaVersion: DIAGNOSIS_CONFIG_SCHEMA_VERSION,
  configVersion: DEFAULT_DIAGNOSIS_CONFIG_VERSION,
  riskLevels: {
    LOW: { label: '低风险', resultHint: '先观察并记录变化。', minimumReviewConfidence: 0.55, forceExpertReview: false, displayOrder: 1 },
    MEDIUM: { label: '中风险', resultHint: '建议补充证据后再决定处理方式。', minimumReviewConfidence: 0.65, forceExpertReview: false, displayOrder: 2 },
    HIGH: { label: '高风险', resultHint: '建议尽快隔离观察，并安排农技复核。', minimumReviewConfidence: 0.75, forceExpertReview: true, displayOrder: 3 },
    CRITICAL: { label: '严重风险', resultHint: '请暂停扩散性操作并尽快联系农技人员。', minimumReviewConfidence: 0.85, forceExpertReview: true, displayOrder: 4 },
  },
  safety: {
    allowChemicalAdvice: false,
    allowDosage: false,
    requireRegisteredProduct: true,
    requireExpertReviewForChemical: true,
    blockedTextPatterns: ['具体剂量', '每亩', '每公顷', '稀释', '安全间隔期'],
    restrictedPesticides: ['百草枯', '甲胺磷', '敌敌畏', '毒鼠强'],
    fallbackAction,
    fallbackDisclaimer: '内容未通过安全校验，仅保留辅助判断和人工复核提示；涉及用药请查验登记信息并咨询当地农技人员。',
  },
  jev: {
    allowedTransitions: {
      JUDGMENT: ['EXECUTION', 'REASSESSMENT', 'CLOSED'],
      EXECUTION: ['VERIFICATION', 'REASSESSMENT'],
      VERIFICATION: ['REASSESSMENT', 'CLOSED'],
      REASSESSMENT: ['JUDGMENT', 'CLOSED'],
      CLOSED: [],
    },
    requireTaskForExecution: true,
    verificationOutcomes: ['IMPROVED', 'UNCHANGED', 'WORSE', 'UNKNOWN'],
    reassessmentRequiresNewEvidence: true,
  },
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function validateDiagnosisConfig(value: unknown): string[] {
  const errors: string[] = []
  if (!isRecord(value)) return ['配置必须是对象']
  if (value.schemaVersion !== DIAGNOSIS_CONFIG_SCHEMA_VERSION) errors.push('schemaVersion 不受支持')
  if (typeof value.configVersion !== 'string' || !value.configVersion.trim()) errors.push('configVersion 不能为空')
  const risks = value.riskLevels
  for (const level of ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as RiskLevel[]) {
    const item = isRecord(risks) ? risks[level] : undefined
    if (!isRecord(item)) {
      errors.push(`缺少风险等级配置: ${level}`)
      continue
    }
    if (typeof item.label !== 'string' || typeof item.resultHint !== 'string') errors.push(`${level} 文案字段无效`)
    if (typeof item.minimumReviewConfidence !== 'number' || item.minimumReviewConfidence < 0 || item.minimumReviewConfidence > 1) errors.push(`${level}.minimumReviewConfidence 必须在 0 到 1 之间`)
    if (typeof item.forceExpertReview !== 'boolean') errors.push(`${level}.forceExpertReview 必须是 boolean`)
  }
  const safety = isRecord(value.safety) ? value.safety : undefined
  if (!safety) errors.push('缺少 safety 配置')
  else {
    if (safety.allowDosage !== false) errors.push('allowDosage 必须永远为 false')
    if (safety.allowChemicalAdvice !== false) errors.push('allowChemicalAdvice 必须为 false')
    if (safety.requireRegisteredProduct !== true) errors.push('requireRegisteredProduct 必须为 true')
    if (safety.requireExpertReviewForChemical !== true) errors.push('requireExpertReviewForChemical 必须为 true')
    if (!Array.isArray(safety.blockedTextPatterns) || !Array.isArray(safety.restrictedPesticides)) errors.push('安全拦截词必须是数组')
    const action = safety.fallbackAction
    if (!isRecord(action) || action.type !== 'EXPERT_REVIEW' || action.safetyLevel === 'CHEMICAL_REVIEW') errors.push('fallbackAction 必须是非化学的 EXPERT_REVIEW')
  }
  const jev = isRecord(value.jev) ? value.jev : undefined
  if (!jev) errors.push('缺少 jev 配置')
  else {
    if (!isRecord(jev.allowedTransitions)) errors.push('JEV allowedTransitions 必须是对象')
    if (jev.requireTaskForExecution !== true) errors.push('JEV 必须要求任务才能进入 EXECUTION')
    if (jev.reassessmentRequiresNewEvidence !== true) errors.push('JEV 必须要求新证据才能重新判断')
    if (!Array.isArray(jev.verificationOutcomes) || !jev.verificationOutcomes.length) errors.push('JEV verificationOutcomes 不能为空')
  }
  return errors
}

export interface AppliedOperationsDecision {
  riskLabel: string
  riskHint: string
  needExpertReview: boolean
  actions: DiagnosisAction[]
  disclaimer: string
}

export interface JevTransitionInput {
  from: DiagnosisLoopStage
  to: DiagnosisLoopStage
  hasTask?: boolean
  hasNewEvidence?: boolean
  outcome?: 'IMPROVED' | 'UNCHANGED' | 'WORSE' | 'UNKNOWN'
}

export interface JevTransitionResult {
  allowed: boolean
  reasonCode?: 'INVALID_CONFIG' | 'TRANSITION_NOT_ALLOWED' | 'TASK_REQUIRED' | 'NEW_EVIDENCE_REQUIRED' | 'OUTCOME_NOT_ALLOWED'
}

/** 在写入诊断 loop 之前校验 JEV 转换，避免任务或复查接口绕过配置边界。 */
export function validateJevTransition(config: DiagnosisOperationsConfig, input: JevTransitionInput): JevTransitionResult {
  if (validateDiagnosisConfig(config).length) return { allowed: false, reasonCode: 'INVALID_CONFIG' }
  const allowedTargets = config.jev.allowedTransitions[input.from] || []
  if (!allowedTargets.includes(input.to)) return { allowed: false, reasonCode: 'TRANSITION_NOT_ALLOWED' }
  if (input.to === 'EXECUTION' && config.jev.requireTaskForExecution && !input.hasTask) {
    return { allowed: false, reasonCode: 'TASK_REQUIRED' }
  }
  if (input.from === 'REASSESSMENT' && input.to === 'JUDGMENT' && config.jev.reassessmentRequiresNewEvidence && !input.hasNewEvidence) {
    return { allowed: false, reasonCode: 'NEW_EVIDENCE_REQUIRED' }
  }
  if (input.outcome && !config.jev.verificationOutcomes.includes(input.outcome)) {
    return { allowed: false, reasonCode: 'OUTCOME_NOT_ALLOWED' }
  }
  return { allowed: true }
}

/** 将配置应用到模型候选，模型和运营文案均不能绕过安全边界。 */
export function applyDiagnosisOperationsConfig(
  config: DiagnosisOperationsConfig,
  input: { riskLevel?: RiskLevel; confidence?: number; actions: DiagnosisAction[]; disclaimer: string; safetyPassed?: boolean },
): AppliedOperationsDecision {
  const safeConfig = validateDiagnosisConfig(config).length ? DEFAULT_DIAGNOSIS_CONFIG : config
  const risk = safeConfig.riskLevels[input.riskLevel || 'MEDIUM'] || safeConfig.riskLevels.MEDIUM
  const confidence = input.confidence ?? 0
  const needExpertReview = Boolean(!input.safetyPassed || risk.forceExpertReview || confidence < risk.minimumReviewConfidence)
  if (!input.safetyPassed) {
    return {
      riskLabel: risk.label,
      riskHint: risk.resultHint,
      needExpertReview: true,
      actions: [{ ...safeConfig.safety.fallbackAction }],
      disclaimer: safeConfig.safety.fallbackDisclaimer,
    }
  }
  return { riskLabel: risk.label, riskHint: risk.resultHint, needExpertReview, actions: input.actions, disclaimer: input.disclaimer }
}

