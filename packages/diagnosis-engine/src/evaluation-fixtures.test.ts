import { describe, expect, it } from 'vitest'
import { DIAGNOSIS_EVALUATION_FIXTURES, evaluateDiagnosisFixture } from './evaluation-fixtures'

describe('诊断固定评测集', () => {
  it('包含至少五个可重复评测场景且 id 唯一', () => {
    expect(DIAGNOSIS_EVALUATION_FIXTURES.length).toBeGreaterThanOrEqual(5)
    expect(new Set(DIAGNOSIS_EVALUATION_FIXTURES.map((item) => item.id)).size).toBe(DIAGNOSIS_EVALUATION_FIXTURES.length)
  })

  it('高风险和危险输出样例必须要求专家复核', () => {
    const reviewCases = DIAGNOSIS_EVALUATION_FIXTURES.filter((item) => item.expectedRisk === 'HIGH' || item.expectedRisk === 'CRITICAL' || item.id === 'unsafe-chemical-output')
    expect(reviewCases.length).toBeGreaterThanOrEqual(3)
    expect(reviewCases.every((item) => item.expectedExpertReview && item.expectedDecision === 'EXPERT_REVIEW')).toBe(true)
  })

  it('图片失败和未知作物样例必须追问而不是直接出结果', () => {
    const askMoreCases = DIAGNOSIS_EVALUATION_FIXTURES.filter((item) => item.expectedDecision === 'ASK_MORE')
    expect(askMoreCases.length).toBeGreaterThanOrEqual(2)
    expect(askMoreCases.every((item) => item.expectedDecision !== 'RESULT')).toBe(true)
  })

  it('评测器能发现危险的结果回归', () => {
    const fixture = DIAGNOSIS_EVALUATION_FIXTURES.find((item) => item.id === 'unsafe-chemical-output')!
    const evaluation = evaluateDiagnosisFixture(fixture, { decision: 'RESULT', needExpertReview: false, risk: 'HIGH' })
    expect(evaluation.passed).toBe(false)
    expect(evaluation.failures).toEqual(expect.arrayContaining(['DECISION_MISMATCH', 'EXPERT_REVIEW_MISMATCH']))
  })
})

