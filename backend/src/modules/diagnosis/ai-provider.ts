import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

export const DIAGNOSIS_AI_PROVIDER = Symbol('DIAGNOSIS_AI_PROVIDER');
export type AiDecision = 'result' | 'ask_more' | 'expert_review' | 'rejected';
export type AiRiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type AiActionType = 'DO_NOW' | 'OBSERVE' | 'AVOID' | 'EXPERT_REVIEW';
export type AiSafetyLevel = 'OBSERVATION' | 'BIOSECURITY' | 'CHEMICAL_REVIEW';
export const DIAGNOSIS_CONFIG_VERSION = 'ops-1.0.0';
const REVIEW_CONFIDENCE_BY_RISK: Record<AiRiskLevel, number> = { low: 0.55, medium: 0.65, high: 0.75, critical: 0.85 };

export interface DiagnosisAiInput {
  cropName?: string | null;
  growthStage?: string | null;
  description?: string | null;
  images: Array<{ objectKey: string; width?: number | null; height?: number | null; quality: unknown }>;
}

export interface DiagnosisAiOutput {
  decision: AiDecision;
  model: {
    name: string;
    version: string;
    traceId: string;
    knowledgeVersion: string;
    promptVersion?: string;
    policyVersion?: string;
    configVersion?: string;
  };
  crop: string;
  stage: string;
  possibleProblems: Array<{
    name: string;
    confidence: number;
    riskLevel: AiRiskLevel;
    evidence: string[];
    lookalikes?: string[];
  }>;
  actions: Array<{ type?: AiActionType; title: string; description: string; priority: 'now' | 'today' | 'follow_up'; dueAt?: string; safetyLevel?: AiSafetyLevel }>;
  avoidActions: string[];
  followUpQuestions: Array<{ code: string; prompt: string; captureHint?: string }>;
  needExpertReview: boolean;
  expertReviewReasons: string[];
  needMoreImages: boolean;
  disclaimer: string;
  safety?: { passed: boolean; violationCodes: string[] };
}

export interface DiagnosisAiProvider {
  analyze(input: DiagnosisAiInput): Promise<DiagnosisAiOutput>;
}

type MockProfile = {
  problem: string;
  score: number;
  riskLevel: AiRiskLevel;
  evidence: string[];
  lookalikes: string[];
  actions: DiagnosisAiOutput['actions'];
  avoidActions: string[];
  mandatoryEscalation?: boolean;
};

const profiles: Record<string, MockProfile> = {
  番茄: {
    problem: '疑似晚疫病', score: 0.82, riskLevel: 'high',
    evidence: ['叶片出现水渍状暗绿至褐色病斑', '潮湿条件下病斑可能快速扩展'],
    lookalikes: ['番茄早疫病', '细菌性斑点病'],
    actions: [
      { title: '隔离并标记重病株区域', description: '减少病区与健康区之间的湿叶接触。', priority: 'now' },
      { title: '补拍叶片背面和茎部', description: '同一病斑正反面各拍一张，并拍摄茎部。', priority: 'today' },
    ],
    avoidActions: ['不要在叶片潮湿时整枝，也不要根据图片自行混配或加量'],
  },
  黄瓜: {
    problem: '疑似霜霉病', score: 0.81, riskLevel: 'high',
    evidence: ['叶面出现受叶脉限制的多角形黄斑', '高湿条件下叶背可能出现灰紫色霉层'],
    lookalikes: ['黄瓜角斑病', '缺镁'],
    actions: [
      { title: '马上通风降湿', description: '缩短叶面带水时间，停止傍晚叶面喷水。', priority: 'now' },
      { title: '补拍同一叶片正反面', description: '重点拍清多角形病斑和叶背。', priority: 'today' },
    ],
    avoidActions: ['不要只根据叶面黄斑自行用药'],
  },
  水稻: {
    problem: '疑似稻瘟病', score: 0.8, riskLevel: 'high',
    evidence: ['叶片可能出现梭形、灰心褐边病斑', '抽穗期需要同步检查穗颈是否变褐'],
    lookalikes: ['水稻胡麻叶斑病', '水稻细菌性条斑病'],
    actions: [
      { title: '调查田间发生中心', description: '记录新病斑是否正向相邻稻株扩展。', priority: 'now' },
      { title: '停止偏施氮肥', description: '保持合理水层和群体通风。', priority: 'today' },
    ],
    avoidActions: ['不要把所有白穗都直接判为穗颈瘟'],
  },
  玉米: {
    problem: '疑似玉米大斑病', score: 0.82, riskLevel: 'high',
    evidence: ['叶片可能出现长梭形或雪茄形大斑', '需要确认病斑是否已经到达穗位叶'],
    lookalikes: ['玉米灰斑病', '玉米小斑病'],
    actions: [
      { title: '拍完整叶片和穗位叶', description: '保留病斑长度、形状和上下叶位信息。', priority: 'now' },
      { title: '记录病斑上移速度', description: '连续观察上位叶是否出现新病斑。', priority: 'follow_up' },
    ],
    avoidActions: ['不要把被叶脉限制的长方形灰斑直接当作大斑病'],
  },
  柑橘: {
    problem: '疑似黄龙病', score: 0.7, riskLevel: 'critical',
    evidence: ['叶片可能存在左右不对称的斑驳黄化', '需要同步检查异常果实和柑橘木虱'],
    lookalikes: ['柑橘缺锌', '根系受损引起的黄化'],
    actions: [
      { title: '标记疑似植株', description: '停止从该植株剪取接穗或调运苗木。', priority: 'now' },
      { title: '联系当地农技或植保部门', description: '图片不能确诊黄龙病，需要按当地要求检测。', priority: 'today' },
    ],
    avoidActions: ['不要宣称喷药或施肥可以治愈黄龙病'],
    mandatoryEscalation: true,
  },
};

