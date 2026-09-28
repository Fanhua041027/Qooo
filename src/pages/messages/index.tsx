import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Notification } from '@nongjianzhen/types'
import { Badge } from '@/components/qd-ui/Badge'
import { Button } from '@/components/qd-ui/Button'
import { EmptyState } from '@/components/qd-ui/EmptyState'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { messageApi, isMessageUnread } from '@/services/message.api'
import { useAuthStore } from '@/store/auth.store'
import { formatDateTime } from '@/utils/format'
import './index.scss'

const typeLabels: Record<Notification['type'], string> = {
  DIAGNOSIS_COMPLETED: '诊断完成',
  DIAGNOSIS_FAILED: '诊断提醒',
  TASK_DUE: '任务提醒',
  TASK_OVERDUE: '逾期提醒',
  SYSTEM: '系统消息'
}

export default function MessagesPage() {
  const identity = useAuthStore((state) => state.identity)
  const [items, setItems] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [markingAllRead, setMarkingAllRead] = useState(false)
  const loadedIdentityRef = useRef<string>()

  const load = useCallback(async () => {
    if (!identity) {
      loadedIdentityRef.current = undefined
      setItems([])
      setError('')
      setLoading(false)
      Taro.stopPullDownRefresh()
      return
    }
    loadedIdentityRef.current = identity.userId
    try {
      const response = await messageApi.list()
      setItems(response.data.items)
      setError('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '消息加载失败')
    } finally {
      setLoading(false)
      Taro.stopPullDownRefresh()
    }
  }, [identity])

  useDidShow(load)
  usePullDownRefresh(load)

  useEffect(() => {
    if (!identity) {
      loadedIdentityRef.current = undefined
      return
    }
    if (loadedIdentityRef.current !== identity.userId) {
      setLoading(true)
      void load()
    }
  }, [identity, load])

  const markRead = async (message: Notification) => {
    if (!isMessageUnread(message)) return
    try {
      await messageApi.markRead(message.id)
      setItems((current) => current.map((item) => item.id === message.id ? { ...item, readAt: new Date().toISOString() } : item))
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '消息状态更新失败', icon: 'none' })
    }
  }

  const markAllRead = async () => {
    if (markingAllRead) return
    const unread = items.filter(isMessageUnread)
    if (unread.length === 0) return
    setMarkingAllRead(true)
    try {
      await Promise.all(unread.map((message) => messageApi.markRead(message.id)))
      setItems((current) => current.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() })))
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '全部已读失败', icon: 'none' })
    } finally {
      setMarkingAllRead(false)
    }
  }

  const openMessage = async (message: Notification) => {
    await markRead(message)
    if (message.targetType === 'diagnosis' && message.targetId) {
      Taro.navigateTo({ url: `/pages/diagnosis-result/index?id=${message.targetId}` })
    } else if (message.targetType === 'task') {
      Taro.switchTab({ url: '/pages/tasks/index' })
    }
  }

  const unreadCount = items.filter(isMessageUnread).length

  if (!identity) {
    return <View className='page'><EmptyState title='登录后查看消息' description='诊断结果和任务提醒会保存在这里。' actionLabel='去登录' onAction={() => Taro.switchTab({ url: '/pages/profile/index' })} /></View>
  }

  return (
    <View className='page messages-page'>
      <View className='messages-heading'>
        <View>
          <Text className='page-title'>消息与提醒</Text>
          <Text className='page-description'>{unreadCount ? `${unreadCount} 条未读，处理后会自动归档` : '诊断和农事任务的状态都会在这里留下记录。'}</Text>
        </View>
        {unreadCount ? <Button variant='ghost' loading={markingAllRead} onClick={markAllRead}>全部已读</Button> : null}
      </View>

      {loading ? <LoadingState label='正在加载消息' /> : error && items.length === 0 ? <ErrorState title='消息暂时无法加载' message={error} onRetry={load} /> : items.length === 0 ? (
        <EmptyState title='还没有消息' description='诊断完成、诊断失败或任务临期时，提醒会出现在这里。' actionLabel='开始一次诊断' onAction={() => Taro.switchTab({ url: '/pages/diagnosis/index' })} />
      ) : (
        <View className='messages-list'>
          {error ? <View className='messages-stale'><Text>网络暂时不可用，以下是最近同步的消息。</Text><Text className='messages-stale__action' onClick={load}>重试</Text></View> : null}
          {items.map((message) => {
            const unread = isMessageUnread(message)
            return (
              <View className={`message-item ${unread ? 'message-item--unread' : ''}`} key={message.id} onClick={() => openMessage(message)}>
                <View className={`message-item__mark message-item__mark--${message.type}`}><Text>{unread ? '新' : '已'}</Text></View>
                <View className='message-item__body'>
                  <View className='message-item__top'><Text className='message-item__title'>{message.title}</Text>{unread ? <Badge tone='info'>未读</Badge> : null}</View>
                  <Text className='message-item__type'>{typeLabels[message.type]} · {formatDateTime(message.createdAt)}</Text>
                  <Text className='message-item__content'>{message.content}</Text>
                </View>
                <Text className='message-item__arrow'>›</Text>
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}
