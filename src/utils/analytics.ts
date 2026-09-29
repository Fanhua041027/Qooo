import Taro from '@tarojs/taro'

type AnalyticsValue = string | number | boolean | undefined

export function track(eventName: string, properties: Record<string, AnalyticsValue> = {}) {
  const payload = { eventName, properties, occurredAt: new Date().toISOString() }
  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', payload)
  }
  Taro.reportEvent?.(eventName, properties as Record<string, string | number>)
}
