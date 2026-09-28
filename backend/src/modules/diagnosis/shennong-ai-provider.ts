import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { FileService } from '../file/file.service';
import {
  DiagnosisAiInput,
  DiagnosisAiOutput,
  DiagnosisAiProvider,
  enforceDiagnosisSafety,
} from './ai-provider';

interface ShennongResponse {
  id?: string;
  model?: string;
  choices?: Array<{ message?: { content?: string | null } }>;
  error?: { message?: string; type?: string; code?: string };
}

type Problem = DiagnosisAiOutput['possibleProblems'][number];
type Action = DiagnosisAiOutput['actions'][number];

const PEST_TOOLS = [
  'pest_classify_grain_crop',
  'pest_classify_cash_crop',
  'pest_classify_fruit_vegetable',
  'pest_classify_other',
] as const;

const SYSTEM_PROMPT = `你是“农间诊”的农业病虫害辅助判断模块。请结合图片、作物、生长阶段和用户描述分析。
只输出一个合法 JSON 对象，不要使用 Markdown 代码块，也不要输出 JSON 之外的内容。结构必须为：
{
  "crop": "作物名称或待确认作物",
  "stage": "生长阶段或待确认",
  "decision": "result|ask_more|expert_review|rejected",
  "possibleProblems": [{"name":"疑似问题","confidence":0到1之间的小数,"riskLevel":"low|medium|high|critical","evidence":["至少两个可从图片或描述观察到的依据"],"lookalikes":["至少一个易混淆问题"]}],
  "actions": [{"title":"行动标题","description":"清楚、可执行且不包含未经核验的具体药剂剂量","priority":"now|today|follow_up"}],
  "avoidActions": ["应避免的操作"],
  "needExpertReview": true,
  "expertReviewReasons": ["LOW_CONFIDENCE|HIGH_RISK|AMBIGUOUS_CANDIDATES"],
  "needMoreImages": false,
  "followUpQuestions": [{"code":"RETAKE_DETAIL","prompt":"需要补拍什么","captureHint":"怎么拍"}],
  "disclaimer": "辅助判断声明"
}
  没有图片、无法可靠判断时 decision 返回 ask_more、possibleProblems 返回空数组、needMoreImages 返回 true，并说明需要补拍的部位。高风险、检疫性病害、低置信度或涉及用药时 needExpertReview 必须为 true。不得宣称图片结果是确诊，不得给出未经登记核验的具体农药剂量。`;

@Injectable()
export class ShennongAiProvider implements DiagnosisAiProvider {
  constructor(
    private readonly config: ConfigService,
    private readonly files: FileService,
  ) {}

