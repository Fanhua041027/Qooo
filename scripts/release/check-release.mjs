#!/usr/bin/env node

import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)))
const codeOnly = process.argv.includes('--code-only')
const checks = [
  { name: '前端类型检查', command: 'npm run typecheck', cwd: root },
  { name: '农业内容校验', command: 'npm run content:validate', cwd: root },
  { name: '前端单元测试', command: 'npm test', cwd: root },
  { name: '页面契约测试', command: 'node --test tests/p0-11-page-contract.test.js', cwd: root },
  { name: '原生回归测试', command: 'node --test tests/*.test.js', cwd: root },
  { name: '微信小程序构建', command: 'npm run build:weapp', cwd: root },
  { name: '后端类型检查', command: 'npm run typecheck', cwd: resolve(root, 'backend') },
  { name: '后端测试', command: 'npm test', cwd: resolve(root, 'backend') },
  { name: '后端构建', command: 'npm run build', cwd: resolve(root, 'backend') },
  { name: 'Prisma schema 校验', command: 'npx prisma validate', cwd: resolve(root, 'backend') },
]

const requiredFiles = [
  'docs/QA-REPORT-P0-11.md',
  'scripts/qa/smoke-p0-11.mjs',
  'tests/p0-11-page-contract.test.js',
]
const results = []

for (const file of requiredFiles) {
  const present = existsSync(resolve(root, file))
  results.push({ name: `发布文件：${file}`, passed: present, details: present ? '存在' : '缺失' })
}

for (const check of checks) {
  const result = spawnSync(check.command, { cwd: check.cwd, shell: true, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  const output = `${result.stdout || ''}${result.stderr || ''}`.trim()
  const passed = result.status === 0
  results.push({ name: check.name, passed, details: passed ? '通过' : `退出码 ${result.status}`, output: passed ? undefined : output.slice(-4000) })
  console.log(`[${passed ? '通过' : '失败'}] ${check.name}`)
  if (!passed && output) console.error(output)
}

const evidence = {
  '真实 API smoke': process.env.REAL_API_SMOKE_PASSED === 'true',
  '微信开发者工具回归': process.env.WECHAT_DEVTOOLS_REGRESSION === 'true',
  'Android 真机回归': process.env.ANDROID_REGRESSION === 'true',
  'iPhone 真机回归': process.env.IPHONE_REGRESSION === 'true',
  '大字号证据': process.env.LARGE_FONT_EVIDENCE === 'true',
  '375px 小屏证据': process.env.SMALL_SCREEN_EVIDENCE === 'true',
}
const missingEvidence = codeOnly ? [] : Object.entries(evidence).filter(([, passed]) => !passed).map(([name]) => name)
const failedChecks = results.filter((item) => !item.passed).map((item) => item.name)
const conclusion = failedChecks.length > 0 || missingEvidence.length > 0 ? '阻塞' : '通过'
const report = { conclusion, codeChecks: results, missingEvidence, generatedAt: new Date().toISOString() }
console.log(JSON.stringify(report, null, 2))
if (conclusion !== '通过') process.exitCode = 1
