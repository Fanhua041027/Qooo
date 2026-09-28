const MESSAGE_KEY = 'qd_messages'
const PREFERENCE_KEY = 'qd_message_preferences'

function readMessages() {
  return wx.getStorageSync(MESSAGE_KEY) || []
}

function writeMessages(messages) {
  wx.setStorageSync(MESSAGE_KEY, messages)
}

function pushMessage(input) {
  const messages = readMessages()
  if (input.dedupeKey && messages.some((message) => message.dedupeKey === input.dedupeKey)) return null

  const message = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type: input.type || 'SYSTEM',
    priority: input.priority || 'NORMAL',
    title: input.title,
    body: input.body,
    url: input.url || '',
    dedupeKey: input.dedupeKey || '',
    read: false,
    createdAt: new Date().toISOString()
  }
  writeMessages([message, ...messages])
  return message
}

function listMessages() {
  return readMessages()
}

function getUnreadCount() {
  return readMessages().filter((message) => !message.read).length
}

function markRead(id) {
  writeMessages(readMessages().map((message) => message.id === id ? { ...message, read: true } : message))
}

function markAllRead() {
  writeMessages(readMessages().map((message) => ({ ...message, read: true })))
}

function getPreferences() {
  return wx.getStorageSync(PREFERENCE_KEY) || { taskReminderEnabled: true }
}

function setTaskReminderEnabled(enabled) {
  const preferences = { ...getPreferences(), taskReminderEnabled: enabled }
  wx.setStorageSync(PREFERENCE_KEY, preferences)
  return preferences
}

function syncTaskReminders(tasks, now = Date.now()) {
  const preferences = getPreferences()
  tasks.filter((task) => !task.done && task.dueAt).forEach((task) => {
    const dueAt = new Date(task.dueAt).getTime()
    if (!Number.isFinite(dueAt)) return

    if (dueAt <= now) {
      pushMessage({
        dedupeKey: `task-overdue:${task.id}`,
        type: 'TASK',
        priority: 'HIGH',
        title: '农事任务已逾期',
        body: `${task.title}还没有完成，请尽快处理或调整时间。`,
        url: '/pages/tasks/tasks'
      })
      return
    }

    if (preferences.taskReminderEnabled && dueAt - now <= 24 * 60 * 60 * 1000) {
      pushMessage({
        dedupeKey: `task-upcoming:${task.id}`,
        type: 'TASK',
        title: '农事任务即将到期',
        body: `${task.title}将在 24 小时内到期。`,
        url: '/pages/tasks/tasks'
      })
    }
  })
}

module.exports = {
  pushMessage,
  listMessages,
  getUnreadCount,
  markRead,
  markAllRead,
  getPreferences,
  setTaskReminderEnabled,
  syncTaskReminders
}
