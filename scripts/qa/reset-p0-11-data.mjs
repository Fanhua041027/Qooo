#!/usr/bin/env node

/** 将指定配置恢复到 v1；没有历史版本时保持不变。 */
const baseUrl = (process.env.BASE_URL || 'http://127.0.0.1:3000/api').replace(/\/$/, '')
const accountId = process.env.QA_ACCOUNT_ID || 'ops_p0_001'
const configKey = process.env.QA_SMOKE_CONFIG_KEY || 'qa.p0-11.smoke'

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method || 'GET',
    headers: { accept: 'application/json', 'content-type': 'application/json', ...(options.token ? { authorization: `Bearer ${options.token}` } : {}) },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  return { response, payload: await response.json().catch(() => ({})) }
}

const login = await request('/v1/auth/mock-login', { method: 'POST', body: { accountId } })
if (!login.response.ok || login.payload.code !== 'OK') throw new Error(`模拟登录失败：${login.payload.message || login.response.status}`)
const token = login.payload.data?.accessToken
const versions = await request(`/v1/ops/configs/${encodeURIComponent(configKey)}/versions`, { token })
if (versions.response.status === 404) {
  console.log(JSON.stringify({ result: '通过', message: '验收配置不存在，无需恢复', configKey }, null, 2))
  process.exit(0)
}
if (!versions.response.ok || versions.payload.code !== 'OK') throw new Error(`读取版本失败：${versions.payload.message || versions.response.status}`)
const target = versions.payload.data?.items?.find((item) => item.version === 'v1')
if (!target) {
  console.log(JSON.stringify({ result: '通过', message: '没有 v1 历史版本，无需恢复', configKey }, null, 2))
  process.exit(0)
}
const current = versions.payload.data?.items?.[0]?.version
if (current === 'v1') {
  console.log(JSON.stringify({ result: '通过', message: '已经是 v1', configKey }, null, 2))
  process.exit(0)
}
const rollback = await request(`/v1/ops/configs/${encodeURIComponent(configKey)}/rollback`, { method: 'POST', token, body: { version: 'v1' } })
if (!rollback.response.ok || rollback.payload.code !== 'OK') throw new Error(`恢复失败：${rollback.payload.message || rollback.response.status}`)
console.log(JSON.stringify({ result: '通过', configKey, from: current, to: 'v1' }, null, 2))
