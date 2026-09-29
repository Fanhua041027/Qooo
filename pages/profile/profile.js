const { getUnreadCount, syncTaskReminders } = require('../../services/message-service')
const { logout, requireAuth } = require('../../services/auth-service')

Page({
  data: { unreadCount: 0 },
  onLoad() { requireAuth() },
  onShow() {
    syncTaskReminders(wx.getStorageSync('qd_tasks') || [])
    this.setData({ unreadCount: getUnreadCount() })
  },
  editProfile() { wx.showToast({ title: '资料编辑将在下一版接入', icon: 'none' }) },
  openHistory() { wx.navigateTo({ url: '/pages/diagnosis-history/diagnosis-history' }) },
  openFarm() { wx.redirectTo({ url: '/pages/farm/farm' }) },
  openTasks() { wx.redirectTo({ url: '/pages/tasks/tasks' }) },
  openStates() { wx.navigateTo({ url: '/pages/ui-states/ui-states' }) },
  showMessages() { wx.navigateTo({ url: '/pages/messages/messages' }) },
  showHelp() { wx.showModal({ title: '需要帮助？', content: '原型阶段可通过项目测试群反馈问题。紧急农业生产问题请联系当地农技人员。', showCancel: false }) },
  logout() { wx.showModal({ title: '退出登录', content: '退出后不会删除已保存的诊断和农场数据。', confirmText: '退出', success: ({ confirm }) => { if (confirm) { logout(); wx.redirectTo({ url: '/pages/login/login' }) } } }) }
})
