import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WEATHER_OVERVIEW } from './field-services.catalog';

type Granularity = 'daily' | 'hourly';

export class WeatherInputError extends Error {}

export interface WeatherForecastInput {
  location?: string;
  latitude?: number;
  longitude?: number;
  days?: number;
  granularity?: Granularity;
}

export interface WeatherForecastResult {
  location: string;
  timezone?: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  daily: Array<{ date: string; weekday: string; condition: string; icon: string; high: number; low: number; precipitation: number; wind: string }>;
  hourly?: Array<{ time: string; temperature: number; precipitation: number; precipitationProbability: number; humidity: number; windSpeed: number; condition: string }>;
  source: 'AGENT_TECH' | 'MOCK';
  current?: { temperature: number; feelsLike: number; condition: string; humidity: number; wind: string; uvIndex: number };
}

export interface WeatherHistoryResult {
  location: string;
  startDate: string;
  endDate: string;
  updatedAt: string;
  days: Array<{ date: string; condition: string; high: number; low: number; average: number; precipitation: number; humidity: number; wind: string }>;
  source: 'AGENT_TECH' | 'MOCK';
}

interface AgentTechResponse { choices?: Array<{ message?: { content?: string | null } }>; error?: { message?: string } }

@Injectable()
export class WeatherProvider {
  private readonly forecastCache = new Map<string, { expiresAt: number; value: WeatherForecastResult }>();
  private readonly historyCache = new Map<string, { expiresAt: number; value: WeatherHistoryResult }>();

  constructor(private readonly config: ConfigService) {}

  async getForecast(input: WeatherForecastInput = {}): Promise<WeatherForecastResult> {
    const normalized = this.normalizeForecastInput(input);
    const cacheKey = JSON.stringify(normalized);
    const cached = this.forecastCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) return cached.value;

