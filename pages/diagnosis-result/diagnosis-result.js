const { getDiagnosis, retryDiagnosis } = require('../../services/diagnosis-service')

const FALLBACK_RESULT = {
  id: 'preview',
  crop: '番茄',
  growthStage: '结果期',
  plot: '东棚 2 号地',
  possibleIssue: { name: '疑似番茄晚疫病', confidence: 0.86, evidence: ['叶片出现水渍状暗斑', '近期高湿环境增加扩散风险', '仍需补拍叶片背面与茎部'] },
  risk: { level: 'MEDIUM', label: '中风险', reason: '病斑有继续扩散的可能，建议今天完成隔离与检查。' },
  actions: [
    { id: 'remove', title: '移除严重病叶', note: '现在处理 · 装袋带离种植区', priority: '立即' },
    { id: 'inspect', title: '检查相邻植株', note: '今天完成 · 重点看叶片背面', priority: '今天' },
    { id: 'review', title: '24 小时后复查', note: '对比病斑范围是否继续扩大', priority: '明天' }
  ]
}

Page({
  data: {
    state: 'success',
    expertOffline: false,
    added: false,
    expanded: false,
    result: FALLBACK_RESULT,
    actions: FALLBACK_RESULT.actions,
    confidencePercent: 86,
    riskType: 'medium'
  },
  onLoad(options) {
    const result = options.id ? getDiagnosis(options.id) : null
    const resolved = result && ['COMPLETED', 'NEED_MORE_IMAGES', 'NEED_EXPERT_REVIEW'].includes(result.backendStatus || result.status)
      ? this.normalizeResult(result)
      : FALLBACK_RESULT
    const savedTasks = wx.getStorageSync('qd_tasks') || []
    this.setData({
      state: result && result.status === 'FAILED' ? 'failed' : options.state || 'success',
      expertOffline: options.state === 'expert-offline',
      expanded: options.state === 'long',
      result: resolved,
      actions: resolved.actions || [],
      confidencePercent: Math.round(((resolved.possibleIssue && resolved.possibleIssue.confidence) || 0) * 100),
      riskType: ((resolved.risk && resolved.risk.level) || 'MEDIUM').toLowerCase(),
      added: savedTasks.some((task) => task.diagnosisId === resolved.id)
    })
  },
  normalizeResult(result) {
    const issue = result.possibleIssue || { name: result.needMoreImages ? '需要补充图片' : '待农技人员复核', confidence: 0, evidence: [] }
    return {
      ...result,
      possibleIssue: issue,
      risk: result.risk || { level: 'LOW', label: '待确认', reason: '当前结果需要结合更多图片或田间信息复核。' },
      actions: result.actions || [],
      crop: result.crop || '待确认作物',
      growthStage: result.growthStage || '待确认',
      plot: result.plot || '未关联地块'
    }
  },
  toggleEvidence() {
    this.setData({ expanded: !this.data.expanded })
  },
  addTask() {
    if (this.data.added) return
    const saved = wx.getStorageSync('qd_tasks') || []
    if (saved.some((task) => task.diagnosisId === this.data.result.id)) {
      this.setData({ added: true })
      wx.showToast({ title: '该建议已创建任务', icon: 'none' })
      return
    }
    const firstAction = this.data.actions[0] || {}
    const dueAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    dueAt.setHours(9, 0, 0, 0)
    const task = {
      id: `diagnosis_${Date.now()}`,
      title: firstAction.title || `复查${this.data.result.crop}异常`,
      time: '明天 09:00',
      plot: this.data.result.plot,
      diagnosisId: this.data.result.id,
      tag: '诊断复查',
      assignee: '陈师傅',
      note: '由诊断处理建议自动创建',
      dueAt: dueAt.toISOString(),
      done: false,
      urgent: true
    }
    wx.setStorageSync('qd_tasks', [task, ...saved])
    this.setData({ added: true })
    wx.showToast({ title: '已加入农事任务', icon: 'success' })
  },
  openTasks() {
    wx.reLaunch({ url: '/pages/tasks/tasks' })
  },
  diagnoseAgain() {
    wx.redirectTo({ url: '/pages/diagnosis/diagnosis' })
  },
  consultExpert() {
    wx.showModal({
      title: this.data.expertOffline ? '专家暂时不在线' : '专家复核尚未接入',
      content: this.data.expertOffline ? '这是专家离线状态演示。真实图文留言与回复将在下一版本接入。' : '当前 MVP 只展示专家复核入口，不会向真实专家发送内容。紧急生产问题请联系当地农技人员。',
      confirmText: '我知道了',
      showCancel: false
    })
  },
  async retryDiagnosis() {
    const diagnosisId = this.data.result.id
    if (!diagnosisId || diagnosisId === 'preview') {
      this.diagnoseAgain()
      return
    }
    const current = getDiagnosis(diagnosisId)
    if (!current || current.source !== 'api') {
      this.diagnoseAgain()
      return
    }
    try {
      await retryDiagnosis(diagnosisId)
      wx.redirectTo({ url: `/pages/diagnosis-processing/diagnosis-processing?id=${diagnosisId}` })
    } catch (error) {
      wx.showToast({ title: error.message || '重新分析失败，请稍后重试', icon: 'none' })
    }
  }
})
