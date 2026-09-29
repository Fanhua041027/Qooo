const test = require('node:test')
const assert = require('node:assert/strict')

const storage = new Map()
global.wx = {
  getStorageSync(key) {
    return storage.get(key)
  },
  setStorageSync(key, value) {
    storage.set(key, value)
  }
}

const diagnosisService = require('../services/diagnosis-service')

test('图片质量检查覆盖通过、警告和拦截状态', () => {
  assert.equal(diagnosisService.inspectImageQuality({ width: 1600, height: 1200, size: 400000 }).status, 'PASS')
  assert.equal(diagnosisService.inspectImageQuality({ width: 700, height: 900, size: 100000 }).status, 'WARNING')
  assert.equal(diagnosisService.inspectImageQuality({ width: 320, height: 480, size: 30000 }).status, 'FAILED')
  assert.equal(diagnosisService.inspectImageQuality({ width: 1600, height: 1200, size: 11 * 1024 * 1024 }).status, 'FAILED')
})

test('诊断记录从处理中转为完成并可以回查', () => {
  storage.clear()
  const created = diagnosisService.createDiagnosis({
    imagePath: 'mock://tomato.jpg',
    crop: '番茄',
    growthStage: '结果期',
    plot: '东棚 2 号地',
    quality: { status: 'PASS', issues: [] }
  })

  assert.equal(created.status, 'PROCESSING')
  const completed = diagnosisService.completeDiagnosis(created.id)
  assert.equal(completed.status, 'COMPLETED')
  assert.equal(completed.risk.level, 'MEDIUM')
  assert.equal(completed.actions.length, 3)
  assert.equal(diagnosisService.getDiagnosis(created.id).possibleIssue.name, '疑似番茄晚疫病')
  assert.equal(diagnosisService.listDiagnoses().length, 1)
})

test('同一个客户端幂等键不会创建重复诊断', () => {
  storage.clear()
  const input = {
    imagePath: 'mock://tomato.jpg',
    crop: '番茄',
    growthStage: '结果期',
    plot: '东棚 2 号地',
    quality: { status: 'PASS', issues: [] },
    clientRequestId: 'client_diag_test_001'
  }
  const first = diagnosisService.createDiagnosis(input)
  const retry = diagnosisService.createDiagnosis(input)

  assert.equal(retry.id, first.id)
  assert.equal(diagnosisService.listDiagnoses().length, 1)
})

test('不存在的诊断 ID 不会生成伪结果', () => {
  storage.clear()
  assert.equal(diagnosisService.completeDiagnosis('missing'), null)
  assert.equal(diagnosisService.getDiagnosis('missing'), null)
})

test('删除诊断记录时保留审计事件', () => {
  storage.clear()
  const created = diagnosisService.createDiagnosis({ imagePath: 'mock://leaf.jpg', crop: '黄瓜', plot: '西棚', quality: { status: 'PASS', issues: [] } })
  assert.equal(diagnosisService.removeDiagnosis(created.id), true)
  assert.equal(diagnosisService.getDiagnosis(created.id), null)
  assert.equal(storage.get('qd_diagnosis_audit')[0].diagnosisId, created.id)
})
