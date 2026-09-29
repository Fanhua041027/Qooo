#!/usr/bin/env node

/** 准备 P0-11 真实 API 验收数据，不会覆盖已有配置。 */
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
const list = await request('/v1/ops/configs', { token })
if (!list.response.ok || list.payload.code !== 'OK') throw new Error(`读取配置失败：${list.payload.message || list.response.status}`)
const exists = list.payload.data?.items?.some((item) => item.key === configKey)
if (!exists) {
  const created = await request('/v1/ops/configs', {
    method: 'POST',
    token,
    body: { key: configKey, name: 'P0-11 smoke 配置', description: '真实 API 验收配置', category: 'HOME', content: 'P0-11 smoke 原始文案' },
  })
  if (![200, 201].includes(created.response.status) || created.payload.code !== 'OK') throw new Error(`创建验收配置失败：${created.payload.message || created.response.status}`)
}
console.log(JSON.stringify({ result: '通过', baseUrl, accountId, configKey, created: !exists }, null, 2))
