const FARM_KEY = 'qd_farm'

const DEFAULT_FARM = {
  id: 'farm_demo_001',
  name: '河湾家庭农场',
  location: '山东省寿光市',
  plots: [
    { id: 'plot_demo_001', name: '东棚 2 号地', crop: '番茄', growthStage: '结果期', area: '2.4 亩', health: '需关注', healthType: 'medium', note: '1 条诊断待复查' },
    { id: 'plot_demo_002', name: '西棚 1 号地', crop: '黄瓜', growthStage: '伸蔓期', area: '1.8 亩', health: '正常', healthType: 'low', note: '今日无待办' }
  ]
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function getFarm() {
  const stored = wx.getStorageSync(FARM_KEY)
  if (stored) return stored
  const initial = clone(DEFAULT_FARM)
  wx.setStorageSync(FARM_KEY, initial)
  return initial
}

function saveFarm(farm) {
  wx.setStorageSync(FARM_KEY, farm)
  return farm
}

function createFarm(input) {
  return saveFarm({ id: `farm_${Date.now()}`, name: input.name, location: input.location, plots: [] })
}

function updateFarm(input) {
  const farm = getFarm()
  return saveFarm({ ...farm, ...input })
}

function createPlot(input) {
  const farm = getFarm()
  const plot = {
    id: `plot_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name: input.name,
    crop: input.crop,
    growthStage: input.growthStage || '苗期',
    area: input.area || '待补充',
    health: '正常',
    healthType: 'low',
    note: '今日无待办'
  }
  return saveFarm({ ...farm, plots: [plot, ...(farm.plots || [])] })
}

module.exports = { getFarm, createFarm, updateFarm, createPlot }
