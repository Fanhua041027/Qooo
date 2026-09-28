import type { Notification } from '@nongjianzhen/types'
import { apiClient } from './client'

export const messageApi = {
  list: () => apiClient.listMessages(),
  unreadCount: () => apiClient.unreadMessageCount(),
  markRead: (messageId: string) => apiClient.markMessageRead(messageId)
}

export function isMessageUnread(message: Notification) {
  return !message.readAt
}
