import type { OpsConfigCategory } from '@nongjianzhen/types'

export function isOpsIdentity(userId?: string, role?: string) {
  return ['ops_p0_001', 'ops_expert_p0_001', 'ops_admin_p0_001'].includes(userId || '') || ['OPERATOR', 'EXPERT', 'ADMIN'].includes(String(role || '').toUpperCase())
}

export function parseOpsConfigContent(content: string, fallback: { title: string; description: string }) {
  // 结果页和首页会读取已发布配置；读取时也必须复核，避免旧版本或异常回滚内容绕过保存校验。
  if (validateOpsConfigContent(content)) return fallback
  try {
    const payload = JSON.parse(content) as { title?: unknown; label?: unknown; description?: unknown; message?: unknown }
    const title = typeof payload.title === 'string' ? payload.title : typeof payload.label === 'string' ? payload.label : ''
    const description = typeof payload.description === 'string' ? payload.description : typeof payload.message === 'string' ? payload.message : ''
    if (title || description) return { title: title || fallback.title, description: description || fallback.description }
  } catch {
    // 兼容早期按两行保存的文案。
  }
  const lines = content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  return { title: lines[0] || fallback.title, description: lines.slice(1).join('\n') || fallback.description }
}

/**
 * 校验运营配置编辑内容。
 * 兼容早期的两行纯文本格式；用户输入 JSON 时必须是可解析对象，
 * 并包含页面能够展示的标题和说明，避免保存后结果页静默回退。
 */
export function validateOpsConfigContent(content: string, category?: OpsConfigCategory) {
  const normalized = content.trim()
  if (!normalized) return '配置内容不能为空'
  if (normalized.length > 2000) return '配置内容不能超过 2000 个字符'
  if (/确诊|保证治愈|保证有效|一定有效|自行加量|缩短安全间隔|100\s*%/.test(normalized)) return '配置文案不能使用确定性或危险用药表述'
  if (/(?:每亩|每公顷|稀释|安全间隔期)\s*(?:使用|用|为|是|需等待)?\s*\d+|\d+(?:\.\d+)?\s*(?:ml|mL|毫升|g|克|kg|公斤|倍液|倍)(?=$|[\s，。；、,;]|[\u4e00-\u9fff])/u.test(normalized)) return '配置文案不能包含未经核验的具体剂量或安全间隔'
  const restrictedPesticides = /百草枯|甲胺磷|甲基对硫磷|对硫磷|久效磷|磷胺|六六六|滴滴涕|毒杀芬|杀虫脒|氟乙酰胺|毒鼠强/u
  const prohibition = /(?:不要|禁止|严禁|不得|不可|停止|停用)(?:使用|用)?\s*$/u
  const recommendsRestrictedPesticide = normalized.split(/[\n。！？；]/u).some((sentence) => {
    const match = sentence.match(restrictedPesticides)
    return Boolean(match && match.index !== undefined && !prohibition.test(sentence.slice(0, match.index).trim()))
  })
  if (recommendsRestrictedPesticide) return '配置文案不能推荐禁限用农药'

  const looksLikeJson = normalized.startsWith('{') || normalized.startsWith('[')
  if (!looksLikeJson) return ''

  let payload: Record<string, unknown>
  try {
    const parsed = JSON.parse(normalized) as unknown
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') return '配置 JSON 必须是对象'
    payload = parsed as Record<string, unknown>
  } catch {
    return '配置 JSON 格式错误，请检查逗号、引号和括号'
  }

  const title = payload.title ?? payload.label
  const description = payload.description ?? payload.message
  if (typeof title !== 'string' || !title.trim()) return '配置缺少必填字段：title 或 label'
  if (typeof description !== 'string' || !description.trim()) return '配置缺少必填字段：description 或 message'
  if (category === 'RISK') {
    if (!['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(String(payload.level).toUpperCase())) return '风险配置的 level 必须是 LOW、MEDIUM、HIGH 或 CRITICAL'
    if (typeof payload.actionWindow !== 'string' || !payload.actionWindow.trim()) return '风险配置缺少必填字段：actionWindow'
    if (payload.marker !== undefined && !['success', 'warning', 'danger', 'critical'].includes(String(payload.marker))) return '风险配置的 marker 不合法'
  }
  if (category === 'ACTION' && !['DO_NOW', 'OBSERVE', 'AVOID', 'EXPERT_REVIEW'].includes(String(payload.type))) return '处理建议的 type 不合法'
  if (category === 'SAFETY' && (!payload.ruleCode || payload.blockAction !== true || !payload.requiredEscalation || payload.allowDose !== false)) return '安全配置必须包含 ruleCode、blockAction=true、requiredEscalation，且 allowDose 固定为 false'
  return ''
}
