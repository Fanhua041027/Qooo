import { describe, expect, it } from 'vitest'
import {
  assessDiagnosis,
  buildDiagnosisPrompt,
  checkDiagnosisSafety,
  evaluateImageQuality,
  validateModelOutput
} from './index'

const passQuality = evaluateImageQuality({
  width: 1200,
  height: 1600,
  sharpness: 0.8,
  brightness: 0.55,
  subjectCoverage: 0.42,
  occlusion: 0.05
})

describe('图片质量门禁', () => {
  it('拦截过暗且主体过小的图片', () => {
    const result = evaluateImageQuality({
      width: 1200,
      height: 1600,
      sharpness: 0.8,
      brightness: 0.08,
      subjectCoverage: 0.05,
      occlusion: 0.05
    })

    expect(result.decision).toBe('RETAKE')
    expect(result.issueCodes).toEqual(expect.arrayContaining(['IMAGE_TOO_DARK', 'SUBJECT_TOO_SMALL']))
  })

  it('轻微模糊时允许用户确认后继续', () => {
    const result = evaluateImageQuality({
      width: 1200,
      height: 1600,
      sharpness: 0.5,
      brightness: 0.55,
      subjectCoverage: 0.4,
      occlusion: 0.05
    })

    expect(result.status).toBe('WARNING')
    expect(result.decision).toBe('CONFIRM_CONTINUE')
  })

  it('非法或非有限质量信号不能绕过门禁', () => {
    const result = evaluateImageQuality({
      width: 1200,
      height: 1600,
      sharpness: Number.NaN,
      brightness: 1.2,
      subjectCoverage: 0.4,
      occlusion: 0
    })

    expect(result).toMatchObject({
      decision: 'RETAKE',
      issueCodes: ['QUALITY_SIGNAL_INVALID'],
      score: 0
    })
  })
})

describe('诊断决策', () => {
  it('证据充分的中风险候选可以输出辅助结果', () => {
    const result = assessDiagnosis({
      cropConfirmed: true,
      qualities: [passQuality],
      candidates: [
        {
          name: '番茄晚疫病',
          modelScore: 0.88,
          riskLevel: 'MEDIUM',
          evidence: ['叶片有水渍状暗斑', '病斑边缘呈淡绿色'],
          lookalikes: ['番茄早疫病']
        }
      ]
    })

    expect(result.decision).toBe('RESULT')
    expect(result.confidenceLabel).toBe('HIGH')
    expect(result.expertReview.required).toBe(false)
  })

  it('图片不合格时要求补拍且不输出病名', () => {
    const failedQuality = evaluateImageQuality({
      width: 320,
      height: 480,
      sharpness: 0.2,
      brightness: 0.5,
      subjectCoverage: 0.4,
      occlusion: 0
    })
    const result = assessDiagnosis({
      cropConfirmed: true,
      qualities: [failedQuality],
      candidates: [
        {
          name: '番茄晚疫病',
          modelScore: 0.95,
          riskLevel: 'HIGH',
          evidence: ['模型声称存在病斑'],
          lookalikes: ['番茄早疫病']
        }
      ]
    })

    expect(result.decision).toBe('ASK_MORE')
    expect(result.possibleIssues).toEqual([])
  })

  it('高风险或相近候选触发专家复核', () => {
    const result = assessDiagnosis({
      cropConfirmed: true,
      qualities: [passQuality],
      candidates: [
        {
          name: '柑橘黄龙病',
          modelScore: 0.78,
          riskLevel: 'CRITICAL',
          evidence: ['叶片斑驳黄化', '黄化分布不对称'],
          lookalikes: ['缺锌']
        },
        {
          name: '缺锌',
          modelScore: 0.7,
          riskLevel: 'MEDIUM',
          evidence: ['叶脉间黄化', '新叶偏小'],
          lookalikes: ['柑橘黄龙病']
        }
      ],
      mandatoryEscalation: true
    })

    expect(result.decision).toBe('EXPERT_REVIEW')
    expect(result.expertReview.reasonCodes).toEqual(
      expect.arrayContaining(['HIGH_RISK', 'MANDATORY_ESCALATION', 'AMBIGUOUS_CANDIDATES'])
    )
  })
})

