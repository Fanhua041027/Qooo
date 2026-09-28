import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FarmTask, UpdateTaskInput } from '@nongjianzhen/types'
import { TaskItem } from '@/components/business/TaskItem'
import { EmptyState } from '@/components/qd-ui/EmptyState'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { taskApi } from '@/services/task.api'
import { useAuthStore } from '@/store/auth.store'
import { track } from '@/utils/analytics'
import './index.scss'

export default function TasksPage() {
  const identity = useAuthStore((state) => state.identity)
  const [items, setItems] = useState<FarmTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'PENDING' | 'OVERDUE' | 'COMPLETED'>('PENDING')
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null)
  const completingTaskRef = useRef<string | null>(null)
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null)
  const updatingTaskRef = useRef<string | null>(null)
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
      const response = await taskApi.list()
      setItems(response.data.items)
      setError('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '任务加载失败')
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

  const visibleItems = useMemo(() => items.filter((item) => {
    if (filter === 'COMPLETED') return item.status === 'COMPLETED'
    if (filter === 'OVERDUE') return item.status === 'OVERDUE'
    return item.status !== 'COMPLETED'
  }), [filter, items])
  const pendingCount = items.filter((item) => item.status !== 'COMPLETED').length
  const completedCount = items.filter((item) => item.status === 'COMPLETED').length
  const overdueCount = items.filter((item) => item.status === 'OVERDUE').length

  const complete = async (task: FarmTask, note?: string) => {
    if (completingTaskRef.current) return
    completingTaskRef.current = task.id
    setCompletingTaskId(task.id)
    try {
      await taskApi.complete(task.id, note)
      track('task_completed', { taskId: task.id })
      await load()
      Taro.showToast({ title: '任务已完成', icon: 'success' })
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '操作失败', icon: 'none' })
    } finally {
      completingTaskRef.current = null
      setCompletingTaskId(null)
    }
  }

  const update = async (task: FarmTask, input: UpdateTaskInput): Promise<boolean> => {
    if (updatingTaskRef.current) return false
    updatingTaskRef.current = task.id
    setUpdatingTaskId(task.id)
    try {
      await taskApi.update(task.id, input)
      track('task_updated', { taskId: task.id })
      await load()
      Taro.showToast({ title: '任务已更新', icon: 'success' })
      return true
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '任务更新失败', icon: 'none' })
      return false
    } finally {
      updatingTaskRef.current = null
      setUpdatingTaskId(null)
    }
  }

  if (!identity) {
    return <View className='page'><EmptyState title='登录后查看任务' description='诊断建议可一键转成农事任务。' actionLabel='去登录' onAction={() => Taro.switchTab({ url: '/pages/profile/index' })} /></View>
  }

  return (
    <View className='page tasks-page'>
      <Text className='page-title'>农事任务</Text>
      <Text className='page-description'>把诊断建议变成可执行、可追踪的行动。</Text>
      <View className='tasks-overview'>
        <View><Text className='tasks-overview__value'>{pendingCount}</Text><Text className='tasks-overview__label'>待处理</Text></View>
        <View><Text className='tasks-overview__value'>{completedCount}</Text><Text className='tasks-overview__label'>已完成</Text></View>
        <View><Text className={`tasks-overview__value ${overdueCount ? 'tasks-overview__value--warning' : ''}`}>{overdueCount}</Text><Text className='tasks-overview__label'>已逾期</Text></View>
      </View>
      <View className='tasks-filter' role='tablist' aria-label='农事任务筛选'>
        <View className={filter === 'PENDING' ? 'tasks-filter__active' : ''} role='tab' aria-selected={filter === 'PENDING'} onClick={() => setFilter('PENDING')}><Text>待处理</Text><Text className='tasks-filter__count'>{pendingCount}</Text></View>
        <View className={filter === 'OVERDUE' ? 'tasks-filter__active' : ''} role='tab' aria-selected={filter === 'OVERDUE'} onClick={() => setFilter('OVERDUE')}><Text>已逾期</Text><Text className='tasks-filter__count'>{overdueCount}</Text></View>
        <View className={filter === 'COMPLETED' ? 'tasks-filter__active' : ''} role='tab' aria-selected={filter === 'COMPLETED'} onClick={() => setFilter('COMPLETED')}><Text>已完成</Text><Text className='tasks-filter__count'>{completedCount}</Text></View>
      </View>
      {loading ? <LoadingState /> : error && items.length === 0 ? <ErrorState title='任务加载失败' message={error} onRetry={load} /> : visibleItems.length === 0 ? (
        <EmptyState title={filter === 'PENDING' ? '当前没有待处理任务' : filter === 'OVERDUE' ? '暂无逾期任务' : '还没有完成记录'} description={filter === 'PENDING' ? '从诊断结果创建任务，避免错过处理窗口。' : filter === 'OVERDUE' ? '按计划完成任务，逾期事项会集中显示在这里。' : '完成任务后，记录会显示在这里。'} actionLabel={filter === 'PENDING' ? '开始诊断' : undefined} onAction={filter === 'PENDING' ? () => Taro.switchTab({ url: '/pages/diagnosis/index' }) : undefined} />
      ) : (
        <View>{error ? <View className='tasks-stale' role='status'><Text>网络暂时不可用，以下是最近一次同步的任务。</Text><Text className='tasks-stale__action' onClick={load}>重试</Text></View> : null}<View className='surface tasks-list'>{visibleItems.map((task) => <TaskItem key={task.id} task={task} loading={completingTaskId === task.id} updating={updatingTaskId === task.id} onComplete={task.status !== 'COMPLETED' ? (note) => complete(task, note) : undefined} onUpdate={task.status !== 'COMPLETED' ? (input) => update(task, input) : undefined} />)}</View></View>
      )}
    </View>
  )
}
