const { inspectImageQuality, createDiagnosis } = require('../../services/diagnosis-service')
const { saveImageForHistory, getImageInfo } = require('../../services/media-service')
const { getNetworkState, subscribeNetwork } = require('../../services/network-service')
const { getFarm } = require('../../services/farm-service')

Page({
  data: {
    state: 'default',
    imagePath: '',
    crop: '番茄',
    growthStage: '结果期',
    plot: '东棚 2 号地',
    plotId: '',
    plotOptions: [],
    uploading: false,
    qualityChecking: false,
    quality: null,
    imageWidth: 0,
    imageHeight: 0,
    resumeState: 'default',
    clientRequestId: ''
  },
  submitLock: false,
  onLoad(options) {
    const state = options.state || 'default'
    const hasMockImage = ['blur', 'invalid', 'ready', 'uploading'].includes(state)
    const quality = hasMockImage ? this.getPreviewQuality(state) : null
    const farm = getFarm()
    const plotOptions = (farm.plots || []).map((plot) => ({ id: plot.id, label: `${plot.name} · ${plot.crop}`, crop: plot.crop, growthStage: plot.growthStage }))
    const selectedPlot = plotOptions[0]
    this.setData({
      state,
      imagePath: hasMockImage ? 'mock' : '',
      quality,
      plotOptions,
      plotId: selectedPlot ? selectedPlot.id : '',
      plot: selectedPlot ? selectedPlot.label.split(' · ')[0] : '未指定地块',
      crop: selectedPlot ? selectedPlot.crop : '番茄',
      growthStage: selectedPlot ? selectedPlot.growthStage : '结果期'
    })
    this.unsubscribeNetwork = subscribeNetwork(({ isOnline }) => this.handleNetworkChange(isOnline))
    if (!options.state) this.syncNetworkState()
  },
  onUnload() {
    clearTimeout(this.submitTimer)
    if (this.unsubscribeNetwork) this.unsubscribeNetwork()
  },
  async syncNetworkState() {
    const { isOnline } = await getNetworkState()
    this.handleNetworkChange(isOnline, false)
  },
  async retryNetwork() {
    const { isOnline } = await getNetworkState()
    if (!isOnline) {
      wx.showToast({ title: '仍未连接网络', icon: 'none' })
      return
    }
    this.handleNetworkChange(true)
  },
  handleNetworkChange(isOnline, notify = true) {
    getApp().globalData.isOnline = isOnline
    if (!isOnline) {
      clearTimeout(this.submitTimer)
      const resumeState = this.data.state === 'offline' ? this.data.resumeState : this.data.state
      this.setData({ state: 'offline', resumeState, uploading: false })
      return
    }
    if (this.data.state === 'offline') {
      const nextState = this.data.imagePath ? (this.data.resumeState === 'invalid' ? 'invalid' : this.data.quality && this.data.quality.status === 'WARNING' ? 'blur' : 'ready') : 'default'
      this.setData({ state: nextState })
      if (notify) wx.showToast({ title: '网络已恢复，可继续提交', icon: 'none' })
    }
  },
  getPreviewQuality(state) {
    if (state === 'invalid') return { status: 'FAILED', title: '没有识别到作物主体', description: '请让叶片、果实或茎秆占据画面中央，避免拍摄过远。', issues: ['SUBJECT_NOT_FOUND'] }
    if (state === 'blur') return { status: 'WARNING', title: '图片细节可能不足', description: '建议靠近异常部位重新拍摄；也可以继续提交。', issues: ['IMAGE_DETAIL_LIMITED'] }
    return { status: 'PASS', title: '照片清晰，可以提交', description: '尺寸符合要求，预计能得到较可靠的初步判断。', issues: [] }
  },
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success: async ({ tempFiles }) => {
        const selected = tempFiles[0]
        if (!selected || !selected.tempFilePath) return
        this.setData({ imagePath: selected.tempFilePath, state: 'checking', qualityChecking: true, quality: null, clientRequestId: '' })
        const [savedPath, imageInfo] = await Promise.all([
          saveImageForHistory(selected.tempFilePath),
          getImageInfo(selected.tempFilePath)
        ])
        this.setData({ imagePath: savedPath, imageWidth: imageInfo.width || 0, imageHeight: imageInfo.height || 0 })
        this.applyQuality(inspectImageQuality({ ...imageInfo, size: selected.size || 0 }))
      },
      fail: (err) => {
        const message = String((err && err.errMsg) || '')
        if (/auth deny|authorize|permission|camera|album|相机|相册|摄像头/i.test(message)) this.setData({ state: 'permission' })
      }
    })
  },
  applyQuality(quality) {
    const state = quality.status === 'FAILED' ? 'invalid' : quality.status === 'WARNING' ? 'blur' : 'ready'
    this.setData({ quality, state, qualityChecking: false })
  },
  useMockImage() { this.setData({ imagePath: 'mock', state: 'ready', quality: this.getPreviewQuality('ready') }) },
  removeImage() { this.setData({ imagePath: '', state: 'default', quality: null, qualityChecking: false, imageWidth: 0, imageHeight: 0, clientRequestId: '' }) },
  retake() { this.setData({ imagePath: '', state: 'default', quality: null, qualityChecking: false, imageWidth: 0, imageHeight: 0, clientRequestId: '' }); this.chooseImage() },
  openSettings() {
    wx.openSetting({
      success: ({ authSetting }) => {
        const granted = authSetting && (authSetting['scope.camera'] || authSetting['scope.album'])
        if (granted) {
          this.setData({ state: this.data.imagePath ? 'ready' : 'default' })
          wx.showToast({ title: '照片权限已恢复', icon: 'success' })
        } else {
          wx.showToast({ title: '仍未获得照片权限', icon: 'none' })
        }
      },
      fail: () => wx.showToast({ title: '暂时无法打开设置，请稍后重试', icon: 'none' })
    })
  },
  choosePlot() {
    if (!this.data.plotOptions.length) {
      wx.showToast({ title: '还没有地块，可以先跳过', icon: 'none' })
      return
    }
    wx.showActionSheet({
      itemList: this.data.plotOptions.map((item) => item.label),
      success: ({ tapIndex }) => {
        const selected = this.data.plotOptions[tapIndex]
        if (!selected) return
        this.setData({ plotId: selected.id, plot: selected.label.split(' · ')[0], crop: selected.crop, growthStage: selected.growthStage })
      }
    })
  },
  async submit() {
    if (this.submitLock || !this.data.imagePath || this.data.uploading || this.data.state === 'invalid') return
    if (!getApp().globalData.isOnline) {
      this.handleNetworkChange(false)
      return
    }
    this.submitLock = true
    const clientRequestId = this.data.clientRequestId || `client_diag_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    this.setData({ uploading: true, state: 'uploading', clientRequestId })
    try {
      const diagnosis = await createDiagnosis({
        imagePath: this.data.imagePath,
        crop: this.data.crop,
        growthStage: this.data.growthStage,
        plot: this.data.plot,
        plotId: this.data.plotId,
        quality: this.data.quality,
        width: this.data.imageWidth,
        height: this.data.imageHeight,
        clientRequestId
      })
      this.submitTimer = setTimeout(() => wx.redirectTo({ url: `/pages/diagnosis-processing/diagnosis-processing?id=${diagnosis.id}` }), 300)
    } catch (error) {
      this.submitLock = false
      const offline = error.code === 'NETWORK_ERROR'
      this.setData({ uploading: false, state: offline ? 'offline' : 'ready' })
      wx.showModal({
        title: '提交失败',
        content: error.message || '诊断服务暂时不可用，请稍后重试。',
        showCancel: false
      })
    }
  }
})