const unsafePatterns = [
  { code: 'ABSOLUTE_DIAGNOSIS_LANGUAGE', pattern: /百分之百确诊|肯定是|一定能治好|无任何风险/u },
  { code: 'UNVERIFIED_CHEMICAL_GUIDANCE', pattern: /(?:亩用|每亩(?:使用|用)?|稀释)\s*\d+|\d+(?:\.\d+)?\s*(?:倍液|克|毫升|ml|mL|g)(?=\s|[，。；、,;]|$)|安全间隔期(?:为|是|需等待)?\s*\d+/u },
] as const;
const asciiChemicalPattern = /(?:每亩|每公顷|稀释|安全间隔|\b\d+(?:\.\d+)?\s*(?:ml|mL|毫升|g|克|kg|公斤|倍)\b)/iu;
const restrictedPesticidePattern = /百草枯|甲胺磷|甲基对硫磷|对硫磷|久效磷|磷胺|六六六|滴滴涕|毒杀芬|杀虫脒|氟乙酰胺|毒鼠强/u;
const prohibitionBeforePesticidePattern = /(?:不要|禁止|严禁|不得|不可|停止|停用)(?:使用|用)?\s*$/u;

export function enforceDiagnosisSafety(output: DiagnosisAiOutput): DiagnosisAiOutput {
  const text = [
    ...output.possibleProblems.flatMap((item) => [item.name, ...item.evidence, ...(item.lookalikes || [])]),
    ...output.actions.flatMap((item) => [item.title, item.description]),
    ...output.avoidActions,
    ...(output.followUpQuestions || []).flatMap((item) => [item.prompt, item.captureHint || '']),
    output.disclaimer,
  ].join('\n');
  const violationCodes: string[] = unsafePatterns.filter(({ pattern }) => pattern.test(text)).map(({ code }) => code);
  if (asciiChemicalPattern.test(text) && !violationCodes.includes('UNVERIFIED_CHEMICAL_GUIDANCE')) violationCodes.push('UNVERIFIED_CHEMICAL_GUIDANCE');
  const recommendsRestrictedPesticide = text
    .split(/[\n。！？；]/u)
    .some((sentence) => {
      const match = sentence.match(restrictedPesticidePattern);
      if (!match || match.index === undefined) return false;
      const prefix = sentence.slice(0, match.index).trim();
      return !prohibitionBeforePesticidePattern.test(prefix);
    });
  if (recommendsRestrictedPesticide) violationCodes.push('RESTRICTED_PESTICIDE_GUIDANCE');
  const normalizedActions = output.actions.map((action) => ({
    ...action,
    type: action.type || (action.title.includes('不') || action.title.includes('避免') ? 'AVOID' : action.priority === 'now' ? 'DO_NOW' : 'OBSERVE'),
    safetyLevel: action.safetyLevel || (action.title.includes('隔离') || action.title.includes('复核') ? 'BIOSECURITY' : 'OBSERVATION'),
  }));
  // 任一候选命中高风险或低于对应置信度阈值都必须升级，不能只看排序第一项。
  const requiresConfiguredReview = output.possibleProblems.some((problem) => (
    problem.riskLevel === 'high' ||
    problem.riskLevel === 'critical' ||
    !Number.isFinite(problem.confidence) ||
    problem.confidence < REVIEW_CONFIDENCE_BY_RISK[problem.riskLevel]
  ));
  if (!violationCodes.length) {
    return {
      ...output,
      model: { ...output.model, configVersion: output.model.configVersion || DIAGNOSIS_CONFIG_VERSION },
      actions: normalizedActions,
      decision: requiresConfiguredReview ? 'expert_review' : output.decision,
      needExpertReview: output.needExpertReview || requiresConfiguredReview,
      expertReviewReasons: requiresConfiguredReview
        ? [...new Set([...(output.expertReviewReasons || []), 'OPS_CONFIG_REVIEW_THRESHOLD'])]
        : output.expertReviewReasons,
      safety: { passed: true, violationCodes: [] },
    };
  }
  return {
    ...output,
    model: { ...output.model, configVersion: output.model.configVersion || DIAGNOSIS_CONFIG_VERSION },
    decision: 'expert_review',
    actions: [{ type: 'EXPERT_REVIEW', title: '请农技人员复核后再处理', description: '模型原建议未通过农业安全检查，已隐藏具体内容。', priority: 'now', safetyLevel: 'BIOSECURITY' }],
    avoidActions: ['不要根据本次模型原文自行购药、混配、加量或缩短采收间隔'],
    needExpertReview: true,
    expertReviewReasons: [...new Set([...(output.expertReviewReasons || []), 'SAFETY_FILTER_FAILED'])],
    disclaimer: '本次模型建议未通过农业安全检查。涉及用药请查询有效登记和产品标签，或咨询当地农技人员。',
    safety: { passed: false, violationCodes },
  };
}

