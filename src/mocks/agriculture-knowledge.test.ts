import { describe, expect, it } from 'vitest'
import { agricultureKnowledgeVersion, buildMockKnowledgeResult } from './agriculture-knowledge'

describe('农业知识 Mock', () => {
  it.each([
    ['番茄', '疑似晚疫病'],
    ['黄瓜', '疑似霜霉病'],
    ['水稻', '疑似稻瘟病'],
    ['玉米', '疑似玉米大斑病'],
    ['柑橘', '疑似黄龙病']
  ])('%s 返回对应作物问题', (crop, expectedIssue) => {
    const result = buildMockKnowledgeResult(crop)
    expect(result.possibleIssues[0]?.name).toBe(expectedIssue)
    expect(result.model.knowledgeVersion).toBe(agricultureKnowledgeVersion)
    expect(result.disclaimer).toContain('不代表确诊')
  })

  it('不支持的作物要求补充信息且不伪造病名', () => {
    const result = buildMockKnowledgeResult('苹果')
    expect(result.decision).toBe('ASK_MORE')
    expect(result.possibleIssues).toEqual([])
    expect(result.followUpQuestions).toHaveLength(1)
  })

  it('严重风险问题强制进入专家复核', () => {
    const result = buildMockKnowledgeResult('柑橘')
    expect(result.risk?.level).toBe('CRITICAL')
    expect(result.expertReview.required).toBe(true)
    expect(result.actions.some((action) => action.type === 'EXPERT_REVIEW')).toBe(true)
  })
})

