import operations from '../../data/agriculture/operations.v1.json'
import taskTemplates from '../../data/agriculture/task-templates.v1.json'
import reviewExamples from '../../data/agriculture/ai-review-examples.json'
import issues from '../../data/agriculture/issues.v1.json'
import { AGRICULTURE_OPS_CONFIGS } from './ops-config-seed'
import { describe, expect, it } from 'vitest'

type ContentItem = {
  code: string
  applicableCrops: string[]
  scenarios: string[]
  needsExpertReview: boolean
  userAction?: string
  level?: string
  [key: string]: unknown
}

const groups: ContentItem[][] = [
  operations.riskLevels,
  operations.imageQualityPrompts,
  operations.actionTemplates,
  operations.safetyBoundaries,
  operations.expertReviewPrompts
] as unknown as ContentItem[][]

const allItems = groups.flat()

describe('农业运营内容配置', () => {
  it('所有内容条目都有唯一 code、作物和场景绑定', () => {
    const codes = allItems.map((item) => item.code)

    expect(new Set(codes).size).toBe(codes.length)
    for (const item of allItems) {
      expect(item.code).toMatch(/^[A-Z0-9_]+$/)
      expect(item.applicableCrops.length).toBeGreaterThan(0)
      expect(item.scenarios.length).toBeGreaterThan(0)
      expect(typeof item.needsExpertReview).toBe('boolean')
    }
  })

  it('高风险和严重风险必须包含专家复核路径', () => {
    const highRiskItems = (operations.riskLevels as ContentItem[]).filter((item) => item.level === 'high' || item.level === 'critical')

    expect(highRiskItems.length).toBe(2)
    for (const item of highRiskItems) {
      expect(item.needsExpertReview).toBe(true)
      expect(item.userAction).toContain('复核')
    }
  })

  it('任务模板只引用存在的行动模板', () => {
    const actionCodes = new Set(operations.actionTemplates.map((item) => item.code))

    expect(taskTemplates.templates.length).toBeGreaterThan(0)
    for (const template of taskTemplates.templates) {
      expect(actionCodes.has(template.actionCode)).toBe(true)
      expect(template.applicableCrops.length).toBeGreaterThan(0)
      expect(template.scenarios.length).toBeGreaterThan(0)
      expect(template.completionEvidence.length).toBeGreaterThan(0)
    }
  })

  it('可展示内容不包含绝对诊断和固定用药承诺', () => {
    const renderable = groups
      .flat()
      .flatMap((item) => Object.entries(item)
        .filter(([key, value]) => key !== 'forbidden' && key !== 'mustInclude' && typeof value === 'string')
        .map(([, value]) => value as string))
      .join('\n')

    expect(renderable).not.toMatch(/保证治愈|百分之百确诊|肯定是|照做一定有效|安全间隔期(?:为|是|需等待)?\s*\d+/u)
  })

  it('AI 审核样例全部声明预期决策和审核原因', () => {
    expect(reviewExamples.cases.length).toBeGreaterThanOrEqual(10)
    for (const item of reviewExamples.cases) {
      expect(item.id).toBeTruthy()
      expect(['approve', 'reject']).toContain(item.expectedDecision)
      expect(item.reason).toBeTruthy()
    }
  })

  it('配置在审批完成前保持发布闸门关闭', () => {
    expect(operations.approval.agronomist.status).toBe('pending')
    expect(operations.approval.productOwner.status).toBe('pending')
    expect(taskTemplates.approval.agronomist.status).toBe('pending')
    expect(taskTemplates.approval.productOwner.status).toBe('pending')
  })

  it('40 条问题都具备诊断、行动、安全和复核字段', () => {
    expect(issues.issues).toHaveLength(40)
    const supportedCrops = new Set(operations.scope.crops)
    for (const issue of issues.issues) {
      expect(supportedCrops.has(issue.crop)).toBe(true)
      expect(issue.symptoms.length).toBeGreaterThan(0)
      expect(issue.possibleCauses.length).toBeGreaterThan(0)
      expect(issue.captureParts.length).toBeGreaterThan(0)
      expect(issue.actionWindow).toBeTruthy()
      expect(issue.recommendedActions.immediate.length).toBeGreaterThan(0)
      expect(issue.recommendedActions.followUp.length).toBeGreaterThan(0)
      expect(issue.recommendedActions.chemicalBoundary).toBeTruthy()
      expect(issue.doNot.length).toBeGreaterThan(0)
      expect(['label_required', 'not_applicable']).toContain(issue.safeInterval.policy)
      expect(issue.safeInterval.displayText).toBeTruthy()
      expect(typeof issue.expertReview.recommended).toBe('boolean')
      expect(issue.expertReview.triggers.length).toBeGreaterThan(0)
    }
  })

  it('Mock 运营配置与结构化运营内容保持映射', () => {
    expect(new Set(AGRICULTURE_OPS_CONFIGS.map((item) => item.key)).size).toBe(AGRICULTURE_OPS_CONFIGS.length)
    expect(AGRICULTURE_OPS_CONFIGS.length).toBeGreaterThanOrEqual(30)
    for (const item of AGRICULTURE_OPS_CONFIGS) {
      expect(item.content).toContain('"code"')
      expect(item.updatedBy).toBeTruthy()
    }
    expect(AGRICULTURE_OPS_CONFIGS.some((item) => item.updatedBy.includes('待审批'))).toBe(true)
    expect(AGRICULTURE_OPS_CONFIGS.some((item) => item.key === 'action.observe')).toBe(true)
    expect(AGRICULTURE_OPS_CONFIGS.some((item) => item.key === 'home.quick-start')).toBe(true)
    expect(AGRICULTURE_OPS_CONFIGS.some((item) => item.key === 'safety.uncertain-pesticide')).toBe(true)
    const safety = JSON.parse(AGRICULTURE_OPS_CONFIGS.find((item) => item.key === 'safety.uncertain-pesticide')!.content) as Record<string, unknown>
    expect(safety.blockAction).toBe(true)
    expect(safety.allowDose).toBe(false)
    expect(safety.requiredEscalation).toBe('LOCAL_AGRONOMIST')
  })
})