    const value = this.shouldUseLiveProvider()
      ? await this.fetchForecast(normalized)
      : this.fallbackForecast(normalized);
    this.forecastCache.set(cacheKey, { value, expiresAt: Date.now() + 5 * 60 * 1000 });
    return value;
  }

  async getHistory(input: WeatherForecastInput & { startDate?: string; endDate?: string } = {}): Promise<WeatherHistoryResult> {
    const range = this.normalizeHistoryInput(input);
    const cacheKey = JSON.stringify(range);
    const cached = this.historyCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) return cached.value;

    const value = this.shouldUseLiveProvider()
      ? await this.fetchHistory(range)
      : this.fallbackHistory(range);
    this.historyCache.set(cacheKey, { value, expiresAt: Date.now() + 15 * 60 * 1000 });
    return value;
  }

  private shouldUseLiveProvider() {
    const provider = (this.config.get<string>('WEATHER_PROVIDER') || '').trim().toLowerCase();
    return provider !== 'mock' && Boolean(this.apiKey());
  }

  private async fetchForecast(input: Required<Pick<WeatherForecastInput, 'location' | 'days' | 'granularity'>> & Pick<WeatherForecastInput, 'latitude' | 'longitude'>) {
    const payload = await this.callTool('weather_get_forecast', this.forecastPrompt(input));
    return this.normalizeForecastPayload(payload, input);
  }

  private async fetchHistory(input: Required<Pick<WeatherForecastInput, 'location'>> & { startDate: string; endDate: string; latitude?: number; longitude?: number }) {
    const payload = await this.callTool('weather_get_history', this.historyPrompt(input));
    return this.normalizeHistoryPayload(payload, input);
  }

  private async callTool(tool: string, prompt: string): Promise<Record<string, unknown>> {
    const baseUrl = (this.config.get<string>('WEATHER_BASE_URL') || this.config.get<string>('SHENNONG_BASE_URL') || 'https://api.agent-tech.cc/api/v1').replace(/\/$/, '');
    const response = await axios.post<AgentTechResponse>(`${baseUrl}/chat/completions`, {
      model: this.config.get<string>('WEATHER_MODEL') || this.config.get<string>('SHENNONG_MODEL') || 'sn',
      stream: false,
      temperature: 0,
      enabled_tools: [tool],
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: { Authorization: `Bearer ${this.apiKey()}`, 'Content-Type': 'application/json' },
      timeout: Number(this.config.get<string>('WEATHER_TIMEOUT_MS') || 20_000),
    });
    const content = response.data.choices?.[0]?.message?.content;
    if (!content) throw new Error(response.data.error?.message || `天气工具 ${tool} 没有返回内容`);
    const json = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    const start = json.indexOf('{');
    const end = json.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error(`天气工具 ${tool} 返回内容不是 JSON`);
    const parsed: unknown = JSON.parse(json.slice(start, end + 1));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error(`天气工具 ${tool} 返回结构无效`);
    return parsed as Record<string, unknown>;
  }

  private normalizeForecastPayload(payload: Record<string, unknown>, input: Required<Pick<WeatherForecastInput, 'location' | 'days' | 'granularity'>> & Pick<WeatherForecastInput, 'latitude' | 'longitude'>): WeatherForecastResult {
    const dailyRaw = Array.isArray(payload.daily) ? payload.daily : Array.isArray(payload.forecast) ? payload.forecast : [];
    const daily = dailyRaw.slice(0, input.days).map((item, index) => {
      const row = this.record(item);
      const date = this.string(row.date) || this.dateOffset(index);
      return { date, weekday: this.weekday(date), condition: this.string(row.condition) || '暂无数据', icon: this.icon(this.string(row.condition)), high: this.number(row.high, this.number(row.temperature, 0)), low: this.number(row.low, this.number(row.temperature, 0)), precipitation: this.number(row.precipitation, this.number(row.precipitation_chance, 0)), wind: this.string(row.wind) || `${this.number(row.wind_speed, 0)} m/s` };
    });
    const current = this.record(payload.current);
    const hourly = Array.isArray(payload.hourly) ? payload.hourly.map((item) => { const row = this.record(item); return { time: this.string(row.time) || this.string(row.datetime) || '', temperature: this.number(row.temperature), precipitation: this.number(row.precipitation), precipitationProbability: this.number(row.precipitationProbability, this.number(row.precipitation_probability)), humidity: this.number(row.humidity), windSpeed: this.number(row.windSpeed, this.number(row.wind_speed)), condition: this.string(row.condition) || '未知' }; }).filter((item) => item.time) : undefined;
    const startDate = daily[0]?.date || this.dateOffset(0);
    const endDate = daily[daily.length - 1]?.date || this.dateOffset(input.days - 1);
    return { location: this.string(payload.location) || input.location, timezone: this.string(payload.timezone) || undefined, updatedAt: new Date().toISOString(), startDate, endDate, daily, hourly: input.granularity === 'hourly' ? hourly : undefined, source: 'AGENT_TECH', current: { temperature: this.number(current.temperature), feelsLike: this.number(current.feelsLike, this.number(current.feels_like, this.number(current.temperature))), condition: this.string(current.condition) || daily[0]?.condition || '暂无数据', humidity: this.number(current.humidity), wind: this.string(current.wind) || `${this.number(current.wind_speed)} m/s`, uvIndex: this.number(current.uvIndex, this.number(current.uv_index)) } };
  }

  private normalizeHistoryPayload(payload: Record<string, unknown>, input: Required<Pick<WeatherForecastInput, 'location'>> & { startDate: string; endDate: string; latitude?: number; longitude?: number }): WeatherHistoryResult {
    const rows = Array.isArray(payload.days) ? payload.days : Array.isArray(payload.daily) ? payload.daily : Array.isArray(payload.history) ? payload.history : [];
    const days = rows.map((item) => { const row = this.record(item); const average = this.number(row.average, this.number(row.temperature)); const high = this.number(row.high, average); const low = this.number(row.low, average); return { date: this.string(row.date) || input.startDate, condition: this.string(row.condition) || '暂无数据', high, low, average, precipitation: this.number(row.precipitation, this.number(row.precipitation_amount)), humidity: this.number(row.humidity), wind: this.string(row.wind) || `${this.number(row.wind_speed)} m/s` }; });
    return { location: this.string(payload.location) || input.location, startDate: this.string(payload.startDate) || input.startDate, endDate: this.string(payload.endDate) || input.endDate, updatedAt: new Date().toISOString(), days, source: 'AGENT_TECH' };
  }

  private fallbackForecast(input: Required<Pick<WeatherForecastInput, 'location' | 'days' | 'granularity'>>): WeatherForecastResult {
    const daily = WEATHER_OVERVIEW.forecast.slice(0, input.days);
    return { location: input.location, updatedAt: new Date().toISOString(), startDate: daily[0]?.date || this.dateOffset(0), endDate: daily[daily.length - 1]?.date || this.dateOffset(input.days - 1), daily, source: 'MOCK', current: WEATHER_OVERVIEW.current };
  }

  private fallbackHistory(input: Required<Pick<WeatherForecastInput, 'location'>> & { startDate: string; endDate: string }): WeatherHistoryResult {
    const days = this.dateRange(input.startDate, input.endDate).map((date, index) => ({ date, condition: index % 3 === 0 ? '多云' : '晴', high: 28, low: 20, average: 24, precipitation: index % 3 === 0 ? 20 : 5, humidity: 70, wind: '东南风 2 级' }));
    return { location: input.location, startDate: input.startDate, endDate: input.endDate, updatedAt: new Date().toISOString(), days, source: 'MOCK' };
  }

  private normalizeForecastInput(input: WeatherForecastInput): Required<Pick<WeatherForecastInput, 'location' | 'days' | 'granularity'>> & Pick<WeatherForecastInput, 'latitude' | 'longitude'> {
    const location = input.location?.trim() || '浙江省杭州市临安区';
    const days = Math.min(15, Math.max(1, Math.floor(input.days || 5)));
    return { location, latitude: input.latitude, longitude: input.longitude, days, granularity: input.granularity === 'hourly' ? 'hourly' : 'daily' };
  }

  private normalizeHistoryInput(input: WeatherForecastInput & { startDate?: string; endDate?: string }) {
    // 历史再分析通常不包含当天未完成的数据，默认取昨天结束的最近 7 天。
    const endDate = input.endDate || this.dateOffset(-1);
    const startDate = input.startDate || this.dateOffset(-7);
    const start = new Date(`${startDate}T00:00:00Z`).getTime();
    const end = new Date(`${endDate}T00:00:00Z`).getTime();
    const now = Date.now();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate) || Number.isNaN(start) || Number.isNaN(end) || start > end) throw new WeatherInputError('历史天气日期范围无效');
    if (end - start > 30 * 86400000) throw new WeatherInputError('单次历史天气最多查询 31 天');
    if (end > now + 86400000 || start < now - 731 * 86400000) throw new WeatherInputError('历史天气仅支持最近两年范围');
    return { location: input.location?.trim() || '浙江省杭州市临安区', latitude: input.latitude, longitude: input.longitude, startDate, endDate };
  }

  private forecastPrompt(input: Required<Pick<WeatherForecastInput, 'location' | 'days' | 'granularity'>> & Pick<WeatherForecastInput, 'latitude' | 'longitude'>) { return `调用天气预报工具查询中国县区或坐标天气。地点：${input.location}。${input.latitude !== undefined && input.longitude !== undefined ? `坐标：${input.latitude},${input.longitude}。` : ''}查询未来 ${input.days} 天，输出严格 JSON：{"location":"","timezone":"","current":{"temperature":0,"feelsLike":0,"condition":"","humidity":0,"wind":"","uvIndex":0},"daily":[{"date":"YYYY-MM-DD","condition":"","high":0,"low":0,"precipitation":0,"wind":""}],"hourly":[{"time":"ISO","temperature":0,"precipitation":0,"precipitationProbability":0,"humidity":0,"windSpeed":0,"condition":""}]}。${input.granularity === 'hourly' ? '必须返回逐小时 hourly 数据。' : '返回逐日 daily 数据即可。'}不要返回 Markdown。`; }
  private historyPrompt(input: { location: string; startDate: string; endDate: string; latitude?: number; longitude?: number }) { return `调用历史天气工具查询中国县区或坐标的历史再分析天气。地点：${input.location}，日期 ${input.startDate} 至 ${input.endDate}。${input.latitude !== undefined && input.longitude !== undefined ? `坐标：${input.latitude},${input.longitude}。` : ''}只返回严格 JSON：{"location":"","startDate":"${input.startDate}","endDate":"${input.endDate}","days":[{"date":"YYYY-MM-DD","condition":"","high":0,"low":0,"average":0,"precipitation":0,"humidity":0,"wind":""}]}。不要返回 Markdown。`; }

  private apiKey() { return this.config.get<string>('WEATHER_API_KEY')?.trim() || this.config.get<string>('SHENNONG_API_KEY')?.trim() || ''; }
  private record(value: unknown): Record<string, unknown> { return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}; }
  private string(value: unknown) { return typeof value === 'string' ? value.trim() : ''; }
  private number(value: unknown, fallback = 0) { const parsed = typeof value === 'number' ? value : Number(value); return Number.isFinite(parsed) ? parsed : fallback; }
  private icon(condition: string) { return /雨|雪/.test(condition) ? 'rain' : /晴/.test(condition) ? 'sunny' : 'cloudy'; }
  private weekday(date: string) { return new Intl.DateTimeFormat('zh-CN', { weekday: 'short', timeZone: 'Asia/Shanghai' }).format(new Date(`${date}T00:00:00+08:00`)); }
  private today() { return new Date().toISOString().slice(0, 10); }
  private dateOffset(offset: number) { const date = new Date(Date.now() + offset * 86400000); return date.toISOString().slice(0, 10); }
  private dateRange(start: string, end: string) { const values: string[] = []; for (let time = new Date(`${start}T00:00:00Z`).getTime(); time <= new Date(`${end}T00:00:00Z`).getTime(); time += 86400000) values.push(new Date(time).toISOString().slice(0, 10)); return values; }
}
