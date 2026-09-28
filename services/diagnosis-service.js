const STORAGE_KEY = 'qd_diagnoses'
const { request, uploadDiagnosisImage } = require('./api-service')
const AUDIT_KEY = 'qd_diagnosis_audit'
const { pushMessage } = require('./message-service')
const MAX_IMAGE_BYTES = 10 * 1024 * 1024

function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function readAll() {
  return wx.getStorageSync(STORAGE_KEY) || []
}

function writeAll(records) {
  wx.setStorageSync(STORAGE_KEY, records)
}

function inspectImageQuality({ width = 0, height = 0, size = 0 }) {
  const shortestSide = Math.min(width, height)
  if (size > MAX_IMAGE_BYTES) {
    return {
      status: 'FAILED',
      title: '图片文件过大',
      description: '请压缩照片后重新选择，单张图片不能超过 10 MB。',
      issues: ['IMAGE_TOO_LARGE']
    }
  }

  if (!width || !height) {
    return {
      status: 'WARNING',
      title: '暂时无法完成质量检查',
      description: '可以继续提交，诊断时会再次检查照片质量。',
      issues: ['IMAGE_INFO_UNAVAILABLE']
    }
  }

  if (shortestSide < 480) {
    return {
      status: 'FAILED',
      title: '图片尺寸太小',
      description: '请靠近异常部位重新拍摄，并让叶片、果实或茎秆占据画面中央。',
      issues: ['IMAGE_TOO_SMALL']
    }
  }

  if (shortestSide < 800 || (size > 0 && size < 45 * 1024)) {
    return {
      status: 'WARNING',
      title: '图片细节可能不足',
      description: '建议靠近异常部位重新拍摄；也可以继续提交，并在结果中查看可信程度。',
      issues: ['IMAGE_DETAIL_LIMITED']
    }
  }

  return {
    status: 'PASS',
    title: '照片清晰，可以提交',
    description: '尺寸符合要求，预计能得到较可靠的初步判断。',
    issues: []
  }
}

function createLocalDiagnosis(input) {
  const now = new Date().toISOString()
  const record = {
    id: createId('diag'),
    status: 'PROCESSING',
    createdAt: now,
    updatedAt: now,
    imagePath: input.imagePath,
    plotId: input.plotId,
    crop: input.crop,
    growthStage: input.growthStage || '结果期',
    plot: input.plot,
    quality: input.quality,
    clientRequestId: input.clientRequestId || createId('client'),
    requestId: createId('req'),
    model: { name: 'demo-diagnosis-model', version: 'mock-1.0.0' }
  }

  writeAll([record, ...readAll()])
  return record
}

function createDiagnosis(input) {
  const clientRequestId = input.clientRequestId
  if (clientRequestId) {
    const existing = readAll().find((record) => record.clientRequestId === clientRequestId)
    if (existing) return existing
  }
  if (input.imagePath === 'mock' || String(input.imagePath || '').startsWith('mock://')) return createLocalDiagnosis(input)

  return createRemoteDiagnosis(input)
}

async function createRemoteDiagnosis(input) {

  const uploaded = await uploadDiagnosisImage(input.imagePath)
  const remote = await request({
    path: '/v1/diagnoses',
    method: 'POST',
    timeout: 30000,
    data: {
      clientRequestId: input.clientRequestId || createId('client'),
      plotId: input.plotId,
      cropName: input.crop,
      growthStage: input.growthStage,
      description: input.description || '',
      images: [{
        objectKey: uploaded.objectKey,
        quality: input.quality,
        width: input.width,
        height: input.height
      }]
    }
  })
  const record = normalizeRemoteDiagnosis(remote, input)
  writeAll([record, ...readAll().filter((item) => item.id !== record.id)])
  return record
}

function normalizeRemoteDiagnosis(remote, fallback = {}) {
  const backendStatus = String(remote.status || '').toUpperCase()
  const ai = remote.result || {}
  const issue = (ai.possibleProblems || [])[0]
  const riskLevel = ((issue && issue.riskLevel) || 'low').toUpperCase()
  const actions = (ai.actions || []).map((action, index) => ({
    id: `ai_${index}`,
    type: action.priority === 'now' ? 'DO_NOW' : 'OBSERVE',
    title: action.title,
    note: action.description,
    priority: action.priority === 'now' ? '立即' : action.priority === 'follow_up' ? '后续' : '今天'
  }))
  return {
    id: remote.id,
    source: 'api',
    status: backendStatus === 'FAILED' ? 'FAILED' : backendStatus === 'NEED_MORE_IMAGES' ? 'NEED_MORE_IMAGES' : backendStatus === 'NEED_EXPERT_REVIEW' ? 'NEED_EXPERT_REVIEW' : backendStatus === 'COMPLETED' ? 'COMPLETED' : 'PROCESSING',
    backendStatus,
    createdAt: remote.createdAt || new Date().toISOString(),
    updatedAt: remote.updatedAt || new Date().toISOString(),
    imagePath: fallback.imagePath,
    crop: ai.crop || remote.cropName || fallback.crop || '待确认作物',
    growthStage: ai.stage || remote.growthStage || fallback.growthStage || '待确认',
    plot: fallback.plot || '未关联地块',
    quality: fallback.quality,
    requestId: remote.requestId,
    model: ai.model || {
      name: remote.modelName || 'sn',
      version: remote.modelVersion || 'sn',
      traceId: remote.modelTraceId
    },
    possibleIssue: issue || (backendStatus === 'NEED_MORE_IMAGES'
      ? { name: '需要补充图片', confidence: 0, evidence: ['当前图片不足以形成可靠判断'] }
      : null),
    risk: {
      level: riskLevel,
      label: riskLevel === 'CRITICAL' ? '极高风险' : riskLevel === 'HIGH' ? '高风险' : riskLevel === 'MEDIUM' ? '中风险' : '低风险',
      reason: issue && issue.evidence && issue.evidence[0]
        ? issue.evidence[0]
        : backendStatus === 'NEED_MORE_IMAGES'
          ? '请根据建议补拍后重新提交。'
          : '请结合田间情况继续观察。'
    },
    actions,
    avoidActions: ai.avoidActions || [],
    disclaimer: ai.disclaimer || '以上为辅助判断，请结合当地农技人员意见确认。',
    needExpertReview: Boolean(ai.needExpertReview),
    needMoreImages: Boolean(ai.needMoreImages),
    error: backendStatus === 'FAILED'
      ? { code: remote.failureCode || 'DIAGNOSIS_FAILED', message: remote.failureMessage || '诊断服务暂时不可用' }
      : null
  }
}

