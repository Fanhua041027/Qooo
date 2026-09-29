import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { DiagnosisRecord, Farm, FarmTask } from '@nongjianzhen/types'
import { Button } from '@/components/qd-ui/Button'
import { Badge } from '@/components/qd-ui/Badge'
import { SectionHeader } from '@/components/qd-ui/SectionHeader'
import { DiagnosisCard } from '@/components/business/DiagnosisCard'
import { TaskItem } from '@/components/business/TaskItem'
import { diagnosisApi } from '@/services/diagnosis.api'
import { farmApi } from '@/services/farm.api'
import { taskApi } from '@/services/task.api'
import { messageApi } from '@/services/message.api'
import { useAuthStore } from '@/store/auth.store'
import { track } from '@/utils/analytics'
import { useOpsConfigStore } from '@/store/ops-config.store'
import { parseOpsConfigContent } from '@/pages/ops-config/policy'
import { DEFAULT_OPS_CONFIGS } from '@/mocks/ops-config'
import { LoadingState } from '@/components/qd-ui/PageState'
import './index.scss'

export default function HomePage() {
  const identity = useAuthStore((state) => state.identity)
  const [farm, setFarm] = useState<Farm | null>(null)
  const [diagnosis, setDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [tasks, setTasks] = useState<FarmTask[]>([])
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [lastSyncedAt, setLastSyncedAt] = useState<string>('')
  const [homeCopy, setHomeCopy] = useState(() => {
    const seeded = DEFAULT_OPS_CONFIGS.find((item) => item.key === 'home.quick-start')
    const parsed = parseOpsConfigContent(seeded?.content || '', { title: '', description: '' })
    let badge = '约 30 秒得到初步判断'
    try { const payload = JSON.parse(seeded?.content || '') as { badge?: unknown }; if (typeof payload.badge === 'string') badge = payload.badge } catch { /* 兼容两行文案 */ }
    return { ...parsed, badge }
  })
  const { configs: opsConfigs, load: loadOpsConfigs } = useOpsConfigStore()
  const loadRunRef = useRef(0)
  const loadedIdentityRef = useRef<string>()

  const load = useCallback(async () => {
    const runId = ++loadRunRef.current
    if (!identity) {
      loadedIdentityRef.current = undefined
      setFarm(null)
      setDiagnosis(null)
      setTasks([])
      setUnreadMessages(0)
      setOffline(false)
      setLoading(false)
      Taro.stopPullDownRefresh()
      return
    }

    loadedIdentityRef.current = identity.userId
    setLoading(true)
    const [farmsResult, diagnosesResult, tasksResult, messagesResult] = await Promise.allSettled([
      farmApi.list(),
      diagnosisApi.list(),
      taskApi.list(),
      messageApi.unreadCount()
    ])
    if (loadRunRef.current !== runId) return
    if (farmsResult.status === 'fulfilled') setFarm(farmsResult.value.data.items[0] || null)
    if (diagnosesResult.status === 'fulfilled') setDiagnosis(diagnosesResult.value.data.items[0] || null)
    if (tasksResult.status === 'fulfilled') setTasks(tasksResult.value.data.items.filter((task) => task.status !== 'COMPLETED').slice(0, 2))
    if (messagesResult.status === 'fulfilled') setUnreadMessages(messagesResult.value.data.count)
    setOffline([farmsResult, diagnosesResult, tasksResult, messagesResult].some((result) => result.status === 'rejected'))
    setLastSyncedAt(new Date().toISOString())
    setLoading(false)
    Taro.stopPullDownRefresh()
  }, [identity])

  useDidShow(load)
  usePullDownRefresh(load)

  useEffect(() => {
    let active = true
    void loadOpsConfigs().then(() => {
      const quickStart = useOpsConfigStore.getState().configs.find((item) => item.key === 'home.quick-start') || opsConfigs.find((item) => item.key === 'home.quick-start')
      if (!active || !quickStart) return
      const parsed = parseOpsConfigContent(quickStart.content, { title: homeCopy.title, description: homeCopy.description })
      let badge = homeCopy.badge
      try {
        const payload = JSON.parse(quickStart.content) as { badge?: unknown }
        if (typeof payload.badge === 'string' && payload.badge.trim()) badge = payload.badge
      } catch { /* 兼容旧版两行文案 */ }
      setHomeCopy({ ...parsed, badge })
    }).catch(() => undefined)
    return () => { active = false }
  }, [loadOpsConfigs, opsConfigs])

  useEffect(() => {
    // 网络状态变化时立即更新提示，并在恢复连接后重新同步一次首页数据。
    const handleNetworkChange = (event: { isConnected: boolean }) => {
      setOffline(!event.isConnected)
      if (event.isConnected && identity) void load()
    }
    Taro.onNetworkStatusChange(handleNetworkChange)
    return () => Taro.offNetworkStatusChange(handleNetworkChange)
  }, [identity, load])

  useEffect(() => {
    if (!identity) {
      void load()
      return
    }
    if (loadedIdentityRef.current !== identity.userId) void load()
  }, [identity, load])

  const startDiagnosis = () => {
    track('home_start_diagnosis')
    Taro.switchTab({ url: '/pages/diagnosis/index' })
  }

  return (
    <View className='page page--with-footer home-page'>
      {offline ? <View className='home-offline' role='status'><Text>当前网络不可用，以下内容可能不是最新状态</Text><Text className='home-offline__action' onClick={load}>重新连接</Text></View> : null}

      <View className='home-heading'>
        <View>
          <Text className='home-heading__greeting'>{identity ? `${identity.displayName}，早上好` : '你好，先从一张照片开始'}</Text>
          <Text className='page-title'>看清问题，再决定怎么做</Text>
        </View>
        <View className='home-heading__tools'>
          <View className={`home-heading__status ${offline ? 'home-heading__status--offline' : ''}`} role='status'><View className='home-heading__dot' /><Text>{offline ? '网络暂时不可用' : '诊断服务正常'}</Text></View>
          <View className='home-heading__messages' onClick={() => Taro.navigateTo({ url: '/pages/messages/index' })} role='button' aria-label='查看消息与提醒'>
            <Text>消息</Text>{unreadMessages > 0 ? <Text className='home-heading__messages-badge'>{unreadMessages > 9 ? '9+' : unreadMessages}</Text> : null}
          </View>
        </View>
      </View>

      {loading ? <LoadingState label='正在同步农场和诊断记录' /> : null}

      {!loading && !identity ? (
        <View className='home-login'>
          <View>
            <Text className='home-login__title'>登录后保存诊断记录</Text>
            <Text className='home-login__description'>开发环境可使用模拟农户账号。</Text>
          </View>
          <Button variant='secondary' onClick={() => Taro.switchTab({ url: '/pages/profile/index' })}>去登录</Button>
        </View>
      ) : null}

      {!loading ? <View className='home-diagnosis'>
        <View className='home-diagnosis__content'>
          <Text className='home-diagnosis__eyebrow'>田间快速判断</Text>
          <Badge tone='success'>{homeCopy.badge}</Badge>
          <Text className='home-diagnosis__title'>{homeCopy.title}</Text>
          <Text className='home-diagnosis__description'>{homeCopy.description}</Text>
        </View>
        <Button block size='lg' onClick={startDiagnosis}>拍照诊断</Button>
      </View> : null}

      {!loading ? <View className='home-context'>
        <View className='home-context__item' onClick={() => Taro.switchTab({ url: '/pages/farm/index' })}>
          <Text className='home-context__label'>当前农场</Text>
          <Text className='home-context__value'>{farm?.name || '还没有农场'}</Text>
          <Text className='home-context__meta'>{farm ? `${farm.plots?.length || 0} 块地 · ${farm.areaMu || 0} 亩` : '添加后可提高诊断上下文准确度'}</Text>
        </View>
        <View className='home-context__item' onClick={() => Taro.switchTab({ url: '/pages/tasks/index' })}>
          <Text className='home-context__label'>待处理任务</Text>
          <Text className='home-context__value'>{tasks.length} 项</Text>
          <Text className='home-context__meta'>{tasks[0]?.title || '当前没有待处理任务'}</Text>
        </View>
      </View> : null}

      {!loading ? <View className='home-services section'>
        <View className='home-overview__heading'><View><Text className='section-title'>田间服务</Text><Text className='home-overview__sync'>天气、物资和农技支持集中在这里</Text></View><Text className='home-overview__link' onClick={() => Taro.navigateTo({ url: '/pages/weather/index' })}>看天气</Text></View>
        <View className='home-services__grid'>
          <View className='home-service' onClick={() => Taro.navigateTo({ url: '/pages/weather/index' })}><Text className='home-service__title'>田间天气</Text><Text>看降雨、湿度和作业提醒</Text></View>
          <View className='home-service' onClick={() => Taro.navigateTo({ url: '/pages/shop/index' })}><Text className='home-service__title'>农资小铺</Text><Text>基础用品，先看安全说明</Text></View>
          <View className='home-service' onClick={() => Taro.navigateTo({ url: '/pages/community/index' })}><Text className='home-service__title'>农友交流</Text><Text>分享过程，互相补充证据</Text></View>
          <View className='home-service' onClick={() => Taro.navigateTo({ url: '/pages/expert-chat/index' })}><Text className='home-service__title'>专家复核</Text><Text>高风险情况联系农技员</Text></View>
        </View>
      </View> : null}

      {!loading && identity ? (
        <View className='home-overview'>
          <View className='home-overview__heading'>
            <View>
              <Text className='section-title'>今天的农事概览</Text>
              <Text className='home-overview__sync'>{lastSyncedAt ? `刚刚同步 · ${tasks.length ? '有待处理事项' : '暂无待处理事项'}` : '正在同步最新状态'}</Text>
            </View>
            <Text className='home-overview__link' onClick={() => Taro.switchTab({ url: '/pages/tasks/index' })}>看任务</Text>
          </View>
          <View className='home-overview__stats'>
            <View className='home-overview__stat'>
              <Text className='home-overview__value'>{tasks.length}</Text>
              <Text className='home-overview__label'>待处理</Text>
            </View>
            <View className='home-overview__stat'>
              <Text className='home-overview__value'>{farm?.plots?.length || 0}</Text>
              <Text className='home-overview__label'>管理地块</Text>
            </View>
            <View className='home-overview__stat'>
              <Text className='home-overview__value'>{unreadMessages}</Text>
              <Text className='home-overview__label'>未读提醒</Text>
            </View>
          </View>
        </View>
      ) : null}

      {!loading ? <View className='section'>
        <SectionHeader title='最近诊断' action='查看全部' onAction={() => Taro.navigateTo({ url: '/pages/diagnosis-history/index' })} />
        <View className='surface home-list'>
          {diagnosis ? (
            <DiagnosisCard diagnosis={diagnosis} onClick={() => Taro.navigateTo({ url: `/pages/diagnosis-result/index?id=${diagnosis.id}` })} />
          ) : (
            <Text className='home-list__empty'>完成第一次拍照诊断后，记录会保存在这里。</Text>
          )}
        </View>
      </View> : null}

      {!loading && tasks.length > 0 ? (
        <View className='section'>
          <SectionHeader title='今天要做' action='任务列表' onAction={() => Taro.switchTab({ url: '/pages/tasks/index' })} />
          <View className='surface home-list'>{tasks.map((task) => <TaskItem key={task.id} task={task} />)}</View>
        </View>
      ) : null}
    </View>
  )
}
