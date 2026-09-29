import { Text, View } from '@tarojs/components'
import { Button } from '@/components/qd-ui/Button'
import './index.scss'

export type OpsConfigStatusKind = 'idle' | 'loading' | 'success' | 'error' | 'unauthorized'

interface Props { status: OpsConfigStatusKind; message?: string; onRetry?: () => void }

const copy: Record<OpsConfigStatusKind, { title: string; icon: string }> = {
  idle: { title: '', icon: '' }, loading: { title: '正在同步配置', icon: '…' }, success: { title: '配置已保存', icon: '✓' }, error: { title: '保存失败', icon: '!' }, unauthorized: { title: '暂无访问权限', icon: '×' }
}

export function OpsConfigStatus({ status, message, onRetry }: Props) {
  if (status === 'idle') return null
  const item = copy[status]
  return <View className={`ops-config-status ops-config-status--${status}`} role='status'>
    <Text className='ops-config-status__icon' aria-hidden>{item.icon}</Text>
    <View className='ops-config-status__body'><Text className='ops-config-status__title'>{item.title}</Text>{message ? <Text className='ops-config-status__message'>{message}</Text> : null}</View>
    {status === 'error' && onRetry ? <Button size='md' variant='ghost' onClick={onRetry}>重试</Button> : null}
  </View>
}
