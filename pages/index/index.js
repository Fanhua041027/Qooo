const { listDiagnoses } = require('../../services/diagnosis-service')
const { getUnreadCount } = require('../../services/message-service')
const { getCurrentUser } = require('../../services/auth-service')
const { getFarm } = require('../../services/farm-service')
const { getNetworkState, subscribeNetwork } = require('../../services/network-service')

Page({
  data: {
    state: 'normal',
    contentState: 'normal',
    first: false,
    userName: '农户',
    farm: { name: '河湾家庭农场', plot: '东棚 2 号地', crop: '番茄 · 结果期' },
    recentDiagnosis: null,
    unreadCount: 0,
    tasks: [
      { id: 'task_1', title: '检查东棚相邻植株', time: '今天 17:30', status: '待处理' },
      { id: 'task_2', title: '记录叶片病斑变化', time: '明天 09:00', status: '待处理' }
    ]
  },
  onLoad(options) {
    if (!getCurrentUser()) {
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    const contentState = options.state && options.state !== 'offline' ? options.state : 'normal'
    this.setData({ state: options.state || 'normal', contentState, first: options.first === '1', userName: getCurrentUser().name || '农户' })
    this.unsubscribeNetwork = subscribeNetwork(({ isOnline }) => this.handleNetworkChange(isOnline))
    if (!options.state) this.syncNetworkState()
    if (options.first === '1') setTimeout(() => wx.showToast({ title: '欢迎使用农间诊', icon: 'success' }), 300)
  },
  onShow() {
    const recentDiagnosis = listDiagnoses().find((item) => item.status === 'COMPLETED') || null
    const farmRecord = getFarm()
    const firstPlot = (farmRecord.plots || [])[0]
    const farm = firstPlot
      ? { name: farmRecord.name, plot: firstPlot.name, crop: `${firstPlot.crop} · ${firstPlot.growthStage}` }
      : { name: farmRecord.name, plot: '还没有地块', crop: '添加地块后开始诊断' }
    const savedTasks = wx.getStorageSync('qd_tasks') || []
    const tasks = savedTasks.length ? savedTasks.filter((item) => !item.done).slice(0, 3).map((item) => ({ ...item, status: item.done ? '已完成' : '待处理' })) : this.data.tasks
    this.setData({ recentDiagnosis, unreadCount: getUnreadCount(), tasks, farm })
  },
  onUnload() { if (this.unsubscribeNetwork) this.unsubscribeNetwork() },
  async syncNetworkState() {
    const { isOnline } = await getNetworkState()
    this.handleNetworkChange(isOnline, false)
  },
  handleNetworkChange(isOnline, notify = true) {
    getApp().globalData.isOnline = isOnline
    if (!isOnline) {
      this.setData({ state: 'offline' })
      return
    }
    if (this.data.state === 'offline') {
      this.setData({ state: this.data.contentState })
      if (notify) wx.showToast({ title: '网络已恢复', icon: 'success' })
    }
  },
  startDiagnosis() { wx.navigateTo({ url: '/pages/diagnosis/diagnosis' }) },
  openHistory() { wx.navigateTo({ url: '/pages/diagnosis-history/diagnosis-history' }) },
  openFarm() { wx.reLaunch({ url: '/pages/farm/farm' }) },
  openTasks() { wx.reLaunch({ url: '/pages/tasks/tasks' }) },
  openKnowledge() { wx.navigateTo({ url: '/pages/knowledge-detail/knowledge-detail' }) },
  async retryNetwork() {
    const { isOnline } = await getNetworkState()
    if (!isOnline) {
      wx.showToast({ title: '仍未连接网络', icon: 'none' })
      return
    }
    this.handleNetworkChange(true)
  }
})
