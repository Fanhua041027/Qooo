import { describe, expect, it } from 'vitest'
import { isOpsIdentity, parseOpsConfigContent, validateOpsConfigContent } from './policy'

describe('运营配置页面状态策略', () => {
  it('仅允许运营测试账号访问，未授权和农户账号均拒绝', () => {
    expect(isOpsIdentity('ops_p0_001')).toBe(true)
    expect(isOpsIdentity('ops_expert_p0_001', 'EXPERT')).toBe(true)
    expect(isOpsIdentity('user_p0_farmer_001')).toBe(false)
    expect(isOpsIdentity(undefined)).toBe(false)
  })

  it('长文案按行解析，配置异常或空内容回退内置文案', () => {
    expect(parseOpsConfigContent('新风险标题\n请在 24 小时内复查并记录病斑变化。', { title: '默认标题', description: '默认说明' })).toEqual({ title: '新风险标题', description: '请在 24 小时内复查并记录病斑变化。' })
    expect(parseOpsConfigContent('', { title: '默认标题', description: '默认说明' })).toEqual({ title: '默认标题', description: '默认说明' })
  })

  it('兼容农业内容种子使用的小写风险等级', () => {
    const result = validateOpsConfigContent(JSON.stringify({ level: 'medium', title: '中风险', description: '继续观察', actionWindow: '24 小时内', marker: 'warning' }), 'RISK')
    expect(result).toBe('')
  })

  it('读取历史配置时拒绝具体剂量和禁限用农药文案', () => {
    expect(parseOpsConfigContent('继续观察\n每亩使用 30 毫升药剂', { title: '默认标题', description: '默认说明' })).toEqual({ title: '默认标题', description: '默认说明' })
    expect(validateOpsConfigContent('建议使用30毫升药剂')).toContain('具体剂量')
    expect(parseOpsConfigContent('暂不处理\n推荐使用百草枯', { title: '默认标题', description: '默认说明' })).toEqual({ title: '默认标题', description: '默认说明' })
    expect(parseOpsConfigContent('暂不处理\n不要使用百草枯', { title: '默认标题', description: '默认说明' })).toEqual({ title: '暂不处理', description: '不要使用百草枯' })
  })
})
