import Taro from '@tarojs/taro'
import { SUBSCRIBE_TEMPLATE_IDS } from '@/config/env'

export async function requestTaskSubscription() {
  if (SUBSCRIBE_TEMPLATE_IDS.length === 0) {
    return { configured: false, accepted: false }
  }
  // Taro 4.2.1 将微信 tmplIds 与支付宝 entityIds 错误地同时标记为必填，这里仅收窄微信端签名。
  const requestWechatSubscription = Taro.requestSubscribeMessage as unknown as (
    options: { tmplIds: string[] }
  ) => Promise<Record<string, string>>
  const result = await requestWechatSubscription({ tmplIds: SUBSCRIBE_TEMPLATE_IDS })
  const accepted = SUBSCRIBE_TEMPLATE_IDS.some((id) => result[id] === 'accept')
  return { configured: true, accepted }
}
