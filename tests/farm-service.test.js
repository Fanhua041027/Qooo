const test = require('node:test')
const assert = require('node:assert/strict')

const storage = new Map()
global.wx = {
  getStorageSync(key) { return storage.get(key) },
  setStorageSync(key, value) { storage.set(key, value) },
  redirectTo() {}
}

const farmService = require('../services/farm-service')

test('农场和地块可以持久化创建与编辑', () => {
  storage.clear()
  const initial = farmService.getFarm()
  assert.equal(initial.name, '河湾家庭农场')
  const updated = farmService.updateFarm({ name: '南岭示范农场', location: '四川省眉山市' })
  assert.equal(updated.name, '南岭示范农场')
  const withPlot = farmService.createPlot({ name: '南棚育苗区', crop: '辣椒', growthStage: '苗期', area: '1.2 亩' })
  assert.equal(withPlot.plots[0].name, '南棚育苗区')
  assert.equal(farmService.getFarm().plots.length, initial.plots.length + 1)
})

test('首次创建农场时使用必填名称和地区', () => {
  storage.clear()
  const created = farmService.createFarm({ name: '测试农场', location: '云南省' })
  assert.equal(created.name, '测试农场')
  assert.equal(created.location, '云南省')
  assert.deepEqual(created.plots, [])
})

test('农场页空状态参数不会被默认数据覆盖', () => {
  storage.set('qd_user', { id: 'user_p0_farmer_001', name: '陈师傅' })
  let pageDefinition
  global.Page = (definition) => { pageDefinition = definition }
  delete require.cache[require.resolve('../pages/farm/farm.js')]
  require('../pages/farm/farm.js')
  const page = { ...pageDefinition, data: JSON.parse(JSON.stringify(pageDefinition.data)) }
  page.setData = (patch) => Object.assign(page.data, patch)
  page.onLoad({ state: 'empty' })
  page.onShow()
  assert.equal(page.data.state, 'empty')
  assert.equal(page.data.plots.length, 0)
})
