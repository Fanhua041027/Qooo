import {
  DEFAULT_DIAGNOSIS_CONFIG,
  DEFAULT_DIAGNOSIS_CONFIG_VERSION,
  applyDiagnosisOperationsConfig,
  validateJevTransition,
  validateDiagnosisConfig,
} from './decision-config'
import { describe, expect, it } from 'vitest'

describe('diagnosis operations config', () => {
  it('默认配置可以同时作为 Mock 和真实模型适配配置', () => {
    expect(validateDiagnosisConfig(DEFAULT_DIAGNOSIS_CONFIG)).toEqual([])
    expect(DEFAULT_DIAGNOSIS_CONFIG.configVersion).toBe(DEFAULT_DIAGNOSIS_CONFIG_VERSION)
  })

  it('禁止打开具体剂量和化学建议', () => {
    const invalid = { ...DEFAULT_DIAGNOSIS_CONFIG, safety: { ...DEFAULT_DIAGNOSIS_CONFIG.safety, allowDosage: true } }
    expect(validateDiagnosisConfig(invalid)).toContain('allowDosage 必须永远为 false')
  })

  it('缺少风险等级时配置无效', () => {
    const invalid = { ...DEFAULT_DIAGNOSIS_CONFIG, riskLevels: { ...DEFAULT_DIAGNOSIS_CONFIG.riskLevels, HIGH: undefined } }
    expect(validateDiagnosisConfig(invalid)).toContain('缺少风险等级配置: HIGH')
  })

  it('高风险即使分数较高也必须人工复核', () => {
    const result = applyDiagnosisOperationsConfig(DEFAULT_DIAGNOSIS_CONFIG, {
      riskLevel: 'HIGH', confidence: 0.99, actions: [{ type: 'OBSERVE', title: '观察', description: '记录变化', safetyLevel: 'OBSERVATION' }], disclaimer: '辅助判断', safetyPassed: true,
    })
    expect(result.needExpertReview).toBe(true)
  })

  it('安全校验失败时只返回非化学复核动作', () => {
    const result = applyDiagnosisOperationsConfig(DEFAULT_DIAGNOSIS_CONFIG, {
      riskLevel: 'MEDIUM', confidence: 0.9, actions: [{ type: 'DO_NOW', title: '喷药', description: '每亩 30 毫升', safetyLevel: 'CHEMICAL_REVIEW' }], disclaimer: '原文', safetyPassed: false,
    })
    expect(result.needExpertReview).toBe(true)
    expect(result.actions[0]).toMatchObject({ type: 'EXPERT_REVIEW', safetyLevel: 'BIOSECURITY' })
    expect(result.actions[0].description).not.toMatch(/每亩|毫升/)
  })

  it('运营文案不能关闭 JEV 的执行和重新判断安全约束', () => {
    const invalid = { ...DEFAULT_DIAGNOSIS_CONFIG, jev: { ...DEFAULT_DIAGNOSIS_CONFIG.jev, requireTaskForExecution: false, reassessmentRequiresNewEvidence: false } }
    expect(validateDiagnosisConfig(invalid)).toEqual(expect.arrayContaining([
      'JEV 必须要求任务才能进入 EXECUTION',
      'JEV 必须要求新证据才能重新判断',
    ]))
  })

  it('非法配置会回退到安全默认配置', () => {
    const invalid = { ...DEFAULT_DIAGNOSIS_CONFIG, schemaVersion: 'bad' }
    const result = applyDiagnosisOperationsConfig(invalid, {
      riskLevel: 'LOW', confidence: 0.99, actions: [], disclaimer: '原文', safetyPassed: false,
    })
    expect(result.disclaimer).toContain('安全校验')
  })

  it('没有任务时不能进入 EXECUTION', () => {
    expect(validateJevTransition(DEFAULT_DIAGNOSIS_CONFIG, { from: 'JUDGMENT', to: 'EXECUTION' })).toEqual({ allowed: false, reasonCode: 'TASK_REQUIRED' })
    expect(validateJevTransition(DEFAULT_DIAGNOSIS_CONFIG, { from: 'JUDGMENT', to: 'EXECUTION', hasTask: true })).toEqual({ allowed: true })
  })

  it('REASSESSMENT 回到 JUDGMENT 必须有新证据', () => {
    expect(validateJevTransition(DEFAULT_DIAGNOSIS_CONFIG, { from: 'REASSESSMENT', to: 'JUDGMENT' })).toEqual({ allowed: false, reasonCode: 'NEW_EVIDENCE_REQUIRED' })
    expect(validateJevTransition(DEFAULT_DIAGNOSIS_CONFIG, { from: 'REASSESSMENT', to: 'JUDGMENT', hasNewEvidence: true })).toEqual({ allowed: true })
  })

  it('不允许跳过 JEV 阶段', () => {
    expect(validateJevTransition(DEFAULT_DIAGNOSIS_CONFIG, { from: 'JUDGMENT', to: 'VERIFICATION', hasTask: true })).toEqual({ allowed: false, reasonCode: 'TRANSITION_NOT_ALLOWED' })
  })
})

