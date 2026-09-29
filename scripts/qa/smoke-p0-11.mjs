#!/usr/bin/env node

/**
 * P0-11 真实 HTTP smoke 测试。
 * 运行前需要启动后端并准备 PostgreSQL：
 *   node scripts/qa/smoke-p0-11.mjs
 * 可通过 BASE_URL、QA_ACCOUNT_ID、QA_SMOKE_CONFIG_KEY 覆盖默认值。
 */

const baseUrl = (process.env.BASE_URL || 'http://127.0.0.1:3000/api').replace(/\/$/, '')
const accountId = process.env.QA_ACCOUNT_ID || 'ops_p0_001'
const configKey = process.env.QA_SMOKE_CONFIG_KEY || 'qa.p0-11.smoke'
const timeoutMs = Number(process.env.QA_HTTP_TIMEOUT_MS || 8_000)

function fail(message) {
  throw new Error(message)
}

async function request(path, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  const headers = {
    accept: 'application/json',
    ...(options.body ? { 'content-type': 'application/json' } : {}),
    ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
    'x-request-id': `qa_p0_11_${Date.now()}`,
    'x-trace-id': `qa_trace_${Date.now()}`,
  }
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    })
    const payload = await response.json().catch(() => ({}))
    return { response, payload }
  } finally {
    clearTimeout(timer)
  }
}

function assertEnvelope(payload, label) {
  if (!payload || typeof payload !== 'object') fail(`${label}: 响应不是 JSON 对象`)
  for (const field of ['code', 'message', 'requestId']) {
    if (!(field in payload)) fail(`${label}: 缺少字段 ${field}`)
  }
  if (!('data' in payload) && payload.code === 'OK') fail(`${label}: 成功响应缺少 data`)
}

function assertStatus(response, expected, label) {
  if (response.status !== expected) fail(`${label}: 期望 HTTP ${expected}，实际 ${response.status}`)
}

async function main() {
  const login = await request('/v1/auth/mock-login', { method: 'POST', body: { accountId } })
  assertStatus(login.response, 200, '模拟登录')
  assertEnvelope(login.payload, '模拟登录')
  const token = login.payload.data?.accessToken
  if (login.payload.code !== 'OK' || typeof token !== 'string' || !token) fail('模拟登录: 未返回 accessToken')

  const unauthorized = await request('/v1/ops/configs')
  if (![401, 403].includes(unauthorized.response.status)) fail(`未授权访问: 期望 401/403，实际 ${unauthorized.response.status}`)
  assertEnvelope(unauthorized.payload, '未授权访问')

  const list = await request('/v1/ops/configs', { token })
  assertStatus(list.response, 200, '读取配置列表')
  assertEnvelope(list.payload, '读取配置列表')
  if (!Array.isArray(list.payload.data?.items)) fail('读取配置列表: data.items 不是数组')

  const existingKey = list.payload.data.items[0]?.key
  if (typeof existingKey !== 'string') fail('读取配置列表: 没有可用配置项')
  const get = await request(`/v1/ops/configs/${encodeURIComponent(existingKey)}`, { token })
  assertStatus(get.response, 200, '读取单个配置')
  assertEnvelope(get.payload, '读取单个配置')
  const originalContent = get.payload.data?.content
  const originalVersion = get.payload.data?.version
  if (typeof originalContent !== 'string' || typeof originalVersion !== 'string') fail('读取单个配置: 缺少 content/version')

  const createProbe = await request('/v1/ops/configs', {
    method: 'POST',
    token,
    body: {
      key: configKey,
      name: 'P0-11 smoke 配置',
      description: '自动化发布门禁使用的临时配置',
      category: 'HOME',
      content: 'P0-11 smoke 原始文案',
    },
  })
  if (![200, 201, 409].includes(createProbe.response.status)) fail(`新增配置: 期望 200/201/409，实际 ${createProbe.response.status}`)
  assertEnvelope(createProbe.payload, '新增配置')

  const update = await request(`/v1/ops/configs/${encodeURIComponent(existingKey)}`, {
    method: 'PUT',
    token,
    body: { content: `${originalContent}\nP0-11 smoke ${Date.now()}`, expectedVersion: originalVersion },
  })
  assertStatus(update.response, 200, '编辑配置')
  assertEnvelope(update.payload, '编辑配置')
  const updatedVersion = update.payload.data?.version
  if (typeof updatedVersion !== 'string' || updatedVersion === originalVersion) fail('编辑配置: 版本没有递增')

  const failedSave = await request(`/v1/ops/configs/${encodeURIComponent(existingKey)}`, {
    method: 'PUT',
    token,
    body: { content: '', expectedVersion: updatedVersion },
  })
  if (failedSave.response.status < 400) fail('保存失败: 空内容未被拒绝')
  assertEnvelope(failedSave.payload, '保存失败')

  const versions = await request(`/v1/ops/configs/${encodeURIComponent(existingKey)}/versions`, { token })
  assertStatus(versions.response, 200, '读取版本历史')
  assertEnvelope(versions.payload, '读取版本历史')
  const rollbackVersion = versions.payload.data?.items?.find((item) => item.version === originalVersion)?.version
  if (!rollbackVersion) fail(`恢复上一版本: 未找到 ${originalVersion}`)

  const rollback = await request(`/v1/ops/configs/${encodeURIComponent(existingKey)}/rollback`, {
    method: 'POST',
    token,
    body: { version: rollbackVersion },
  })
  assertStatus(rollback.response, 200, '恢复上一版本')
  assertEnvelope(rollback.payload, '恢复上一版本')
  if (rollback.payload.data?.content !== originalContent) fail('恢复上一版本: 内容未恢复')

  console.log(JSON.stringify({
    result: '通过',
    baseUrl,
    accountId,
    configKey,
    checked: ['正常读取配置', '新增配置', '编辑配置', '保存失败', '恢复上一版本', '未授权访问', '字段契约'],
  }, null, 2))
}

main().catch((error) => {
  const message = error?.name === 'AbortError'
    ? `请求超时（${timeoutMs}ms），请确认 API 已启动：${baseUrl}`
    : error?.message === 'fetch failed'
      ? `无法连接 API：${baseUrl}。请先启动后端和 PostgreSQL`
    : error?.message || String(error)
  console.error(JSON.stringify({ result: '阻塞', baseUrl, message }, null, 2))
  process.exitCode = 1
})
