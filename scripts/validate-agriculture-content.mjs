import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataRoot = path.join(projectRoot, 'data', 'agriculture')

function readJson(fileName) {
  const filePath = path.join(dataRoot, fileName)
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`${fileName} 无法读取或不是有效 JSON：${message}`)
  }
}

const operations = readJson('operations.v1.json')
const tasks = readJson('task-templates.v1.json')
const examples = readJson('ai-review-examples.json')
const issues = readJson('issues.v1.json')

const allowedCrops = new Set(operations.scope?.crops || [])
const groups = [
  ['riskLevels', operations.riskLevels],
  ['imageQualityPrompts', operations.imageQualityPrompts],
  ['actionTemplates', operations.actionTemplates],
  ['safetyBoundaries', operations.safetyBoundaries],
  ['expertReviewPrompts', operations.expertReviewPrompts]
]
const errors = []
const warnings = []

function addError(message) {
  errors.push(message)
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function validateContentItem(groupName, item) {
  if (!isNonEmptyString(item?.code)) addError(`${groupName} 存在缺少 code 的条目`)
  if (!Array.isArray(item?.applicableCrops) || item.applicableCrops.length === 0) {
    addError(`${item?.code || groupName} 必须绑定 applicableCrops`)
  } else {
    for (const crop of item.applicableCrops) {
      if (!allowedCrops.has(crop)) addError(`${item.code} 使用了未支持的作物：${crop}`)
    }
  }
  if (!Array.isArray(item?.scenarios) || item.scenarios.length === 0) {
    addError(`${item?.code || groupName} 必须绑定 scenarios`)
  }
  if (typeof item?.needsExpertReview !== 'boolean') {
    addError(`${item?.code || groupName} 必须声明 needsExpertReview`)
  }
}

const allCodes = new Map()
for (const [groupName, items] of groups) {
  if (!Array.isArray(items) || items.length === 0) {
    addError(`${groupName} 必须是非空数组`)
    continue
  }
  for (const item of items) {
    validateContentItem(groupName, item)
    if (item?.code) {
      if (allCodes.has(item.code)) addError(`code 重复：${item.code}（${allCodes.get(item.code)} 与 ${groupName}）`)
      else allCodes.set(item.code, groupName)
    }
  }
}

for (const item of operations.riskLevels || []) {
  if (['high', 'critical'].includes(item.level)) {
    if (!item.needsExpertReview || !item.userAction?.includes('复核')) {
      addError(`${item.code} 是高风险等级，必须包含专家复核路径`)
    }
  }
}

const actionCodes = new Set((operations.actionTemplates || []).map((item) => item.code))
const taskCodes = new Set()
for (const item of tasks.templates || []) {
  if (!isNonEmptyString(item.code)) addError('任务模板存在缺少 code 的条目')
  if (taskCodes.has(item.code)) addError(`任务模板 code 重复：${item.code}`)
  taskCodes.add(item.code)
  if (!actionCodes.has(item.actionCode)) addError(`${item.code} 引用了不存在的 actionCode：${item.actionCode}`)
  if (!Array.isArray(item.applicableCrops) || item.applicableCrops.length === 0) addError(`${item.code} 必须绑定 applicableCrops`)
  if (!Array.isArray(item.scenarios) || item.scenarios.length === 0) addError(`${item.code} 必须绑定 scenarios`)
  if (typeof item.expertReviewRequired !== 'boolean') addError(`${item.code} 必须声明 expertReviewRequired`)
}

const requiredIssueArrays = [
  ['symptoms', '症状'],
  ['possibleCauses', '可能原因'],
  ['captureParts', '需要补拍的部位'],
  ['doNot', '禁止操作']
]
const issueIds = new Set()
for (const issue of issues.issues || []) {
  if (!isNonEmptyString(issue?.id)) addError('问题条目必须有唯一 id')
  if (issue?.id && issueIds.has(issue.id)) addError(`问题条目 id 重复：${issue.id}`)
  if (issue?.id) issueIds.add(issue.id)
  if (!allowedCrops.has(issue?.crop)) addError(`${issue?.id || '问题条目'} 使用了未支持的作物：${issue?.crop || '空值'}`)
  if (!isNonEmptyString(issue?.problem)) addError(`${issue?.id || '问题条目'} 必须填写 problem`)
  if (!['low', 'medium', 'high', 'critical'].includes(issue?.riskLevel)) addError(`${issue?.id || '问题条目'} 的 riskLevel 不合法`)
  for (const [field, label] of requiredIssueArrays) {
    if (!Array.isArray(issue?.[field]) || issue[field].length === 0 || issue[field].some((value) => !isNonEmptyString(value))) {
      addError(`${issue?.id || '问题条目'} 必须填写${label}`)
    }
  }
  if (!isNonEmptyString(issue?.actionWindow)) addError(`${issue?.id || '问题条目'} 必须填写建议处理时间`)
  if (!Array.isArray(issue?.recommendedActions?.immediate) || issue.recommendedActions.immediate.length === 0 || !Array.isArray(issue?.recommendedActions?.followUp) || issue.recommendedActions.followUp.length === 0 || !isNonEmptyString(issue?.recommendedActions?.chemicalBoundary)) {
    addError(`${issue?.id || '问题条目'} 必须填写完整的推荐处理方式`)
  }
  if (!['label_required', 'not_applicable'].includes(issue?.safeInterval?.policy) || !isNonEmptyString(issue?.safeInterval?.displayText)) {
    addError(`${issue?.id || '问题条目'} 必须填写安全间隔期说明`)
  }
  if (typeof issue?.expertReview?.recommended !== 'boolean' || !Array.isArray(issue?.expertReview?.triggers) || issue.expertReview.triggers.length === 0) {
    addError(`${issue?.id || '问题条目'} 必须填写专家复核字段`)
  }
  if (['high', 'critical'].includes(issue?.riskLevel) && issue?.expertReview?.recommended !== true) {
    addError(`${issue.id} 属于高风险问题，必须标记需要专家复核`)
  }
}

function collectRenderableText(value, key = '') {
  if (Array.isArray(value)) return value.flatMap((item) => collectRenderableText(item, key))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([childKey, childValue]) => {
      if (['forbidden', 'mustInclude', 'reviewReason', 'approval', 'releaseRule'].includes(childKey)) return []
      return collectRenderableText(childValue, childKey)
    })
  }
  return typeof value === 'string' && !['code', 'level', 'status', 'type', 'policy'].includes(key) ? [value] : []
}

