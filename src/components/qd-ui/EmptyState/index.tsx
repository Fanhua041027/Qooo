import { Text, View } from '@tarojs/components'
import { Button } from '../Button'
import './index.scss'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className='qd-empty' role='status'>
      <View className='qd-empty__mark' aria-hidden />
      <Text className='qd-empty__title'>{title}</Text>
      <Text className='qd-empty__description'>{description}</Text>
      {actionLabel && onAction ? <Button variant='secondary' onClick={onAction}>{actionLabel}</Button> : null}
    </View>
  )
}