async function refreshDiagnosis(id) {
  const current = getDiagnosis(id)
  if (!current || current.source !== 'api') return current
  const remote = await request({ path: `/v1/diagnoses/${id}`, timeout: 30000 })
  const updated = normalizeRemoteDiagnosis(remote, current)
  updateDiagnosis(id, updated)
  return updated
}

async function retryDiagnosis(id) {
  const current = getDiagnosis(id)
  if (!current || current.source !== 'api') return current
  const remote = await request({ path: `/v1/diagnoses/${id}/retry`, method: 'POST' })
  return updateDiagnosis(id, normalizeRemoteDiagnosis(remote, current))
}

function updateDiagnosis(id, patch) {
  let updated = null
  const records = readAll().map((record) => {
    if (record.id !== id) return record
    updated = { ...record, ...patch, updatedAt: new Date().toISOString() }
    return updated
  })
  writeAll(records)
  return updated
}

function completeDiagnosis(id) {
  const updated = updateDiagnosis(id, {
    status: 'COMPLETED',
    possibleIssue: {
      name: '疑似番茄晚疫病',
      confidence: 0.86,
      evidence: [
        '叶片出现水渍状暗斑，病斑边缘颜色较深',
        '近期高湿环境会增加真菌性病害扩散风险',
        '仍需补拍叶片背面与茎部以排除相似问题'
      ]
    },
    risk: {
      level: 'MEDIUM',
      label: '中风险',
      reason: '病斑有继续扩散的可能，建议今天完成隔离与检查。'
    },
    actions: [
      { id: 'remove', type: 'DO_NOW', title: '移除严重病叶', note: '现在处理 · 装袋带离种植区', priority: '立即' },
      { id: 'inspect', type: 'OBSERVE', title: '检查相邻植株', note: '今天完成 · 重点看叶片背面', priority: '今天' },
      { id: 'review', type: 'OBSERVE', title: '24 小时后复查', note: '对比病斑范围是否继续扩大', priority: '明天' }
    ],
    disclaimer: '以上为辅助判断，请结合当地农技人员意见确认。'
  })
  if (updated) {
    pushMessage({
      dedupeKey: `diagnosis-completed:${id}`,
      type: 'DIAGNOSIS',
      priority: updated.risk.level === 'HIGH' ? 'HIGH' : 'NORMAL',
      title: '诊断结果已生成',
      body: `${updated.crop}的初步判断为“${updated.possibleIssue.name}”，${updated.risk.label}。`,
      url: `/pages/diagnosis-result/diagnosis-result?id=${id}`
    })
  }
  return updated
}

function failDiagnosis(id, message = '诊断服务暂时不可用') {
  const updated = updateDiagnosis(id, {
    status: 'FAILED',
    error: { code: 'DIAGNOSIS_FAILED', message }
  })
  if (updated) {
    pushMessage({
      dedupeKey: `diagnosis-failed:${id}`,
      type: 'DIAGNOSIS',
      title: '诊断没有完成',
      body: '照片已经保留，可以稍后重新分析。',
      url: `/pages/diagnosis-processing/diagnosis-processing?id=${id}&state=failed`
    })
  }
  return updated
}

function getDiagnosis(id) {
  return readAll().find((record) => record.id === id) || null
}

function listDiagnoses() {
  return readAll()
}

function removeDiagnosis(id) {
  const records = readAll()
  const target = records.find((record) => record.id === id)
  if (!target) return false

  writeAll(records.filter((record) => record.id !== id))
  const audit = wx.getStorageSync(AUDIT_KEY) || []
  wx.setStorageSync(AUDIT_KEY, [{ action: 'DELETE', diagnosisId: id, occurredAt: new Date().toISOString() }, ...audit])
  return true
}

module.exports = {
  inspectImageQuality,
  createDiagnosis,
  completeDiagnosis,
  refreshDiagnosis,
  retryDiagnosis,
  failDiagnosis,
  getDiagnosis,
  listDiagnoses,
  removeDiagnosis
}
