const test = require('node:test')
const assert = require('node:assert/strict')

const storage = new Map()
global.wx = {
  getStorageSync(key) { return storage.get(key) },
  setStorageSync(key, value) { storage.set(key, value) }
}

const messageService = require('../services/message-service')

test('消息按去重键生成并支持已读', () => {
  storage.clear()
  const first = messageService.pushMessage({ dedupeKey: 'diag:1', title: '诊断完成', body: '查看结果' })
  const duplicate = messageService.pushMessage({ dedupeKey: 'diag:1', title: '诊断完成', body: '重复消息' })
  assert.ok(first)
  assert.equal(duplicate, null)
  assert.equal(messageService.getUnreadCount(), 1)
  messageService.markRead(first.id)
  assert.equal(messageService.getUnreadCount(), 0)
})

test('关闭普通提醒后仍保留逾期任务消息', () => {
  storage.clear()
  messageService.setTaskReminderEnabled(false)
  const now = Date.now()
  messageService.syncTaskReminders([
    { id: 'soon', title: '即将到期', done: false, dueAt: new Date(now + 60 * 60 * 1000).toISOString() },
    { id: 'late', title: '已经逾期', done: false, dueAt: new Date(now - 60 * 1000).toISOString() }
  ], now)
  const messages = messageService.listMessages()
  assert.equal(messages.length, 1)
  assert.equal(messages[0].dedupeKey, 'task-overdue:late')
  assert.equal(messages[0].priority, 'HIGH')
})

test('全部已读会清空未读数', () => {
  storage.clear()
  messageService.pushMessage({ title: '消息一', body: '内容' })
  messageService.pushMessage({ title: '消息二', body: '内容' })
  messageService.markAllRead()
  assert.equal(messageService.getUnreadCount(), 0)
})
