import { ConfigService } from '@nestjs/config';
import { enforceDiagnosisSafety, MockAiProvider, type DiagnosisAiOutput } from './ai-provider';

describe('MockAiProvider', () => {
  const provider = new MockAiProvider(new ConfigService({ MOCK_AI_DELAY_MS: 0 }));

  it('图片质量为 FAILED 时要求重拍且不返回病名', async () => {
    const result = await provider.analyze({
      cropName: '番茄',
      images: [{ objectKey: 'demo.jpg', quality: { status: 'FAILED' } }],
    });

    expect(result.needMoreImages).toBe(true);
    expect(result.possibleProblems).toEqual([]);
  });

  it('没有图片时不能仅凭作物名返回病害', async () => {
    const result = await provider.analyze({ cropName: '番茄', description: '叶片有斑', images: [] });

    expect(result).toMatchObject({ decision: 'ask_more', needMoreImages: true });
    expect(result.possibleProblems).toEqual([]);
  });

  it('客户端标记 PASS 但图片短边不足时仍要求重拍', async () => {
    const result = await provider.analyze({
      cropName: '番茄',
      images: [{ objectKey: 'small.jpg', width: 480, height: 800, quality: { status: 'PASS' } }],
    });

    expect(result).toMatchObject({ decision: 'ask_more', needMoreImages: true });
    expect(result.possibleProblems).toEqual([]);
  });

  it('根据作物返回对应知识条目', async () => {
    const result = await provider.analyze({
      cropName: '黄瓜',
      images: [{ objectKey: 'demo.jpg', quality: { status: 'PASS' } }],
    });

    expect(result.crop).toBe('黄瓜');
    expect(result.possibleProblems[0]).toMatchObject({ name: '疑似霜霉病', riskLevel: 'high' });
    expect(result.possibleProblems[0]!.lookalikes!.length).toBeGreaterThan(0);
    expect(result).toMatchObject({ decision: 'expert_review', needExpertReview: true });
    expect(result.expertReviewReasons).toContain('HIGH_RISK');
    expect(result.model.knowledgeVersion).toBe('1.0.0-mvp');
    expect(result.model).toMatchObject({
      version: '1.2.0',
      promptVersion: 'diagnosis-prompt-1.0.0',
      policyVersion: '1.0.0-mvp',
    });
    expect(result.safety).toEqual({ passed: true, violationCodes: [] });
  });

  it('图片质量警告会限制候选分数并给出补拍问题', async () => {
    const result = await provider.analyze({
      cropName: '番茄',
      images: [{ objectKey: 'warning.jpg', width: 1200, height: 1600, quality: { status: 'WARNING' } }],
    });

    expect(result.possibleProblems[0].confidence).toBeLessThanOrEqual(0.75);
    expect(result.followUpQuestions).toEqual(expect.arrayContaining([expect.objectContaining({ code: 'RETAKE_DETAIL' })]));
  });

  it('不支持的作物不应回退成番茄晚疫病', async () => {
    const result = await provider.analyze({
      cropName: '苹果',
      images: [{ objectKey: 'demo.jpg', quality: { status: 'PASS' } }],
    });

    expect(result.needMoreImages).toBe(true);
    expect(result.possibleProblems).toEqual([]);
  });

  it('隐藏包含固定剂量和禁用农药的模型建议', () => {
    const result = enforceDiagnosisSafety({
      model: { name: 'unsafe-model', version: '1', traceId: 'trace', knowledgeVersion: 'test' },
      crop: '番茄',
      stage: '结果期',
      possibleProblems: [{ name: '疑似晚疫病', confidence: 0.8, riskLevel: 'high', evidence: ['叶片有暗斑'] }],
      actions: [{ title: '立即处理', description: '每亩使用 30 毫升甲胺磷', priority: 'now' }],
      avoidActions: [],
      needExpertReview: false,
      needMoreImages: false,
      disclaimer: '辅助判断。',
    } as unknown as DiagnosisAiOutput);

    expect(result.safety).toMatchObject({ passed: false });
    expect(result.safety?.violationCodes).toEqual(
      expect.arrayContaining(['UNVERIFIED_CHEMICAL_GUIDANCE', 'RESTRICTED_PESTICIDE_GUIDANCE']),
    );
    expect(result.actions[0].description).toContain('已隐藏');
    expect(result.needExpertReview).toBe(true);
  });

  it('允许明确禁止禁限用农药的安全提示', () => {
    const result = enforceDiagnosisSafety({
      decision: 'expert_review',
      model: { name: 'safe-model', version: '1', traceId: 'trace', knowledgeVersion: 'test' },
      crop: '番茄',
      stage: '结果期',
      possibleProblems: [],
      actions: [{ title: '联系农技人员', description: '不要使用甲胺磷，请核对有效登记和产品标签。', priority: 'now' }],
      avoidActions: [],
      followUpQuestions: [],
      needExpertReview: true,
      expertReviewReasons: ['SAFETY_NOTICE'],
      needMoreImages: false,
      disclaimer: '辅助判断。',
    });

    expect(result.safety).toEqual({ passed: true, violationCodes: [] });
  });

  it('混合句中“建议使用”优先按危险建议拦截', () => {
    const result = enforceDiagnosisSafety({
      decision: 'result',
      model: { name: 'unsafe-model', version: '1', traceId: 'trace', knowledgeVersion: 'test' },
      crop: '番茄',
      stage: '结果期',
      possibleProblems: [],
      actions: [{ title: '处理', description: '建议使用甲胺磷，禁止在采收前使用。', priority: 'now' }],
      avoidActions: [],
      followUpQuestions: [],
      needExpertReview: false,
      expertReviewReasons: [],
      needMoreImages: false,
      disclaimer: '辅助判断。',
    });

    expect(result.safety?.passed).toBe(false);
    expect(result.safety?.violationCodes).toContain('RESTRICTED_PESTICIDE_GUIDANCE');
  });

  it('追问中的固定剂量也必须被隐藏', () => {
    const result = enforceDiagnosisSafety({
      decision: 'ask_more',
      model: { name: 'unsafe-model', version: '1', traceId: 'trace', knowledgeVersion: 'test' },
      crop: '番茄',
      stage: '结果期',
      possibleProblems: [],
      actions: [{ title: '补拍图片', description: '请补拍叶片背面。', priority: 'now' }],
      avoidActions: [],
      followUpQuestions: [{ code: 'RETAKE_DETAIL', prompt: '补拍后每亩使用 20 毫升', captureHint: '近景' }],
      needExpertReview: false,
      expertReviewReasons: [],
      needMoreImages: true,
      disclaimer: '辅助判断。',
    });

    expect(result.safety?.passed).toBe(false);
    expect(result.needExpertReview).toBe(true);
  });

  it('任一候选问题达到高风险都必须触发专家复核', () => {
    const result = enforceDiagnosisSafety({
      decision: 'result',
      model: { name: 'model', version: '1', traceId: 'trace', knowledgeVersion: 'test' },
      crop: '番茄',
      stage: '结果期',
      possibleProblems: [
        { name: '低风险候选', confidence: 0.95, riskLevel: 'low', evidence: ['证据一'] },
        { name: '严重候选', confidence: 0.9, riskLevel: 'critical', evidence: ['证据二'] },
      ],
      actions: [{ title: '继续观察', description: '记录变化', priority: 'today' }],
      avoidActions: [],
      followUpQuestions: [],
      needExpertReview: false,
      expertReviewReasons: [],
      needMoreImages: false,
      disclaimer: '辅助判断。',
    });

    expect(result.decision).toBe('expert_review');
    expect(result.needExpertReview).toBe(true);
    expect(result.expertReviewReasons).toContain('OPS_CONFIG_REVIEW_THRESHOLD');
  });
});
