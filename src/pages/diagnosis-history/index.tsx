import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { DiagnosisRecord } from '@nongjianzhen/types'
import { DiagnosisCard } from '@/components/business/DiagnosisCard'
import { EmptyState } from '@/components/qd-ui/EmptyState'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { diagnosisApi } from '@/services/diagnosis.api'
import { useAuthStore } from '@/store/auth.store'
import './index.scss'

type HistoryFilter = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'ATTENTION'

const filterLabels: Record<HistoryFilter, string> = {
  ALL: '全部',
  ACTIVE: '处理中',
  COMPLETED: '已完成',
  ATTENTION: '需关注'
}

export default function DiagnosisHistoryPage() {
  const identity = useAuthStore((state) => state.identity)
  const [items, setItems] = useState<DiagnosisRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const loadedIdentityRef = useRef<string>()
  const [filter, setFilter] = useState<HistoryFilter>('ALL')

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
      const response = await diagnosisApi.list()
      setItems(response.data.items)
      setError('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '历史记录加载失败')
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

  const filteredItems = useMemo(() => items.filter((item) => {
    if (filter === 'ALL') return true
    if (filter === 'ACTIVE') return item.status === 'PENDING' || item.status === 'PROCESSING'
    if (filter === 'COMPLETED') return item.status === 'COMPLETED'
    return item.status === 'FAILED' || item.status === 'NEED_MORE_IMAGES' || item.status === 'NEED_EXPERT_REVIEW'
  }), [filter, items])

  const filterCounts: Record<HistoryFilter, number> = {
    ALL: items.length,
    ACTIVE: items.filter((item) => item.status === 'PENDING' || item.status === 'PROCESSING').length,
    COMPLETED: items.filter((item) => item.status === 'COMPLETED').length,
    ATTENTION: items.filter((item) => item.status === 'FAILED' || item.status === 'NEED_MORE_IMAGES' || item.status === 'NEED_EXPERT_REVIEW').length
  }

  if (!identity) {
    return <View className='page'><EmptyState title='登录后查看诊断历史' description='登录后可以保存诊断结果，并在复查时对比变化。' actionLabel='去登录' onAction={() => Taro.switchTab({ url: '/pages/profile/index' })} /></View>
  }

  return (
    <View className='page history-page'>
      <Text className='page-title'>诊断历史</Text>
      <Text className='page-description'>按时间倒序保存，方便复查处理前后的变化。</Text>
      {loading ? <LoadingState /> : error && items.length === 0 ? <ErrorState title='诊断历史加载失败' message={error} onRetry={load} /> : items.length === 0 ? (
        <EmptyState title='还没有诊断记录' description='拍一张异常部位，完成第一次辅助诊断。' actionLabel='开始诊断' onAction={() => Taro.switchTab({ url: '/pages/diagnosis/index' })} />
      ) : (
        <View>
          {error ? <View className='history-stale' role='status'><Text>网络暂时不可用，以下是最近一次同步的记录。</Text><Text className='history-stale__action' onClick={load}>重试</Text></View> : null}
          <View className='history-filter' role='tablist' aria-label='诊断记录筛选'>
            {(Object.keys(filterLabels) as HistoryFilter[]).map((key) => (
              <View key={key} className={`history-filter__item ${filter === key ? 'history-filter__item--active' : ''}`} role='tab' aria-selected={filter === key} onClick={() => setFilter(key)}>
                <Text>{filterLabels[key]}</Text>
                <Text className='history-filter__count'>{filterCounts[key]}</Text>
              </View>
            ))}
          </View>
          {filteredItems.length === 0 ? (
            <EmptyState title={`${filterLabels[filter]}暂无记录`} description={filter === 'ACTIVE' ? '新的诊断提交后会显示在这里。' : '切换其他筛选条件查看全部诊断记录。'} />
          ) : (
            <View className='surface history-list'>{filteredItems.map((item) => <DiagnosisCard key={item.id} diagnosis={item} onClick={() => Taro.navigateTo({ url: `/pages/diagnosis-result/index?id=${item.id}` })} />)}</View>
          )}
        </View>
      )}
    </View>
  )
}
