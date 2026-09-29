import Taro, { useDidShow } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

type TabKey = 'home' | 'diagnosis' | 'farm' | 'tasks' | 'profile'

interface TabItem {
  key: TabKey
  label: string
  pagePath: string
}

const tabs: TabItem[] = [
  { key: 'home', label: '首页', pagePath: '/pages/home/index' },
  { key: 'diagnosis', label: '诊断', pagePath: '/pages/diagnosis/index' },
  { key: 'farm', label: '农场', pagePath: '/pages/farm/index' },
  { key: 'tasks', label: '任务', pagePath: '/pages/tasks/index' },
  { key: 'profile', label: '我的', pagePath: '/pages/profile/index' }
]

function getCurrentTab() {
  const pages = Taro.getCurrentPages()
  const route = pages[pages.length - 1]?.route || ''
  return tabs.find((item) => route === item.pagePath.slice(1))?.key || 'home'
}

export default function CustomTabBar() {
  const [current, setCurrent] = useState<TabKey>('home')

  useDidShow(() => {
    setCurrent(getCurrentTab())
  })

  const changeTab = (tab: TabItem) => {
    if (tab.key === current) return
    setCurrent(tab.key)
    Taro.switchTab({ url: tab.pagePath })
  }

  return (
    <View className='custom-tab-bar' role='navigation' aria-label='主导航'>
      {tabs.map((tab) => (
        <View
          key={tab.key}
          className={`custom-tab-bar__item ${current === tab.key ? 'custom-tab-bar__item--active' : ''}`}
          role='button'
          aria-label={tab.label}
          aria-current={current === tab.key ? 'page' : undefined}
          onClick={() => changeTab(tab)}
        >
          <View className={`custom-tab-bar__icon custom-tab-bar__icon--${tab.key}`} aria-hidden='true' />
          <Text className='custom-tab-bar__label'>{tab.label}</Text>
        </View>
      ))}
    </View>
  )
}
