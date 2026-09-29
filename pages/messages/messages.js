const {
  listMessages,
  markRead,
  markAllRead,
  getPreferences,
  setTaskReminderEnabled,
  syncTaskReminders
} = require('../../services/message-service')

Page({
  data: {
    messages: [],
    unreadCount: 0,
    taskReminderEnabled: true
  },
  onShow() {
    const tasks = wx.getStorageSync('qd_tasks') || []
    syncTaskReminders(tasks)
    this.refresh()
  },
  refresh() {
    const messages = listMessages().map((message) => ({ ...message, time: this.formatTime(message.createdAt) }))
    this.setData({
      messages,
      unreadCount: messages.filter((message) => !message.read).length,
      taskReminderEnabled: getPreferences().taskReminderEnabled
    })
  },
  formatTime(value) {
    const date = new Date(value)
    return `${date.getMonth() + 1} 月 ${date.getDate()} 日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  },
  openMessage(event) {
    const message = this.data.messages.find((item) => item.id === event.currentTarget.dataset.id)
    if (!message) return
    markRead(message.id)
    this.refresh()
    if (message.url) wx.navigateTo({ url: message.url, fail: () => wx.reLaunch({ url: message.url }) })
  },
  readAll() {
    markAllRead()
    this.refresh()
  },
  toggleTaskReminder(event) {
    setTaskReminderEnabled(event.detail.value)
    this.setData({ taskReminderEnabled: event.detail.value })
  },
  startDiagnosis() { wx.navigateTo({ url: '/pages/diagnosis/diagnosis' }) }
})