const renderableText = collectRenderableText({
  riskLevels: operations.riskLevels,
  imageQualityPrompts: operations.imageQualityPrompts,
  actionTemplates: operations.actionTemplates,
  safetyBoundaries: operations.safetyBoundaries,
  expertReviewPrompts: operations.expertReviewPrompts,
  taskTemplates: tasks.templates
}).join('\n')

const forbiddenPatterns = [
  /保证治愈/u,
  /百分之百确诊/u,
  /肯定是/u,
  /照做一定有效/u,
  /无任何风险/u,
  /(?:亩用|每亩(?:使用|用)?|稀释)\s*\d+/u,
  /安全间隔期(?:为|是|需等待)?\s*\d+/u
]
for (const pattern of forbiddenPatterns) {
  if (pattern.test(renderableText)) addError(`可展示文案命中禁止表达：${pattern}`)
}

if (operations.approval?.agronomist?.status !== 'approved') warnings.push('农艺专家尚未确认，当前配置不能进入测试环境')
if (operations.approval?.productOwner?.status !== 'approved') warnings.push('产品负责人尚未批准，当前配置不能进入测试环境')
if (tasks.approval?.agronomist?.status !== 'approved') warnings.push('任务模板尚未完成农艺专家确认')
if (tasks.approval?.productOwner?.status !== 'approved') warnings.push('任务模板尚未完成产品负责人批准')
if (!Array.isArray(issues.issues) || issues.issues.length < 1) addError('issues.v1.json 必须包含至少一条农业问题')
if (!Array.isArray(examples.cases) || examples.cases.length < 1) addError('ai-review-examples.json 必须包含至少一条审核样例')

if (process.argv.includes('--require-approved')) {
  const approved = operations.approval?.agronomist?.status === 'approved' && operations.approval?.productOwner?.status === 'approved' && tasks.approval?.agronomist?.status === 'approved' && tasks.approval?.productOwner?.status === 'approved'
  if (!approved) addError('发布检查要求审批完成，但运营配置或任务模板仍未完成双重审批')
}

if (errors.length > 0) {
  console.error(`内容校验失败：${errors.length} 项错误`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`内容校验通过：${allCodes.size} 条运营内容，${tasks.templates.length} 条任务模板，${examples.cases.length} 条 AI 审核样例`)
}

for (const warning of warnings) console.warn(`提示：${warning}`)
