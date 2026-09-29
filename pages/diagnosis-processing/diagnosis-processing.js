const { completeDiagnosis, failDiagnosis, getDiagnosis, refreshDiagnosis, retryDiagnosis } = require('../../services/diagnosis-service')
const { getNetworkState, subscribeNetwork } = require('../../services/network-service')

Page({
  data: { state: 'analyzing', seconds: 3, stage: 1, diagnosisId: '', preview: false },
  pollAttempts: 0,
  onLoad(options) {
    const state = options.state || 'analyzing'
    const diagnosisId = options.id || ''
    const preview = options.preview === '1'
    this.setData({ state, diagnosisId, preview })
    this.unsubscribeNetwork = subscribeNetwork(({ isOnline }) => this.handleNetworkChange(isOnline))
    if (state !== 'analyzing') return
    if (!preview && (!diagnosisId || !getDiagnosis(diagnosisId))) {
      this.setData({ state: 'failed' })
      return
    }
    this.startAnalysis()
    this.syncNetworkState()
  },
  onUnload() {
    this.clearAnalysisTimers()
    if (this.unsubscribeNetwork) this.unsubscribeNetwork()
  },
  async syncNetworkState() {
    const { isOnline } = await getNetworkState()
    if (!isOnline) this.handleNetworkChange(false)
  },
  handleNetworkChange(isOnline) {
    getApp().globalData.isOnline = isOnline
    if (!isOnline && this.data.state === 'analyzing') {
      this.clearAnalysisTimers()
      this.setData({ state: 'offline' })
      return
    }
    if (isOnline && this.data.state === 'offline') {
      this.setData({ state: 'analyzing' }, () => this.startAnalysis())
      wx.showToast({ title: '网络已恢复，继续分析', icon: 'none' })
    }
  },
  startAnalysis() {
    this.clearAnalysisTimers()
    this.stageTimer = setInterval(() => {
      if (this.data.stage < 3) this.setData({ stage: this.data.stage + 1 })
    }, 650)
    this.timer = setInterval(() => {
      if (this.data.seconds > 1) this.setData({ seconds: this.data.seconds - 1 })
    }, 1000)
    const diagnosis = getDiagnosis(this.data.diagnosisId)
    if (!this.data.preview && diagnosis && diagnosis.source === 'api') {
      this.pollStartedAt = Date.now()
      this.pollAttempts = 0
      this.pollRemoteDiagnosis()
      return
    }
    this.doneTimer = setTimeout(() => {
      if (this.data.preview) {
        wx.redirectTo({ url: '/pages/diagnosis-result/diagnosis-result' })
        return
      }
      const diagnosisId = this.data.diagnosisId
      const result = completeDiagnosis(diagnosisId)
      if (!result) {
        failDiagnosis(diagnosisId)
        this.setData({ state: 'failed' })
        return
      }
      wx.redirectTo({ url: `/pages/diagnosis-result/diagnosis-result?id=${diagnosisId}` })
    }, 2300)
  },
  async pollRemoteDiagnosis() {
    try {
      this.pollAttempts += 1
      const result = await refreshDiagnosis(this.data.diagnosisId)
      if (result && ['COMPLETED', 'NEED_MORE_IMAGES', 'NEED_EXPERT_REVIEW'].includes(result.backendStatus || result.status)) {
        this.clearAnalysisTimers()
        wx.redirectTo({ url: `/pages/diagnosis-result/diagnosis-result?id=${this.data.diagnosisId}` })
        return
      }
      if (!result || result.status === 'FAILED') {
        this.clearAnalysisTimers()
        this.setData({ state: 'failed' })
        return
      }
      if (this.pollAttempts >= 60 || Date.now() - this.pollStartedAt > 90 * 1000) {
        this.clearAnalysisTimers()
        this.setData({ state: 'failed' })
        return
      }
      this.doneTimer = setTimeout(() => this.pollRemoteDiagnosis(), 1500)
    } catch (error) {
      this.clearAnalysisTimers()
      this.setData({ state: error.code === 'NETWORK_ERROR' ? 'offline' : 'failed' })
    }
  },
  clearAnalysisTimers() {
    clearInterval(this.stageTimer)
    clearInterval(this.timer)
    clearTimeout(this.doneTimer)
  },
  async retry() {
    const { isOnline } = await getNetworkState()
    if (!isOnline) {
      this.setData({ state: 'offline' })
      wx.showToast({ title: '仍未连接网络', icon: 'none' })
      return
    }
    if (!this.data.preview && (!this.data.diagnosisId || !getDiagnosis(this.data.diagnosisId))) {
      this.setData({ state: 'failed' })
      return
    }
    const diagnosis = getDiagnosis(this.data.diagnosisId)
    if (diagnosis && diagnosis.source === 'api' && ['FAILED', 'NEED_MORE_IMAGES'].includes(diagnosis.backendStatus)) {
      try {
        await retryDiagnosis(this.data.diagnosisId)
      } catch (error) {
        wx.showToast({ title: error.message || '重试失败', icon: 'none' })
        return
      }
    }
    this.setData({ state: 'analyzing', seconds: 3, stage: 1 }, () => this.startAnalysis())
  },
  backToPhoto() { wx.redirectTo({ url: '/pages/diagnosis/diagnosis?state=ready' }) },
  goHome() { wx.redirectTo({ url: '/pages/index/index' }) }
})
