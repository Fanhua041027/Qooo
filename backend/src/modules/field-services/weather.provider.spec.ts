import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WeatherProvider } from './weather.provider';

describe('WeatherProvider', () => {
  afterEach(() => jest.restoreAllMocks());

  it('通过 weather_get_forecast 工具规范化真实预报结果', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({ data: { choices: [{ message: { content: JSON.stringify({ location: '临安区', current: { temperature: 24, humidity: 70, condition: '晴' }, daily: [{ date: '2026-09-29', condition: '晴', high: 29, low: 20, precipitation: 10, wind: '东风 2 级' }, { date: '2026-09-30', condition: '小雨', high: 26, low: 19, precipitation: 60, wind: '东风 2 级' }] }) } }] } });
    const provider = new WeatherProvider(new ConfigService({ WEATHER_API_KEY: 'test-key', WEATHER_BASE_URL: 'https://example.test/api/v1' }));
    const result = await provider.getForecast({ location: '临安区', days: 2 });
    expect(result).toMatchObject({ source: 'AGENT_TECH', location: '临安区', daily: [{ condition: '晴' }, { condition: '小雨' }] });
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/chat/completions'), expect.objectContaining({ enabled_tools: ['weather_get_forecast'] }), expect.any(Object));
  });

  it('限制历史天气单次最多 31 天', async () => {
    const provider = new WeatherProvider(new ConfigService({ WEATHER_PROVIDER: 'mock' }));
    const end = new Date().toISOString().slice(0, 10);
    const start = new Date(Date.now() - 31 * 86400000).toISOString().slice(0, 10);
    await expect(provider.getHistory({ location: '临安区', startDate: start, endDate: end })).rejects.toThrow('最多查询 31 天');
  });
});
