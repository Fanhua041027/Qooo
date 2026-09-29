import { Text, View } from '@tarojs/components'
import type { DiagnosisRecord, DiagnosisStatus } from '@nongjianzhen/types'
import { Badge } from '@/components/qd-ui/Badge'
import { RiskBadge } from '../RiskBadge'
import { formatConfidence, formatDateTime } from '@/utils/format'
import './index.scss'

const statusPresentation: Record<DiagnosisStatus, { label: string; tone: 'neutral' | 'warning' | 'danger' | 'info' }> = {
  PENDING: { label: '等待分析', tone: 'info' },
  PROCESSING: { label: '处理中', tone: 'info' },
  COMPLETED: { label: '已完成', tone: 'neutral' },
  NEED_MORE_IMAGES: { label: '待补拍', tone: 'warning' },
  NEED_EXPERT_REVIEW: { label: '待复核', tone: 'warning' },
  FAILED: { label: '未完成', tone: 'danger' }
}

export function DiagnosisCard({ diagnosis, onClick }: { diagnosis: DiagnosisRecord; onClick: () => void }) {
  const issue = diagnosis.possibleIssues[0]
  const presentation = statusPresentation[diagnosis.status]
  const issueLabel = issue?.name
    || (diagnosis.status === 'FAILED' ? '本次诊断未完成' : diagnosis.status === 'NEED_MORE_IMAGES' ? '需要补充图片' : diagnosis.status === 'NEED_EXPERT_REVIEW' ? '等待农技员复核' : '正在分析图片特征')
  return (
    <View className='diagnosis-card' onClick={onClick} role='button' aria-label={`查看${diagnosis.crop}诊断记录`}>
      <View className='diagnosis-card__header'>
        <Text className='diagnosis-card__crop'>{diagnosis.crop}</Text>
        {diagnosis.status === 'COMPLETED' && diagnosis.risk ? <RiskBadge level={diagnosis.risk.level} label={diagnosis.risk.label} /> : <Badge tone={presentation.tone}>{presentation.label}</Badge>}
      </View>
      <Text className='diagnosis-card__issue'>{issueLabel}</Text>
      <View className='diagnosis-card__meta'>
        <Text>{formatDateTime(diagnosis.createdAt)}</Text>
        {issue ? <Text>可信度 {formatConfidence(issue.confidence)}</Text> : null}
      </View>
    </View>
  )
}
