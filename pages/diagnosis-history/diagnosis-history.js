const { listDiagnoses, removeDiagnosis } = require('../../services/diagnosis-service')
const { getNetworkState } = require('../../services/network-service')
const { requireAuth } = require('../../services/auth-service')

Page({
  data: {
    state: 'normal',
    forceEmpty: false,
    activeFilter: '全部',
    filters: ['全部', '待复查', '高风险'],
    records: [],
    visibleRecords: []
  },
  onLoad(options) {
    if (!requireAuth()) return
    this.setData({ state: options.state || 'normal', forceEmpty: options.state === 'empty' })
  },
  onShow() {
    if (this.data.forceEmpty) {
      this.setData({ records: [], visibleRecords: [], state: 'empty' })
      return
    }
    const records = listDiagnoses().map((item) => this.toListItem(item))
    const state = records.length ? (this.data.state === 'offline' ? 'offline' : 'normal') : 'empty'
    this.setData({ records, state }, () => this.applyFilter())
  },
  formatTime(value) {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '时间未知'
    return `${date.getMonth() + 1} 月 ${date.getDate()} 日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  },
  toListItem(item) {
    if (item.status === 'PROCESSING') {
      return { id: item.id, status: item.status, crop: item.crop || '未填写作物', result: '正在分析作物异常', risk: '处理中', riskType: 'info', plot: item.plot || '未指定地块', time: this.formatTime(item.createdAt), action: '继续查看分析进度', imagePath: item.imagePath || '', imageBroken: false }
    }
    if (item.status === 'FAILED') {
      return { id: item.id, status: item.status, crop: item.crop || '未填写作物', result: '这次诊断没有完成', risk: '需重试', riskType: 'danger', plot: item.plot || '未指定地块', time: this.formatTime(item.createdAt), action: '重新提交诊断', imagePath: item.imagePath || '', imageBroken: false }
    }
    return {
      id: item.id,
      status: item.status,
      crop: item.crop || '未填写作物',
      result: item.possibleIssue && item.possibleIssue.name ? item.possibleIssue.name : '需要人工复核',
      risk: item.risk && item.risk.label ? item.risk.label : '待复核',
      riskType: item.risk && item.risk.level ? item.risk.level.toLowerCase() : 'neutral',
      plot: item.plot || '未指定地块',
      time: this.formatTime(item.createdAt),
      action: item.actions && item.actions[0] ? item.actions[0].title : '查看处理建议',
      imagePath: item.imagePath || '',
      imageBroken: false
    }
  },
  setFilter(e) { this.setData({ activeFilter: e.currentTarget.dataset.value }, () => this.applyFilter()) },
  applyFilter() {
    const { records, activeFilter } = this.data
    const visibleRecords = records.filter((item) => {
      if (activeFilter === '高风险') return item.riskType === 'high'
      if (activeFilter === '待复查') return item.status === 'FAILED' || ['medium', 'high'].includes(item.riskType)
      return true
    })
    this.setData({ visibleRecords })
  },
  clearFilter() { this.setData({ activeFilter: '全部' }, () => this.applyFilter()) },
  handleImageError(e) {
    const id = e.currentTarget.dataset.id
    const markBroken = (item) => item.id === id ? { ...item, imageBroken: true } : item
    this.setData({ records: this.data.records.map(markBroken), visibleRecords: this.data.visibleRecords.map(markBroken) })
  },
  openRecord(e) {
    const { id, status } = e.currentTarget.dataset
    if (status === 'COMPLETED') {
      wx.navigateTo({ url: `/pages/diagnosis-result/diagnosis-result?id=${id}` })
      return
    }
    const state = status === 'FAILED' ? '&state=failed' : ''
    wx.navigateTo({ url: `/pages/diagnosis-processing/diagnosis-processing?id=${id}${state}` })
  },
  deleteRecord(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除诊断记录？',
      content: '删除后将不再显示这条诊断，但系统会保留删除操作记录。',
      confirmText: '删除',
      confirmColor: '#B63F37',
      success: ({ confirm }) => {
        if (!confirm || !removeDiagnosis(id)) return
        wx.showToast({ title: '已删除', icon: 'success' })
        this.onShow()
      }
    })
  },
  startDiagnosis() { wx.reLaunch({ url: '/pages/diagnosis/diagnosis' }) },
  async retry() {
    const { isOnline } = await getNetworkState()
    if (!isOnline) {
      wx.showToast({ title: '仍未连接网络', icon: 'none' })
      return
    }
    this.setData({ state: this.data.records.length ? 'normal' : 'empty' })
    wx.showToast({ title: '网络已恢复', icon: 'success' })
  }
})
