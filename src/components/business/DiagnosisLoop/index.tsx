import { Text, View } from '@tarojs/components'
import type { DiagnosisLoopState, DiagnosisVerificationOutcome } from '@nongjianzhen/types'
import { Button } from '@/components/qd-ui/Button'
import { formatDateTime } from '@/utils/format'
import './index.scss'

interface DiagnosisLoopProps {
  loop: DiagnosisLoopState
  verifying?: boolean
  onVerify?: (outcome: DiagnosisVerificationOutcome) => void
}

const stages: Array<{ key: DiagnosisLoopState['stage']; label: string; short: string }> = [
  { key: 'JUDGMENT', label: '判断', short: '根据图片形成初步判断' },
  { key: 'EXECUTION', label: '执行', short: '把建议转成农事任务' },
  { key: 'VERIFICATION', label: '验证', short: '复查现场变化并记录' }
]

const stageOrder: Record<DiagnosisLoopState['stage'], number> = { JUDGMENT: 0, EXECUTION: 1, VERIFICATION: 2, REASSESSMENT: 0, CLOSED: 3 }

export function DiagnosisLoop({ loop, verifying = false, onVerify }: DiagnosisLoopProps) {
  const activeStage = loop.stage === 'REASSESSMENT' ? 'JUDGMENT' : loop.stage === 'CLOSED' ? 'VERIFICATION' : loop.stage
  const activeIndex = stageOrder[loop.stage]

  return (
    <View className={`diagnosis-loop diagnosis-loop--${loop.stage.toLowerCase()}`}>
      <View className='diagnosis-loop__heading'>
        <View><Text className='diagnosis-loop__title'>JEV 行动闭环</Text><Text className='diagnosis-loop__subtitle'>{loop.stage === 'CLOSED' ? '本轮处理已经完成' : loop.stage === 'REASSESSMENT' ? '复查结果需要重新判断' : '每一次判断都要落到行动和复查'}</Text></View>
        <Text className='diagnosis-loop__code'>{loop.stage === 'CLOSED' ? '完成' : `${activeIndex + 1}/3`}</Text>
      </View>
      {loop.nextReviewAt ? <Text className='diagnosis-loop__review'>建议复查：{formatDateTime(loop.nextReviewAt)}</Text> : null}
      <View className='diagnosis-loop__steps'>
        {stages.map((stage, index) => {
          const complete = loop.stage === 'CLOSED' ? true : index < activeIndex
          const current = stage.key === activeStage
          return <View className={`diagnosis-loop__step ${complete ? 'diagnosis-loop__step--complete' : ''} ${current ? 'diagnosis-loop__step--current' : ''}`} key={stage.key}>
            <View className='diagnosis-loop__dot'>{complete ? '✓' : index + 1}</View>
            <View><Text className='diagnosis-loop__label'>{stage.label}</Text><Text className='diagnosis-loop__copy'>{stage.short}</Text></View>
          </View>
        })}
      </View>
      {loop.stage === 'VERIFICATION' || loop.stage === 'REASSESSMENT' ? (
        <View className='diagnosis-loop__verify'>
          <Text className='diagnosis-loop__verify-title'>{loop.stage === 'REASSESSMENT' ? '建议重新判断' : '复查后告诉我们变化'}</Text>
          <Text className='diagnosis-loop__verify-copy'>记录变化后，系统会决定是结束本轮，还是重新拍照判断。</Text>
          <View className='diagnosis-loop__actions'>
            <Button size='md' loading={verifying} onClick={() => onVerify?.('IMPROVED')}>有改善</Button>
            <Button size='md' variant='secondary' loading={verifying} onClick={() => onVerify?.('UNCHANGED')}>没变化</Button>
            <Button size='md' variant='danger' loading={verifying} onClick={() => onVerify?.('WORSE')}>更严重</Button>
          </View>
          <Button size='md' variant='ghost' loading={verifying} onClick={() => onVerify?.('UNKNOWN')}>暂时看不出来</Button>
        </View>
      ) : null}
    </View>
  )
}
