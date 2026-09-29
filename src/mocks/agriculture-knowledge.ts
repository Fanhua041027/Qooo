import type { DiagnosisAction, DiagnosisDecision, DiagnosisExpertReview, DiagnosisFollowUpQuestion, DiagnosisModel, DiagnosisRisk, PossibleIssue, RiskLevel } from '@nongjianzhen/types'
import { DEFAULT_DIAGNOSIS_CONFIG, applyDiagnosisOperationsConfig } from '../../packages/diagnosis-engine/src/decision-config'
import knowledgeData from '../../data/agriculture/issues.v1.json'

interface AgricultureIssue {
  id: string
  crop: string
  problem: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  symptoms: string[]
  lookalikes?: string[]
  recommendedActions: { immediate: string[]; followUp: string[]; chemicalBoundary: string }
  doNot: string[]
  safeInterval: { displayText: string }
  expertReview: { recommended: boolean; triggers: string[] }
  plainLanguage: { shortName: string; summary: string; nextStep: string }
  aiReview: { confidenceCap: number }
}

interface AgricultureKnowledgeFile {
  version: string
  issues: AgricultureIssue[]
}

export interface MockKnowledgeResult {
  possibleIssues: PossibleIssue[]
  risk?: DiagnosisRisk
  actions: DiagnosisAction[]
  disclaimer: string
  decision: DiagnosisDecision
  followUpQuestions: DiagnosisFollowUpQuestion[]
  expertReview: DiagnosisExpertReview
  model: DiagnosisModel
}

const knowledge = knowledgeData as AgricultureKnowledgeFile

const defaultIssueIds: Record<string, string> = {
  番茄: 'tomato-late-blight',
  黄瓜: 'cucumber-downy-mildew',
  水稻: 'rice-blast',
  玉米: 'corn-northern-leaf-blight',
  柑橘: 'citrus-huanglongbing'
}

const riskLabels: Record<RiskLevel, string> = {
  LOW: '低风险',
  MEDIUM: '中风险',
  HIGH: '高风险',
  CRITICAL: '严重风险'
}

function toRiskLevel(level: AgricultureIssue['riskLevel']): RiskLevel {
  return level.toUpperCase() as RiskLevel
}

function createModel(): DiagnosisModel {
  return {
    name: 'agriculture-knowledge-mock',
    version: '1.1.0',
    provider: 'local-mock',
    promptVersion: 'diagnosis-prompt-1.0.0',
    policyVersion: '1.0.0-mvp',
    knowledgeVersion: knowledge.version,
    configVersion: 'ops-1.0.0'
  }
}

export function buildMockKnowledgeResult(crop: string): MockKnowledgeResult {
  const issue = knowledge.issues.find((item) => item.id === defaultIssueIds[crop])

  if (!issue) {
    return {
      possibleIssues: [],
      actions: [],
      disclaimer: '当前演示知识库暂不支持该作物，请补充作物信息或请农技员判断。',
      decision: 'ASK_MORE',
      followUpQuestions: [{
        code: 'SELECT_SUPPORTED_CROP',
        prompt: '请选择番茄、黄瓜、水稻、玉米或柑橘，并补拍整株和异常部位。',
        captureHint: '至少包含一张整株照片和一张异常部位近照。'
      }],
      expertReview: { required: false, reasonCodes: [] },
      model: createModel()
    }
  }

  const riskLevel = toRiskLevel(issue.riskLevel)
  const expertReviewRequired = issue.expertReview.recommended || riskLevel === 'HIGH' || riskLevel === 'CRITICAL'
  const actions: DiagnosisAction[] = [
    ...issue.recommendedActions.immediate.slice(0, 2).map((title) => ({ type: 'DO_NOW' as const, title })),
    ...issue.recommendedActions.followUp.slice(0, 1).map((title) => ({
      type: 'OBSERVE' as const,
      title,
      dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })),
    ...issue.doNot.slice(0, 1).map((title) => ({ type: 'AVOID' as const, title }))
  ]

  if (expertReviewRequired) actions.push({ type: 'EXPERT_REVIEW', title: issue.plainLanguage.nextStep })
  actions.forEach((action) => { action.safetyLevel = action.type === 'EXPERT_REVIEW' || action.type === 'AVOID' ? 'BIOSECURITY' : 'OBSERVATION' })
  const configured = applyDiagnosisOperationsConfig(DEFAULT_DIAGNOSIS_CONFIG, {
    riskLevel,
    confidence: Math.min(0.86, issue.aiReview.confidenceCap),
    actions,
    disclaimer: '当前内容为基于演示知识库的辅助判断，不代表确诊。涉及用药请核验登记信息和产品标签。',
    safetyPassed: true,
  })

  return {
    possibleIssues: [{
      name: issue.plainLanguage.shortName,
      confidence: Math.min(0.86, issue.aiReview.confidenceCap),
      evidence: issue.symptoms.slice(0, 3),
      riskLevel,
      lookalikes: issue.lookalikes || []
    }],
    risk: { level: riskLevel, label: configured.riskLabel || riskLabels[riskLevel], reason: `${issue.plainLanguage.summary} ${configured.riskHint}` },
    actions: configured.actions,
    disclaimer: `以上为基于演示知识库的辅助判断，不代表确诊。${issue.safeInterval.displayText}`,
    decision: configured.needExpertReview || expertReviewRequired ? 'EXPERT_REVIEW' : 'RESULT',
    followUpQuestions: [],
    expertReview: {
      required: configured.needExpertReview || expertReviewRequired,
      reasonCodes: configured.needExpertReview || expertReviewRequired ? ['KNOWLEDGE_POLICY_REVIEW'] : [],
      message: expertReviewRequired ? '当前问题风险较高或容易混淆，建议让农技人员结合田间情况复核。' : undefined
    },
    model: createModel()
  }
}

export const agricultureKnowledgeVersion = knowledge.version

