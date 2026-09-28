import { Button as TaroButton, Text, View } from '@tarojs/components'
import type { PropsWithChildren } from 'react'
import './index.scss'

interface ButtonProps extends PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'md' | 'lg'
  block?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  ariaLabel?: string
}

export function Button({ children, variant = 'primary', size = 'md', block = false, loading = false, disabled = false, onClick, ariaLabel }: ButtonProps) {
  return (
    <TaroButton
      className={`qd-button qd-button--${variant} qd-button--${size} ${block ? 'qd-button--block' : ''}`}
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      <Text>{loading ? '请稍候' : children}</Text>
    </TaroButton>
  )
}

export function ButtonGroup({ children }: PropsWithChildren) {
  return <View className='qd-button-group'>{children}</View>
}
