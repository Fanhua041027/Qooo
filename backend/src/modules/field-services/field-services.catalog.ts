export type ShopCategory = 'BIOCONTROL' | 'TOOLS' | 'SEEDS' | 'FERTILIZER' | 'PROTECTION';
export interface ShopProduct { id: string; name: string; subtitle: string; category: ShopCategory; categoryLabel: string; price: number; unit: string; stock: number; badge?: string; safetyNote: string; suitableCrops: string[] }
export interface ExpertProfile { id: string; name: string; title: string; specialty: string; crops: string[]; online: boolean; responseTime: string; rating: number; cases: number }
export interface WeatherOverview { location: string; updatedAt: string; current: { temperature: number; feelsLike: number; condition: string; icon: string; humidity: number; wind: string; uvIndex: number }; forecast: Array<{ date: string; weekday: string; condition: string; icon: string; high: number; low: number; precipitation: number; wind: string }>; alerts: Array<{ id: string; level: 'INFO' | 'WARNING' | 'DANGER'; title: string; content: string; action: string }>; source?: 'AGENT_TECH' | 'MOCK' }

export const WEATHER_OVERVIEW: WeatherOverview = {
  location: '浙江省杭州市临安区',
  updatedAt: new Date().toISOString(),
  current: { temperature: 27, feelsLike: 29, condition: '多云', icon: 'cloudy', humidity: 78, wind: '东南风 2 级', uvIndex: 5 },
  forecast: [
    { date: '2026-09-29', weekday: '今天', condition: '多云', icon: 'cloudy', high: 30, low: 23, precipitation: 20, wind: '东南风 2 级' },
    { date: '2026-09-30', weekday: '周三', condition: '阵雨', icon: 'rain', high: 28, low: 22, precipitation: 60, wind: '东风 2 级' },
    { date: '2026-10-01', weekday: '周四', condition: '小雨', icon: 'rain', high: 26, low: 21, precipitation: 70, wind: '东北风 2 级' },
    { date: '2026-10-02', weekday: '周五', condition: '多云', icon: 'cloudy', high: 28, low: 20, precipitation: 25, wind: '北风 1 级' },
    { date: '2026-10-03', weekday: '周六', condition: '晴', icon: 'sunny', high: 31, low: 21, precipitation: 10, wind: '东南风 2 级' },
  ],
  alerts: [{ id: 'humidity-001', level: 'WARNING', title: '湿度偏高', content: '未来 48 小时湿度较高，叶面病害风险上升。', action: '优先通风，避免傍晚浇水' }],
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  { id: 'product-bio-001', name: '枯草芽孢杆菌', subtitle: '可湿性粉剂 · 500g', category: 'BIOCONTROL' as ShopCategory, categoryLabel: '生物防治', price: 39, unit: '袋', stock: 24, badge: '低风险', safetyNote: '使用前请阅读标签，按当地登记信息执行。', suitableCrops: ['番茄', '黄瓜', '草莓'] },
  { id: 'product-tool-001', name: '叶片病斑取样袋', subtitle: '透气纸袋 · 20 只', category: 'TOOLS', categoryLabel: '田间工具', price: 12, unit: '包', stock: 80, badge: '诊断必备', safetyNote: '取样后标记地块和日期，避免样本混放。', suitableCrops: ['通用'] },
  { id: 'product-seed-001', name: '抗病番茄种子', subtitle: '一代杂交 · 100 粒', category: 'SEEDS', categoryLabel: '种子种苗', price: 29, unit: '袋', stock: 36, safetyNote: '请根据当地备案信息和适播期选购。', suitableCrops: ['番茄'] },
  { id: 'product-fert-001', name: '水溶性平衡肥', subtitle: '20-20-20 · 1kg', category: 'FERTILIZER' as ShopCategory, categoryLabel: '肥料营养', price: 45, unit: '袋', stock: 42, safetyNote: '先小面积试用，避免与不明药剂混配。', suitableCrops: ['番茄', '黄瓜', '叶菜'] },
  { id: 'product-protect-001', name: '防虫网', subtitle: '40 目 · 2m × 10m', category: 'PROTECTION', categoryLabel: '防护用品', price: 68, unit: '卷', stock: 15, badge: '减少虫害', safetyNote: '安装后检查边缘密封，定期清洁。', suitableCrops: ['通用'] },
];

export const EXPERTS: ExpertProfile[] = [
  { id: 'expert-001', name: '陈老师', title: '植保农艺师', specialty: '病害识别与绿色防控', crops: ['番茄', '黄瓜', '草莓'], online: true, responseTime: '通常 10 分钟内', rating: 4.9, cases: 1260 },
  { id: 'expert-002', name: '周老师', title: '土肥专家', specialty: '土壤改良与营养管理', crops: ['水稻', '蔬菜', '果树'], online: true, responseTime: '通常 30 分钟内', rating: 4.8, cases: 984 },
  { id: 'expert-003', name: '林老师', title: '果树技术员', specialty: '果树生长与虫害管理', crops: ['柑橘', '桃', '葡萄'], online: false, responseTime: '通常 2 小时内', rating: 4.7, cases: 742 },
];
