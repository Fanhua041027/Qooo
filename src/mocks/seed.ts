import type { DiagnosisRecord, Farm, FarmTask } from '@nongjianzhen/types'

const now = new Date().toISOString()

export const seedFarms: Farm[] = [
  {
    id: 'farm_demo_001',
    name: '向阳示范农场',
    location: '浙江省杭州市临安区',
    areaMu: 18.6,
    healthScore: 86,
    plots: [
      { id: 'plot_demo_001', farmId: 'farm_demo_001', name: '东一号棚', cropName: '番茄', growthStage: '开花期', areaMu: 3.2, plantedAt: '2026-07-18' },
      { id: 'plot_demo_002', farmId: 'farm_demo_001', name: '南二号田', cropName: '黄瓜', growthStage: '结果期', areaMu: 4.8, plantedAt: '2026-07-02' }
    ]
  }
]

export const seedDiagnoses: DiagnosisRecord[] = [
  {
    id: 'diag_demo_history_001',
    status: 'COMPLETED',
    crop: '番茄',
    plotId: 'plot_demo_001',
    createdAt: now,
    updatedAt: now,
    possibleIssues: [{ name: '疑似晚疫病', confidence: 0.86, evidence: ['叶片边缘出现不规则暗褐色病斑', '潮湿环境下病斑扩展较快'] }],
    risk: { level: 'MEDIUM', label: '中风险', reason: '当前可能影响叶片和果实，建议 24 小时内复查。' },
    actions: [
      { type: 'DO_NOW', title: '隔离并标记异常植株', description: '避免潮湿时修剪，并记录病斑变化。' },
      { type: 'OBSERVE', title: '检查相邻植株', description: '查看是否出现相似病斑。', dueAt: new Date(Date.now() + 86400000).toISOString() },
      { type: 'AVOID', title: '暂不要自行混配药剂', description: '涉及用药时先咨询当地农技员。' }
    ],
    disclaimer: '以上为辅助判断，请结合当地农技员意见确认。',
    model: { name: 'demo-diagnosis-model', version: 'mock-1.0.0' },
    requestId: 'mock_req_seed_001'
  }
]

export const seedTasks: FarmTask[] = [
  {
    id: 'task_demo_001',
    title: '检查相邻番茄植株',
    description: '重点查看叶片背面和下层叶片。',
    farmId: 'farm_demo_001',
    plotId: 'plot_demo_001',
    diagnosisId: 'diag_demo_history_001',
    priority: 'HIGH',
    status: 'PENDING',
    dueAt: new Date(Date.now() + 86400000).toISOString(),
    createdAt: now,
    updatedAt: now
  }
]
