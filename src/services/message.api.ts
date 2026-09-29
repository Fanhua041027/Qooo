import type { Notification } from '@nongjianzhen/types'
import { apiClient } from './client'

export const messageApi = {
  list: () => apiClient.listMessages(),
  unreadCount: () => apiClient.unreadMessageCount(),
  markRead: (messageId: string) => apiClient.markMessageRead(messageId),
  markAllRead: () => apiClient.markAllMessagesRead(),
  getPreferences: () => apiClient.getMessagePreferences(),
  updatePreferences: (input: Parameters<typeof apiClient.updateMessagePreferences>[0]) => apiClient.updateMessagePreferences(input)
}

export function isMessageUnread(message: Notification) {
  return !message.readAt
}
