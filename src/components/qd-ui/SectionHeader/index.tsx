import { Text, View } from '@tarojs/components'
import './index.scss'

interface SectionHeaderProps {
  title: string
  action?: string
  onAction?: () => void
}

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View className='qd-section-header'>
      <Text className='qd-section-header__title'>{title}</Text>
      {action ? <Text className='qd-section-header__action' onClick={onAction}>{action}</Text> : null}
    </View>
  )
}
