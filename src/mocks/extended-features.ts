import type { ChatMessage, CommunityPost, ExpertChatSession, ExpertProfile, ShopProduct, WeatherOverview } from '@nongjianzhen/types'

export const WEATHER_OVERVIEW: WeatherOverview = {
  location: '浙江省杭州市临安区 · 向阳示范农场',
  updatedAt: '2026-09-29T08:30:00.000Z',
  current: { temperature: 26, feelsLike: 28, condition: '多云', icon: 'cloud', humidity: 78, wind: '东南风 2 级', uvIndex: 5 },
  forecast: [
    { date: '09-29', weekday: '今天', condition: '多云', icon: 'cloud', high: 29, low: 22, precipitation: 35, wind: '东南风 2 级' },
    { date: '09-30', weekday: '明天', condition: '阵雨', icon: 'rain', high: 27, low: 21, precipitation: 70, wind: '东风 3 级' },
    { date: '10-01', weekday: '周四', condition: '小雨', icon: 'rain', high: 25, low: 20, precipitation: 65, wind: '东北风 2 级' },
    { date: '10-02', weekday: '周五', condition: '阴', icon: 'cloud', high: 26, low: 19, precipitation: 25, wind: '北风 2 级' },
    { date: '10-03', weekday: '周六', condition: '晴', icon: 'sun', high: 28, low: 18, precipitation: 10, wind: '东北风 1 级' }
  ],
  alerts: [
    { id: 'weather_alert_1', level: 'WARNING', title: '未来 48 小时湿度偏高', content: '番茄棚内建议加强通风，避免在叶面潮湿时修剪或喷施。', action: '查看农事建议' }
  ]
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  { id: 'product_bio_001', name: '黄板粘虫板', subtitle: '监测飞虫密度，适合棚室早期预警', category: 'BIOCONTROL', categoryLabel: '生物防控', price: 29.9, unit: '20 片/包', stock: 86, badge: '农间推荐', safetyNote: '物理防控，不涉及药剂残留', suitableCrops: ['番茄', '黄瓜'] },
  { id: 'product_tool_001', name: '叶片取样剪', subtitle: '不锈钢圆头，减少取样时二次损伤', category: 'TOOLS', categoryLabel: '田间工具', price: 39, unit: '1 把', stock: 42, safetyNote: '使用前后请清洁并单独存放', suitableCrops: ['番茄', '黄瓜', '水稻', '玉米', '柑橘'] },
  { id: 'product_protect_001', name: '可重复使用防虫网', subtitle: '适合育苗区和小面积隔离观察', category: 'PROTECTION', categoryLabel: '防护用品', price: 68, unit: '2m × 5m', stock: 18, badge: '应急隔离', safetyNote: '用于物理隔离，不替代检疫处置', suitableCrops: ['番茄', '黄瓜'] },
  { id: 'product_seed_001', name: '番茄抗逆试种包', subtitle: '小批量试种，先观察再扩大面积', category: 'SEEDS', categoryLabel: '种苗种子', price: 19.8, unit: '10 粒', stock: 120, safetyNote: '请按当地登记和适宜季节使用', suitableCrops: ['番茄'] },
  { id: 'product_fert_001', name: '土壤取样袋', subtitle: '分区取样并标记，方便后续检测', category: 'FERTILIZER', categoryLabel: '土壤管理', price: 16.9, unit: '10 只/包', stock: 64, safetyNote: '只用于取样，不代表施肥建议', suitableCrops: ['番茄', '黄瓜', '水稻', '玉米', '柑橘'] }
]

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: 'post_001', author: '临安小周', role: 'FARMER', crop: '番茄', title: '番茄叶背出现细小白点，先做了这三步', content: '先隔离了最早出现症状的一小片，补拍叶片正反面，再记录每天扩散范围。大家看看还需要补充什么信息？', tags: ['番茄', '叶片异常'], likes: 18, comments: 6, liked: false, createdAt: '2026-09-29T07:20:00.000Z' },
  { id: 'post_002', author: '王老师', role: 'EXPERT', crop: '黄瓜', title: '湿度高的两天，黄瓜棚先做通风还是浇水？', content: '先看叶面是否干燥、根区是否积水。叶面潮湿时优先通风，浇水安排要结合根区含水情况。', tags: ['黄瓜', '棚室管理'], likes: 42, comments: 12, liked: false, createdAt: '2026-09-28T12:40:00.000Z' },
  { id: 'post_003', author: '农间诊小助手', role: 'OFFICIAL', title: '发帖前先补齐这四项信息', content: '作物和生长期、异常部位近照、整株或分布照片、已经做过的处理。信息越完整，大家越容易给出可执行的建议。', tags: ['新手指南'], likes: 31, comments: 4, liked: false, createdAt: '2026-09-27T09:00:00.000Z' }
]

export const EXPERTS: ExpertProfile[] = [
  { id: 'expert_001', name: '王老师', title: '农艺师 · 12 年经验', specialty: '棚室病害与湿度管理', crops: ['番茄', '黄瓜'], online: true, responseTime: '通常 10 分钟内回复', rating: 4.9, cases: 1280 },
  { id: 'expert_002', name: '陈工', title: '植保工程师 · 9 年经验', specialty: '水稻、玉米虫害识别', crops: ['水稻', '玉米'], online: true, responseTime: '通常 20 分钟内回复', rating: 4.8, cases: 936 },
  { id: 'expert_003', name: '刘老师', title: '果树农艺师 · 15 年经验', specialty: '柑橘病虫害与修剪', crops: ['柑橘'], online: false, responseTime: '今天 18:00 前回复', rating: 4.9, cases: 1642 }
]

export function createChatSession(expert: ExpertProfile): ExpertChatSession {
  const messages: ChatMessage[] = [
    { id: 'chat_system_1', sender: 'SYSTEM', text: '请不要发送身份证、手机号等隐私信息；涉及用药时请准备产品标签照片。', createdAt: new Date().toISOString() },
    { id: 'chat_expert_1', sender: 'EXPERT', text: `你好，我是${expert.name}。可以先告诉我作物、生长期和最明显的变化吗？`, createdAt: new Date().toISOString() }
  ]
  return { id: `chat_${expert.id}`, expert, status: 'ACTIVE', messages }
}