@Injectable()
export class MockAiProvider implements DiagnosisAiProvider {
  constructor(private readonly config: ConfigService) {}

  async analyze(input: DiagnosisAiInput): Promise<DiagnosisAiOutput> {
    await new Promise((resolve) => setTimeout(resolve, Number(this.config.get('MOCK_AI_DELAY_MS', 800))));
    if (input.description?.includes('模拟失败')) throw new Error('模拟 AI 服务失败');
    if (!input.images.length) return this.moreImages(input, '缺少作物异常图片，当前无法形成可靠的辅助判断。');

    const failed = input.images.some((image) => {
      const status = (image.quality as { status?: string } | null)?.status?.toUpperCase();
      const shortEdge = Math.min(image.width || Number.POSITIVE_INFINITY, image.height || Number.POSITIVE_INFINITY);
      return status === 'FAILED' || status === 'FAIL' || shortEdge < 640;
    });
    if (failed) return this.moreImages(input, '图片质量不足，当前无法形成可靠的辅助判断。');

    const profile = input.cropName ? profiles[input.cropName] : undefined;
    if (!profile) return this.moreImages(input, '作物信息不足，当前无法形成可靠的辅助判断。');
    const warning = input.images.some((image) => (image.quality as { status?: string } | null)?.status?.toUpperCase() === 'WARNING');
    const needReview = profile.riskLevel === 'high' || profile.riskLevel === 'critical' || Boolean(profile.mandatoryEscalation);

    return enforceDiagnosisSafety({
      decision: needReview ? 'expert_review' : 'result',
      model: this.model(),
      crop: input.cropName || '待确认作物',
      stage: input.growthStage || '待确认',
      possibleProblems: [{
        name: profile.problem,
        confidence: warning ? Math.min(profile.score, 0.75) : profile.score,
        riskLevel: profile.riskLevel,
        evidence: profile.evidence,
        lookalikes: profile.lookalikes,
      }],
      actions: profile.actions,
      avoidActions: profile.avoidActions,
      followUpQuestions: warning ? [{ code: 'RETAKE_DETAIL', prompt: '请补拍一张更清晰的异常部位近照。', captureHint: '在自然光下对焦异常部位。' }] : [],
      needExpertReview: needReview,
      expertReviewReasons: needReview ? ['HIGH_RISK', ...(profile.mandatoryEscalation ? ['MANDATORY_ESCALATION'] : [])] : [],
      needMoreImages: false,
      disclaimer: '以上内容为基于演示知识库的辅助判断，不代表确诊。涉及用药必须查询有效登记和产品标签。',
      safety: { passed: true, violationCodes: [] },
    });
  }

  private moreImages(input: DiagnosisAiInput, disclaimer: string): DiagnosisAiOutput {
    return enforceDiagnosisSafety({
      decision: 'ask_more',
      model: this.model(),
      crop: input.cropName || '待确认作物',
      stage: input.growthStage || '待确认',
      possibleProblems: [],
      actions: [{ title: '重新拍摄异常部位', description: '请在自然光下补拍叶片正面、背面和整株照片。', priority: 'now' }],
      avoidActions: ['暂时不要根据本次图片自行用药'],
      followUpQuestions: [{ code: 'RETAKE_DETAIL', prompt: '请补拍一张异常部位近照。', captureHint: '对焦异常部位，并让它占画面三分之一以上。' }],
      needExpertReview: false,
      expertReviewReasons: [],
      needMoreImages: true,
      disclaimer,
      safety: { passed: true, violationCodes: [] },
    });
  }

  private model() {
    return {
      name: 'mock-crop-disease', version: '1.2.0', traceId: `ai_${randomUUID()}`,
      knowledgeVersion: '1.0.0-mvp', promptVersion: 'diagnosis-prompt-1.0.0', policyVersion: '1.0.0-mvp', configVersion: DIAGNOSIS_CONFIG_VERSION,
    };
  }
}
