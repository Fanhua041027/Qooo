import Taro, { useDidShow, useLoad } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/qd-ui/Badge'
import { Button, ButtonGroup } from '@/components/qd-ui/Button'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { RiskBadge } from '@/components/business/RiskBadge'
import { DiagnosisLoop } from '@/components/business/DiagnosisLoop'
import type { DiagnosisAction, DiagnosisLoopState, DiagnosisVerificationOutcome } from '@nongjianzhen/types'
import { useDiagnosisPolling } from '@/features/diagnosis/useDiagnosisPolling'
import { taskApi } from '@/services/task.api'
import { diagnosisApi } from '@/services/diagnosis.api'
import { requestTaskSubscription } from '@/services/subscription'
import { formatConfidence, formatDateTime } from '@/utils/format'
import { track } from '@/utils/analytics'
import { createClientRequestId } from '@/utils/id'
import { useOpsConfigStore } from '@/store/ops-config.store'
import { parseOpsConfigContent } from '@/pages/ops-config/policy'
import './index.scss'

const actionLabels = {
  DO_NOW: '现在做',
  OBSERVE: '继续观察',
  AVOID: '暂时不要做',
  EXPERT_REVIEW: '请专家复核'
} as const

export default function DiagnosisResultPage() {
  const [diagnosisId, setDiagnosisId] = useState<string>()
  const [creatingTask, setCreatingTask] = useState(false)
  const creatingTaskRef = useRef(false)
  const [retrying, setRetrying] = useState(false)
  const retryingRef = useRef(false)
  const taskRequestIdRef = useRef<string>()
  const verifyingRef = useRef(false)
  const [loopOverride, setLoopOverride] = useState<DiagnosisLoopState>()
  const [verifying, setVerifying] = useState(false)
  const { configs: opsConfigs, load: loadOpsConfigs } = useOpsConfigStore()
  const { diagnosis, loading, error, pollingTimedOut, reload } = useDiagnosisPolling(diagnosisId)

  useLoad((params) => setDiagnosisId(params.id))
  useDidShow(() => {
    if (diagnosisId) reload()
    void loadOpsConfigs(true)
  })
  useEffect(() => {
    void loadOpsConfigs(true)
  }, [diagnosisId, loadOpsConfigs])

  if (loading && !diagnosis) return <View className='page'><LoadingState label='正在读取诊断状态' /></View>
  if (error && !diagnosis) return <View className='page'><ErrorState title='诊断结果加载失败' message={error} onRetry={reload} /></View>
  if (!diagnosis) return <View className='page'><ErrorState message='未找到诊断记录' /></View>

  if (diagnosis.status === 'PROCESSING' || diagnosis.status === 'PENDING') {
    return (
      <View className='page result-processing'>
        <View className='result-processing__indicator'><View /></View>
        <Badge tone='info'>辅助诊断进行中</Badge>
        <Text className='result-processing__title'>{diagnosis.progress?.label || '正在分析图片'}</Text>
        <Text className='result-processing__description'>通常会在 30 秒内完成。你可以停留在这里，也可以稍后从诊断历史查看。</Text>
        <View className='result-processing__track'><View style={{ transform: `scaleX(${(diagnosis.progress?.percent || 45) / 100})` }} /></View>
        <Text className='result-processing__hint'>请勿重复提交同一张图片</Text>
        {pollingTimedOut || error ? (
          <View className='result-processing__recovery'>
            <Text>{error || '分析等待时间较长，记录已保留。'}</Text>
            <Button variant='secondary' onClick={reload}>重新查询</Button>
            <Button variant='ghost' onClick={() => Taro.navigateTo({ url: '/pages/diagnosis-history/index' })}>查看诊断历史</Button>
          </View>
        ) : null}
      </View>
    )
  }

  if (diagnosis.status === 'FAILED') {
    return (
      <View className='page'>
        <ErrorState
          message={diagnosis.error?.message || '本次诊断未完成'}
          retrying={retrying}
          onRetry={async () => {
            if (retryingRef.current) return
            retryingRef.current = true
            setRetrying(true)
            try {
              await diagnosisApi.retry(diagnosis.id)
              reload()
            } catch (reason) {
              Taro.showToast({ title: reason instanceof Error ? reason.message : '重新分析失败，请稍后重试', icon: 'none' })
            } finally {
              retryingRef.current = false
              setRetrying(false)
            }
          }}
        />
      </View>
    )
  }

  if (diagnosis.status === 'NEED_MORE_IMAGES' || diagnosis.decision === 'ASK_MORE') {
    return (
      <View className='page page--with-footer result-follow-up'>
        <Badge tone='warning'>还需要补充信息</Badge>
        <Text className='result-follow-up__title'>这次还不能可靠判断</Text>
        <Text className='result-follow-up__description'>{diagnosis.disclaimer}</Text>
        <View className='result-follow-up__questions'>
          {(diagnosis.followUpQuestions || []).map((question) => (
            <View className='result-follow-up__question' key={question.code}>
              <Text>{question.prompt}</Text>
              {question.captureHint ? <Text>{question.captureHint}</Text> : null}
            </View>
          ))}
        </View>
        <View className='fixed-footer'>
          <Button block size='lg' onClick={() => Taro.switchTab({ url: '/pages/diagnosis/index' })}>按提示重新拍摄</Button>
        </View>
      </View>
    )
  }

  const issue = diagnosis.possibleIssues[0]
  const configuredContent = (key: string) => diagnosis.model.configSnapshot?.[key] || opsConfigs.find((item) => item.key === key)?.content || ''
  const riskKey = diagnosis.risk ? `risk.${diagnosis.risk.level.toLowerCase()}` : 'risk.medium'
  const riskContent = configuredContent(riskKey) || configuredContent('risk.medium.label')
  const riskCopy = parseOpsConfigContent(riskContent, {
    title: diagnosis.risk?.label || '待复核风险',
    description: diagnosis.risk?.reason || '请结合田间情况继续观察。'
  })
  const observeCopy = parseOpsConfigContent(configuredContent('action.observe'), {
    title: '继续观察',
    description: '记录变化并按建议时间复查。'
  })
  const expertCopy = parseOpsConfigContent(configuredContent('expert_review.high-risk'), {
    title: '建议农技员复核',
    description: '当前问题风险较高或容易混淆，请结合田间情况进一步确认。'
  })
  const safetyCopy = parseOpsConfigContent(configuredContent('safety.uncertain-pesticide'), {
    title: '建议先停用待确认的药剂',
    description: '当前结果触发了安全规则校验，请先让当地农技人员复核，再决定是否用药。'
  })
  const canUseObserveCopy = (action: DiagnosisAction) =>
    action.type === 'OBSERVE' && action.safetyLevel !== 'CHEMICAL_REVIEW' && diagnosis.safety?.passed !== false
  const displayActions: DiagnosisAction[] = diagnosis.actions.length
    ? diagnosis.actions
    : [{ type: 'OBSERVE', title: observeCopy.title, description: observeCopy.description }]
  const loop = loopOverride || diagnosis.loop || { stage: 'JUDGMENT' as const, updatedAt: diagnosis.updatedAt }
  const verifyLoop = async (outcome: DiagnosisVerificationOutcome) => {
    if (verifyingRef.current) return
    verifyingRef.current = true
    setVerifying(true)
    try {
      const response = await diagnosisApi.verify(diagnosis.id, outcome)
      if (response.data.loop) setLoopOverride(response.data.loop)
      Taro.showToast({ title: outcome === 'IMPROVED' ? '已记录改善' : outcome === 'WORSE' ? '将重新判断' : '已记录复查', icon: 'success' })
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '复查结果保存失败', icon: 'none' })
    } finally {
      verifyingRef.current = false
      setVerifying(false)
    }
  }
  const createTask = async () => {
    const action = displayActions.find((item) => item.type === 'DO_NOW') || displayActions[0]
    if (!action) {
      Taro.showToast({ title: '当前没有可转成任务的建议，请先补充图片或联系农技员', icon: 'none' })
      return
    }
    if (creatingTaskRef.current) return
    creatingTaskRef.current = true
    setCreatingTask(true)
    try {
      try {
        const existingTasks = await taskApi.list()
        const existing = existingTasks.data.items.find((task) => task.diagnosisId === diagnosis.id && task.status !== 'COMPLETED')
        if (existing) {
          Taro.showToast({ title: '该诊断已创建过任务', icon: 'none' })
          setTimeout(() => Taro.switchTab({ url: '/pages/tasks/index' }), 700)
          return
        }
      } catch {
        // 列表暂时不可用时仍尝试创建，让创建接口返回最终结果。
      }
      taskRequestIdRef.current ||= createClientRequestId('client_task')
      await taskApi.create({
        clientRequestId: taskRequestIdRef.current,
        title: action.title,
        description: action.description,
        plotId: diagnosis.plotId,
        diagnosisId: diagnosis.id,
        priority: diagnosis.risk?.level === 'HIGH' || diagnosis.risk?.level === 'CRITICAL' ? 'HIGH' : 'MEDIUM',
        dueAt: action.dueAt || new Date(Date.now() + 86400000).toISOString()
      })
      track('diagnosis_task_created', { diagnosisId: diagnosis.id })
      let subscription = { configured: false, accepted: false }
      try {
        subscription = await requestTaskSubscription()
      } catch {
        // 订阅消息是可选能力，授权失败不应覆盖已经成功创建的农事任务。
      }
      Taro.showToast({ title: subscription.configured && subscription.accepted ? '任务和提醒已创建' : '任务已创建', icon: 'success' })
      setTimeout(() => Taro.switchTab({ url: '/pages/tasks/index' }), 700)
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '任务创建失败', icon: 'none' })
    } finally {
      creatingTaskRef.current = false
      setCreatingTask(false)
    }
  }

  return (
    <View className='page page--with-footer result-page'>
      <View className='result-summary'>
        <View className='result-summary__top'>
          <Badge tone='neutral'>辅助判断</Badge>
          {diagnosis.risk ? <RiskBadge level={diagnosis.risk.level} label={riskCopy.title} /> : null}
        </View>
        <Text className='result-summary__crop'>{diagnosis.crop}</Text>
        <Text className='result-summary__issue'>{issue?.name || '暂未识别到明确问题'}</Text>
        {issue ? <Text className='result-summary__confidence'>可信度 {formatConfidence(issue.confidence)}</Text> : null}
        <Text className='result-summary__reason'>{riskCopy.description}</Text>
      </View>

      {diagnosis.expertReview?.required || diagnosis.status === 'NEED_EXPERT_REVIEW' ? (
        <View className='expert-review-callout'>
          <Text className='expert-review-callout__title'>{expertCopy.title}</Text>
          <Text>{diagnosis.expertReview?.message || expertCopy.description}</Text>
        </View>
      ) : null}

      <DiagnosisLoop loop={loop} verifying={verifying} onVerify={verifyLoop} />

      {diagnosis.safety && !diagnosis.safety.passed ? (
        <View className='result-safety-callout'>
          <Text className='result-safety-callout__title'>{safetyCopy.title}</Text>
          <Text>{safetyCopy.description}</Text>
          {diagnosis.safety.violationCodes.length > 0 ? <Text className='result-safety-callout__codes'>安全提示：{diagnosis.safety.violationCodes.join('、')}</Text> : null}
        </View>
      ) : null}

      <View className='section'>
        <Text className='section-title'>判断依据</Text>
        <View className='result-evidence'>
          {(issue?.evidence || []).map((item, index) => (
            <View className='result-evidence__item' key={item}>
              <Text className='result-evidence__index'>{index + 1}</Text>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='section'>
        <Text className='section-title'>下一步怎么做</Text>
        <View className='result-actions'>
          {displayActions.map((action) => (
            <View className={`result-action result-action--${action.type.toLowerCase()}`} key={`${action.type}-${action.title}`}>
              <View className='result-action__top'>
                <Badge tone={action.type === 'AVOID' ? 'danger' : action.type === 'DO_NOW' ? 'success' : 'neutral'}>{actionLabels[action.type]}</Badge>
                {action.dueAt ? <Text>{formatDateTime(action.dueAt)}</Text> : null}
              </View>
              <Text className='result-action__title'>{canUseObserveCopy(action) && opsConfigs.some((item) => item.key === 'action.observe') ? observeCopy.title : action.title}</Text>
              {action.description || (canUseObserveCopy(action) && opsConfigs.some((item) => item.key === 'action.observe')) ? <Text className='result-action__description'>{canUseObserveCopy(action) && opsConfigs.some((item) => item.key === 'action.observe') ? observeCopy.description : action.description}</Text> : null}
            </View>
          ))}
        </View>
      </View>

      <View className='result-trace'>
        <Text>{diagnosis.disclaimer}</Text>
        <Text>模型：{diagnosis.model.name} · {diagnosis.model.version}</Text>
        <Text>请求编号：{diagnosis.requestId}</Text>
      </View>

      <View className='fixed-footer'>
        <ButtonGroup>
          <Button variant='secondary' onClick={() => Taro.switchTab({ url: '/pages/diagnosis/index' })}>补充拍摄</Button>
          <Button loading={creatingTask} disabled={!displayActions.length} onClick={createTask}>{displayActions.length ? '创建农事任务' : '暂无可创建任务'}</Button>
        </ButtonGroup>
      </View>
    </View>
  )
}
