import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { FileService } from '../file/file.service';
import { ShennongAiProvider } from './shennong-ai-provider';

describe('ShennongAiProvider', () => {
  afterEach(() => jest.restoreAllMocks());

  it('发送图片并把神农响应规范化为诊断结果', async () => {
    const files = {
      readImageAsDataUrl: jest.fn().mockResolvedValue('data:image/jpeg;base64,aW1hZ2U='),
    } as unknown as FileService;
    const provider = new ShennongAiProvider(
      new ConfigService({
        SHENNONG_API_KEY: 'test-key',
        SHENNONG_BASE_URL: 'https://example.test/api/v1',
        SHENNONG_TIMEOUT_MS: 1000,
      }),
      files,
    );
    const postMock = jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        id: 'chatcmpl-test',
        model: 'sn',
        choices: [{
          message: {
            content: JSON.stringify({
              crop: '番茄',
              stage: '结果期',
              possibleProblems: [{
                name: '疑似晚疫病',
                confidence: 0.83,
                riskLevel: 'high',
                evidence: ['叶片有水渍状暗斑'],
              }],
              actions: [{ title: '补拍叶背', description: '在自然光下补拍。', priority: 'today' }],
              avoidActions: ['不要自行加量用药'],
              needExpertReview: true,
              needMoreImages: false,
              disclaimer: '仅供辅助判断。',
            }),
          },
        }],
      },
    });

    const result = await provider.analyze({
      cropName: '番茄',
      growthStage: '结果期',
      images: [{ objectKey: 'users/demo/leaf.jpg', quality: { status: 'PASS' } }],
    });

    expect(files.readImageAsDataUrl).toHaveBeenCalledWith('users/demo/leaf.jpg');
    const body = postMock.mock.calls[0][1] as Record<string, unknown>;
    expect(body.enabled_tools).toEqual(['pest_classify_fruit_vegetable']);
    const messages = body.messages as Array<{ content: Array<{ image_url?: { url?: string } }> }>;
    expect(messages[1].content[1].image_url?.url).toBe('data:image/jpeg;base64,aW1hZ2U=');
    expect(result.possibleProblems[0]).toMatchObject({ name: '疑似晚疫病', riskLevel: 'high' });
    expect(result.model.traceId).toBe('chatcmpl-test');
  });

  it('文本诊断时禁用图片识别工具', async () => {
    const files = { readImageAsDataUrl: jest.fn() } as unknown as FileService;
    const provider = new ShennongAiProvider(
      new ConfigService({ SHENNONG_API_KEY: 'test-key', SHENNONG_BASE_URL: 'https://example.test/api/v1' }),
      files,
    );
    const postMock = jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        choices: [{
          message: {
            content: '{"crop":"玉米","possibleProblems":[],"actions":[],"avoidActions":[],"needExpertReview":true,"needMoreImages":true}',
          },
        }],
      },
    });

    const result = await provider.analyze({ cropName: '玉米', description: '叶片发黄', images: [] });

    const requestBody = postMock.mock.calls[0][1] as Record<string, unknown>;
    expect(requestBody).not.toHaveProperty('enabled_tools');
    expect(result.needMoreImages).toBe(true);
    expect(files.readImageAsDataUrl).not.toHaveBeenCalled();
  });

  it('模型返回固定剂量时隐藏原建议并强制复核', async () => {
    const files = { readImageAsDataUrl: jest.fn() } as unknown as FileService;
    const provider = new ShennongAiProvider(
      new ConfigService({ SHENNONG_API_KEY: 'test-key', SHENNONG_BASE_URL: 'https://example.test/api/v1' }),
      files,
    );
    jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        choices: [{
          message: {
            content: JSON.stringify({
              crop: '番茄',
              possibleProblems: [{ name: '疑似晚疫病', confidence: 0.8, riskLevel: 'high', evidence: ['叶片有暗斑'] }],
              actions: [{ title: '立即处理', description: '每亩使用 30 毫升药剂', priority: 'now' }],
              avoidActions: [],
              needExpertReview: false,
              needMoreImages: false,
            }),
          },
        }],
      },
    });

    const result = await provider.analyze({ cropName: '番茄', description: '叶片有暗斑', images: [] });

    expect(result.safety?.passed).toBe(false);
    expect(result.actions[0].description).toContain('已隐藏');
    expect(result.needExpertReview).toBe(true);
  });
});
