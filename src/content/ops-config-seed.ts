import type { OpsConfig, OpsConfigCategory } from '@nongjianzhen/types'
import operations from '../../data/agriculture/operations.v1.json'

type OperationItem = {
  code: string
  applicableCrops: string[]
  scenarios: string[]
  needsExpertReview: boolean
  [key: string]: unknown
}

type OperationGroup = {
  category: OpsConfigCategory
  items: OperationItem[]
}

const keyByCode: Record<string, string> = {
  RISK_LOW: 'risk.low', RISK_MEDIUM: 'risk.medium', RISK_HIGH: 'risk.high', RISK_CRITICAL: 'risk.critical',
  IMAGE_TOO_DARK: 'image_quality.too_dark', IMAGE_BLURRY: 'image_quality.blurry', IMAGE_SUBJECT_TOO_SMALL: 'image_quality.subject-too-small', IMAGE_OCCLUDED: 'image_quality.occluded', IMAGE_WRONG_PART: 'image_quality.wrong-part',
  ACTION_ISOLATE_TODAY: 'action.isolate.today', ACTION_REMOVE_SEVERE_LEAVES: 'action.remove.severe-leaves', ACTION_VENTILATE_AND_DRY: 'action.ventilate-and-dry', ACTION_CHECK_ROOT_AND_WATER: 'action.check-root-and-water', ACTION_INSPECT_LEAF_BACK: 'action.inspect-leaf-back', ACTION_RECHECK_24H: 'action.observe', ACTION_RECHECK_3D: 'action.recheck.3d', ACTION_EXPERT_REVIEW_HIGH_RISK: 'action.expert-review.high-risk',
  SAFETY_LABEL_REQUIRED: 'safety.label-required', SAFETY_NO_BANNED_PESTICIDE: 'safety.no-banned-pesticide', SAFETY_FERTILIZER_EVIDENCE: 'safety.fertilizer-evidence', SAFETY_NO_CURE_PROMISE: 'safety.no-cure-promise', SAFETY_HUMAN_OR_ANIMAL_EXPOSURE: 'safety.human-or-animal-exposure',
  REVIEW_HIGH_RISK_FAST_SPREAD: 'expert_review.high-risk', REVIEW_LOOKALIKE_UNCLEAR: 'expert_review.lookalike-unclear', REVIEW_QUARANTINE_OR_REGULATED: 'expert_review.quarantine-or-regulated', REVIEW_MEDIUM_NO_IMPROVEMENT: 'expert_review.no-improvement', REVIEW_HUMAN_OR_ANIMAL_EXPOSURE: 'expert_review.human-or-animal-exposure', REVIEW_IMAGE_EVIDENCE_INSUFFICIENT: 'expert_review.insufficient-evidence'
}

const groups: OperationGroup[] = [
  { category: 'RISK', items: operations.riskLevels as OperationItem[] },
  { category: 'IMAGE_QUALITY', items: operations.imageQualityPrompts as OperationItem[] },
  { category: 'ACTION', items: operations.actionTemplates as OperationItem[] },
  { category: 'SAFETY', items: operations.safetyBoundaries as OperationItem[] },
  { category: 'EXPERT_REVIEW', items: operations.expertReviewPrompts as OperationItem[] }
]

function fallbackKey(category: OpsConfigCategory, code: string) {
  return `${category.toLowerCase()}.${code.toLowerCase().replace(/_/g, '-')}`
}

function displayName(category: OpsConfigCategory, item: OperationItem) {
  const labels: Record<OpsConfigCategory, string> = { RISK: '风险等级', ACTION: '下一步行动', IMAGE_QUALITY: '图片质量提示', SAFETY: '安全边界', EXPERT_REVIEW: '专家复核提示', HOME: '首页提示' }
  const title = typeof item.label === 'string' ? item.label : typeof item.title === 'string' ? item.title : item.code
  return `${labels[category]}：${title}`
}

