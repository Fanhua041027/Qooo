import { Text, View } from '@tarojs/components'
import { Button } from '../Button'
import './index.scss'

export function LoadingState({ label = '正在加载' }: { label?: string }) {
  return (
    <View className='qd-page-state' role='status' aria-live='polite'>
      <View className='qd-page-state__pulse' />
      <Text>{label}</Text>
    </View>
  )
}

export function ErrorState({ title = '暂时无法加载', message, onRetry, retrying = false, actionLabel, onAction }: { title?: string; message: string; onRetry?: () => void; retrying?: boolean; actionLabel?: string; onAction?: () => void }) {
  return (
    <View className='qd-page-state' role='alert'>
      <Text className='qd-page-state__title'>{title}</Text>
      <Text className='qd-page-state__message'>{message}</Text>
      {onRetry ? <Button variant='secondary' loading={retrying} onClick={onRetry}>重新加载</Button> : null}
      {onAction ? <Button variant='ghost' onClick={onAction}>{actionLabel || '继续操作'}</Button> : null}
    </View>
  )
}
