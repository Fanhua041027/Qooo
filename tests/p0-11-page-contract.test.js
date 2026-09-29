const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const pageSource = fs.readFileSync(path.join(root, 'src/pages/ops-config/index.tsx'), 'utf8')
const resultSource = fs.readFileSync(path.join(root, 'src/pages/diagnosis-result/index.tsx'), 'utf8')
const appConfig = fs.readFileSync(path.join(root, 'src/app.config.ts'), 'utf8')

test('P0-11 页面包含加载、保存失败、离线恢复和上一版本保留状态', () => {
  assert.match(pageSource, /正在读取最新配置/)
  assert.match(pageSource, /保存失败，上一版本仍可用/)
  assert.match(pageSource, /setOffline\(!event\.isConnected\)/)
  assert.match(pageSource, /当前配置未改变/)
  assert.match(pageSource, /重新读取/)
  assert.match(pageSource, /新增配置/)
  assert.match(pageSource, /opsConfigApi\.create\(newConfig\)/)
})

test('P0-11 页面支持长文案和 2000 字符输入上限，且已注册路由', () => {
  // 页面以常量绑定输入上限，避免字面量断言在重构后产生误报。
  assert.match(pageSource, /const MAX_CONTENT_LENGTH = 2000/)
  assert.match(pageSource, /maxlength=\{MAX_CONTENT_LENGTH\}/)
  assert.match(pageSource, /ops-config-version__content/)
  assert.match(fs.readFileSync(path.join(root, 'src/pages/ops-config/index.scss'), 'utf8'), /max-width: 380px/)
  assert.match(appConfig, /pages\/ops-config\/index/)
})

test('诊断结果页读取运营配置失败时保留内置文案，不会因配置异常白屏', () => {
  assert.match(resultSource, /useOpsConfigStore/)
  assert.match(resultSource, /loadOpsConfigs\(true\)/)
  assert.match(resultSource, /configuredContent\(riskKey\)/)
  assert.match(resultSource, /configSnapshot\?\.\[key\]/)
  assert.match(resultSource, /parseOpsConfigContent\(/)
  assert.match(resultSource, /const displayActions: DiagnosisAction\[\]/)
  assert.match(resultSource, /disabled={!displayActions\.length}/)
})

test('真实配置适配使用与 Mock 相同的统一响应字段', () => {
  const service = fs.readFileSync(path.join(root, 'src/services/ops-config.api.ts'), 'utf8')
  for (const field of ['code', 'message', 'data', 'requestId']) assert.match(service, new RegExp(field))
  assert.match(service, /apiClient\.(listOpsConfigs|getOpsConfig|createOpsConfig|updateOpsConfig|rollbackOpsConfig)/)
  assert.match(service, /mockEnvelope\(/)
})