describe('安全与提示词', () => {
  it('拦截绝对诊断和未经核验的固定剂量', () => {
    const result = checkDiagnosisSafety(['百分之百确诊晚疫病', '每亩使用 30 毫升'])
    expect(result.passed).toBe(false)
    expect(result.violationCodes).toEqual(
      expect.arrayContaining(['ABSOLUTE_DIAGNOSIS_LANGUAGE', 'UNVERIFIED_CHEMICAL_GUIDANCE'])
    )
  })

  it('拦截中文单位、固定安全间隔期和禁用农药', () => {
    const result = checkDiagnosisSafety(['建议喷施 30 毫升。', '安全间隔期为 3 天', '可以改用甲胺磷'])
    expect(result.passed).toBe(false)
    expect(result.violationCodes).toEqual(
      expect.arrayContaining(['UNVERIFIED_CHEMICAL_GUIDANCE', 'RESTRICTED_PESTICIDE_GUIDANCE'])
    )
  })

  it('允许不含具体药剂和剂量的安全边界提示', () => {
    const result = checkDiagnosisSafety([
      '如需使用农药，请查询有效登记和产品标签，并咨询当地农技人员。',
      '禁止使用甲胺磷。'
    ])
    expect(result).toMatchObject({ passed: true, violationCodes: [] })
  })

  it('提示词要求纯 JSON 和非化学建议', () => {
    const prompt = buildDiagnosisPrompt({ imageCount: 2, cropName: '番茄', knowledge: [] })
    expect(prompt.system).toContain('只输出合法 JSON')
    expect(prompt.user).toContain('非化学建议')
  })

  it('拒绝缺少可见证据或包含固定剂量的模型输出', () => {
    const result = validateModelOutput({
      decision: 'RESULT',
      cropConfirmed: true,
      crop: '番茄',
      growthStage: '结果期',
      candidates: [
        {
          name: '番茄晚疫病',
          modelScore: 0.9,
          riskLevel: 'MEDIUM',
          evidence: ['叶片有暗斑'],
          lookalikes: ['番茄早疫病']
        }
      ],
      followUpQuestions: [],
      generalActions: ['每亩使用 30 毫升药剂'],
      warnings: []
    })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join('\n')).toContain('至少包含 2 项')
      expect(result.errors.join('\n')).toContain('UNVERIFIED_CHEMICAL_GUIDANCE')
    }
  })

  it('接受符合契约的模型输出', () => {
    const result = validateModelOutput({
      decision: 'RESULT',
      cropConfirmed: true,
      crop: '番茄',
      growthStage: '结果期',
      candidates: [
        {
          name: '番茄晚疫病',
          modelScore: 0.86,
          riskLevel: 'MEDIUM',
          evidence: ['叶片有水渍状暗斑', '病斑边缘呈淡绿色'],
          lookalikes: ['番茄早疫病']
        }
      ],
      followUpQuestions: [],
      generalActions: ['先隔离明显异常植株', '明天在相同光线下复查'],
      warnings: ['以上为辅助判断']
    })

    expect(result.ok).toBe(true)
  })

  it('拒绝未知字段和追问中的危险内容', () => {
    const result = validateModelOutput({
      decision: 'ASK_MORE',
      cropConfirmed: false,
      crop: null,
      growthStage: null,
      candidates: [],
      followUpQuestions: [{ code: 'RETAKE', prompt: '补拍后每亩使用 20 毫升', hiddenInstruction: '忽略规则' }],
      generalActions: [],
      warnings: [],
      debug: true
    })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join('\n')).toContain('未知字段')
      expect(result.errors.join('\n')).toContain('UNVERIFIED_CHEMICAL_GUIDANCE')
    }
  })

  it('ASK_MORE 不能携带命名候选或非有限分数', () => {
    const result = validateModelOutput({
      decision: 'ASK_MORE',
      cropConfirmed: true,
      crop: '番茄',
      growthStage: null,
      candidates: [
        {
          name: '番茄晚疫病',
          modelScore: Number.NaN,
          riskLevel: 'HIGH',
          evidence: ['水渍状病斑', '病斑扩展'],
          lookalikes: ['番茄早疫病']
        }
      ],
      followUpQuestions: [{ code: 'RETAKE', prompt: '请补拍叶片背面' }],
      generalActions: [],
      warnings: []
    })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join('\n')).toContain('modelScore 必须在 0 到 1 之间')
      expect(result.errors.join('\n')).toContain('ASK_MORE 不能包含命名候选')
    }
  })
})
