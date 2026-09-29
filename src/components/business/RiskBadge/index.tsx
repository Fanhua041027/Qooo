import { Text } from '@tarojs/components'
import type { RiskLevel } from '@nongjianzhen/types'
import { Badge } from '@/components/qd-ui/Badge'
import './index.scss'

export function RiskBadge({ level, label }: { level: RiskLevel; label?: string }) {
  const tone = level === 'HIGH' || level === 'CRITICAL' ? 'danger' : level === 'MEDIUM' ? 'warning' : 'success'
  const fallback = level === 'CRITICAL' ? '极高风险' : level === 'HIGH' ? '高风险' : level === 'MEDIUM' ? '中风险' : '低风险'
  const marker = level === 'HIGH' || level === 'CRITICAL' ? '!' : '•'
  return <Badge tone={tone}><Text className='risk-badge__marker' aria-hidden>{marker}</Text>{label || fallback}</Badge>
}
