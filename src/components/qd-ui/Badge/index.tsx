import { Text } from '@tarojs/components'
import type { PropsWithChildren } from 'react'
import './index.scss'

interface BadgeProps extends PropsWithChildren {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <Text className={`qd-badge qd-badge--${tone}`}>{children}</Text>
}