  async analyze(input: DiagnosisAiInput): Promise<DiagnosisAiOutput> {
    const apiKey = this.config.get<string>('SHENNONG_API_KEY')?.trim();
    if (!apiKey) throw new Error('未配置 SHENNONG_API_KEY');

    const imageUrls = await Promise.all(
      input.images.slice(0, 3).map((image) => this.files.readImageAsDataUrl(image.objectKey)),
    );
    const context = [
      `作物：${input.cropName || '待确认'}`,
      `生长阶段：${input.growthStage || '待确认'}`,
      `症状描述：${input.description?.trim() || '用户未补充文字描述'}`,
      imageUrls.length ? `图片数量：${imageUrls.length}` : '没有图片，请仅根据文字判断并主动说明局限',
    ].join('\n');

    try {
      const baseUrl = this.config.get('SHENNONG_BASE_URL', 'https://api.agent-tech.cc/api/v1').replace(/\/$/, '');
      const proxyUrl = this.config.get('SHENNONG_HTTPS_PROXY') || process.env.HTTPS_PROXY || process.env.https_proxy;
      const requestBody = {
        model: this.config.get('SHENNONG_MODEL', 'sn'),
        stream: false,
        temperature: 0.1,
        ...(imageUrls.length ? { enabled_tools: this.toolsForCrop(input.cropName) } : {}),
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'text', text: context },
              ...imageUrls.map((url) => ({ type: 'image_url', image_url: { url } })),
            ],
          },
        ],
      };
      const response = await axios.post<ShennongResponse>(`${baseUrl}/chat/completions`, requestBody, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: Number(this.config.get('SHENNONG_TIMEOUT_MS', 60_000)),
        maxBodyLength: 30 * 1024 * 1024,
        ...(proxyUrl ? { httpsAgent: new HttpsProxyAgent(proxyUrl), proxy: false } : {}),
      });

      const payload = response.data;
      const content = payload.choices?.[0]?.message?.content;
      if (!content) throw new Error('神农 API 未返回诊断内容');
      return this.normalize(content, payload, input);
    } catch (error) {
      if (axios.isAxiosError<ShennongResponse>(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.error?.message || error.message;
        throw new Error(`神农 API 请求失败${status ? `（${status}）` : ''}：${message}`);
      }
      throw error;
    }
  }

  private toolsForCrop(cropName?: string | null): string[] {
    const crop = cropName || '';
    if (/水稻|稻|小麦|麦|玉米|高粱|薯|大豆|粮/.test(crop)) return ['pest_classify_grain_crop'];
    if (/棉|油菜|花生|麻|甘蔗|甜菜|烟草|茶|牧草|桑|橡胶|咖啡/.test(crop)) return ['pest_classify_cash_crop'];
    if (/果|瓜|番茄|西红柿|黄瓜|茄|椒|蔬菜/.test(crop)) return ['pest_classify_fruit_vegetable'];
    if (/杂草|地下害虫|鼠害/.test(crop)) return ['pest_classify_other'];
    return [...PEST_TOOLS];
  }

  private normalize(content: string, response: ShennongResponse, input: DiagnosisAiInput): DiagnosisAiOutput {
    let parsed: Record<string, unknown>;
    try {
      parsed = this.parseJson(content) as Record<string, unknown>;
    } catch {
      return enforceDiagnosisSafety({
        decision: 'ask_more',
        model: this.model(response),
        crop: input.cropName || '待确认作物',
        stage: input.growthStage || '待确认',
        possibleProblems: [],
        actions: [{
          title: '请补充图片并联系农技人员复核',
          description: '模型返回内容格式异常，当前不展示未经结构化校验的病害结论。',
          priority: 'now',
        }],
        avoidActions: ['不要根据本次异常返回内容自行购药或用药'],
        followUpQuestions: [{
          code: 'RETAKE_DETAIL',
          prompt: '请补拍异常部位近照、叶片背面和整株照片。',
          captureHint: '让异常部位清晰且占画面中央。',
        }],
        needExpertReview: true,
        expertReviewReasons: ['INVALID_MODEL_OUTPUT'],
        needMoreImages: true,
        disclaimer: '本次模型返回内容未通过结构化校验，仅保留为补图和人工复核提示。',
        safety: { passed: true, violationCodes: [] },
      });
    }
    const problems = Array.isArray(parsed.possibleProblems) ? parsed.possibleProblems : [];
    const actions = Array.isArray(parsed.actions) ? parsed.actions : [];
    const avoidActions = Array.isArray(parsed.avoidActions) ? parsed.avoidActions : [];

    return enforceDiagnosisSafety({
      model: {
        ...this.model(response),
      },
      crop: this.text(parsed.crop, input.cropName || '待确认作物'),
      stage: this.text(parsed.stage, input.growthStage || '待确认'),
      possibleProblems: problems.slice(0, 3).map((item) => this.problem(item)),
      actions: actions.slice(0, 5).map((item) => this.action(item)),
      avoidActions: avoidActions.slice(0, 5).map((item) => this.text(item, '')).filter(Boolean),
      decision: this.decision(parsed, problems),
      needExpertReview: parsed.needExpertReview !== false,
      expertReviewReasons: this.stringArray(parsed.expertReviewReasons),
      needMoreImages: parsed.needMoreImages === true,
      followUpQuestions: this.followUpQuestions(parsed.followUpQuestions),
      safety: { passed: true, violationCodes: [] },
      disclaimer: this.text(
        parsed.disclaimer,
        '以上内容为图片与描述生成的辅助判断，不代表确诊；涉及用药请核对有效登记和产品标签。',
      ),
    });
  }

  private model(response: ShennongResponse) {
    return {
      name: response.model || 'sn',
      version: this.config.get('SHENNONG_MODEL_VERSION', 'sn'),
      traceId: response.id || `shennong_${Date.now()}`,
      knowledgeVersion: 'agent-tech-pest-tools-v1',
      promptVersion: 'diagnosis-prompt-1.0.0',
      policyVersion: '1.0.0-mvp',
    };
  }

  private problem(value: unknown): Problem {
    const item = this.record(value);
    const confidence = Number(item.confidence);
    const risk = this.text(item.riskLevel, 'medium').toLowerCase();
    const riskLevel: Problem['riskLevel'] = ['low', 'medium', 'high', 'critical'].includes(risk)
      ? (risk as Problem['riskLevel'])
      : 'medium';
    return {
      name: this.text(item.name, '待进一步确认的问题'),
      confidence: Number.isFinite(confidence) ? Math.max(0, Math.min(1, confidence)) : 0,
      riskLevel,
      evidence: (Array.isArray(item.evidence) ? item.evidence : [])
        .slice(0, 5)
        .map((entry) => this.text(entry, ''))
        .filter(Boolean),
      lookalikes: (Array.isArray(item.lookalikes) ? item.lookalikes : [])
        .slice(0, 5)
        .map((entry) => this.text(entry, ''))
        .filter(Boolean),
    };
  }

  private decision(value: Record<string, unknown>, problems: unknown[]): DiagnosisAiOutput['decision'] {
    const parsed = this.text(value.decision, '').toLowerCase();
    if (['result', 'ask_more', 'expert_review', 'rejected'].includes(parsed)) return parsed as DiagnosisAiOutput['decision'];
    if (value.needMoreImages === true || !problems.length) return 'ask_more';
    return value.needExpertReview === false ? 'result' : 'expert_review';
  }

  private stringArray(value: unknown): string[] {
    return (Array.isArray(value) ? value : []).map((item) => this.text(item, '')).filter(Boolean).slice(0, 8);
  }

  private followUpQuestions(value: unknown): DiagnosisAiOutput['followUpQuestions'] {
    return (Array.isArray(value) ? value : []).slice(0, 5).map((item) => {
      const record = this.record(item);
      return {
        code: this.text(record.code, 'RETAKE_DETAIL'),
        prompt: this.text(record.prompt, '请补拍异常部位近照。'),
        captureHint: this.text(record.captureHint, '对焦异常部位，补拍同一部位正反面。'),
      };
    });
  }

  private action(value: unknown): Action {
    const item = this.record(value);
    const priority = this.text(item.priority, 'today').toLowerCase();
    return {
      title: this.text(item.title, '联系当地农技人员复核'),
      description: this.text(item.description, '结合田间情况确认后再采取处理措施。'),
      priority: ['now', 'today', 'follow_up'].includes(priority) ? (priority as Action['priority']) : 'today',
    };
  }

  private parseJson(content: string): unknown {
    const cleaned = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    try {
      return JSON.parse(cleaned);
    } catch {
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start < 0 || end <= start) throw new Error('神农 API 返回内容不是有效 JSON');
      return JSON.parse(cleaned.slice(start, end + 1));
    }
  }

  private record(value: unknown): Record<string, unknown> {
    return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
  }

  private text(value: unknown, fallback: string) {
    return typeof value === 'string' && value.trim() ? value.trim() : fallback;
  }
}