function description(category: OpsConfigCategory) {
  return { RISK: '诊断结果中的风险等级、处理时限和升级条件。', ACTION: '诊断结果和任务创建时展示的可执行行动。', IMAGE_QUALITY: '照片质量不足时的补拍引导。', SAFETY: '涉及用药、肥料和人员安全时必须遵守的边界。', EXPERT_REVIEW: '触发人工复核时展示的原因和提交路径。', HOME: '首页首次使用引导。' }[category]
}

function renderContent(category: OpsConfigCategory, item: OperationItem) {
  const content: Record<string, unknown> = { code: item.code, applicableCrops: item.applicableCrops, scenarios: item.scenarios, needsExpertReview: item.needsExpertReview }
  if (category === 'RISK') Object.assign(content, { level: item.level, title: item.label, description: item.description, actionWindow: item.userAction, reviewReason: item.reviewReason })
  if (category === 'IMAGE_QUALITY') Object.assign(content, { title: item.title, description: item.message, nextAction: item.nextAction, status: item.status, reviewReason: item.reviewReason })
  if (category === 'ACTION') Object.assign(content, { type: item.type, title: item.title, description: item.description, dueRule: item.timeCondition, avoid: item.avoid, reviewReason: item.reviewReason })
  if (category === 'SAFETY') Object.assign(content, { ruleCode: item.code, title: item.title, description: item.message, mustInclude: item.mustInclude, forbidden: item.forbidden, blockAction: true, requiredEscalation: 'LOCAL_AGRONOMIST', allowDose: false, reviewReason: item.reviewReason })
  if (category === 'EXPERT_REVIEW') Object.assign(content, { title: '专家复核提示', description: item.message, trigger: item.trigger, reviewPath: item.reviewPath })
  return JSON.stringify(content)
}

function toConfig(category: OpsConfigCategory, item: OperationItem): OpsConfig {
  return { key: keyByCode[item.code] || fallbackKey(category, item.code), name: displayName(category, item), description: description(category), category, status: 'DRAFT', content: renderContent(category, item), version: 'v1.0', updatedAt: `${operations.updatedAt}T00:00:00.000Z`, updatedBy: '内容负责人（待审批）', previousVersions: [] }
}

const structuredConfigs = groups.flatMap(({ category, items }) => items.map((item) => toConfig(category, item)))
const compatibilityConfigs: OpsConfig[] = [
  { ...structuredConfigs.find((item) => item.key === 'risk.medium')!, key: 'risk.medium.label', name: '中风险等级文案（兼容 key）' },
  { ...structuredConfigs.find((item) => item.key === 'safety.label-required')!, key: 'safety.uncertain-pesticide', name: '安全提醒：暂不自行用药' },
  { key: 'home.quick-start', name: '首页拍照引导', description: '首页主操作区域的辅助说明。', category: 'HOME', status: 'DRAFT', content: JSON.stringify({ code: 'HOME_QUICK_START', title: '拍下作物异常部位', description: '靠近病斑，保持光线均匀，拍清叶片边缘。', badge: '约 30 秒得到初步判断' }), version: 'v1.0', updatedAt: `${operations.updatedAt}T00:00:00.000Z`, updatedBy: '内容负责人（待审批）', previousVersions: [] },
  { key: 'home.disclaimer', name: '首页辅助判断声明', description: '首页对 AI 结果边界的说明。', category: 'HOME', status: 'DRAFT', content: JSON.stringify({ code: 'HOME_DISCLAIMER', title: '辅助判断', description: '结果需要结合田间情况确认，不代替农技人员诊断。' }), version: 'v1.0', updatedAt: `${operations.updatedAt}T00:00:00.000Z`, updatedBy: '内容负责人（待审批）', previousVersions: [] }
]

export const AGRICULTURE_OPS_CONFIGS: OpsConfig[] = [...structuredConfigs, ...compatibilityConfigs]

