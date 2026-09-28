import Taro from '@tarojs/taro'
import type { AuthIdentity } from '@nongjianzhen/types'

export async function mockLogin(): Promise<AuthIdentity> {
  await new Promise((resolve) => setTimeout(resolve, 360))
  return { userId: 'user_p0_farmer_001', displayName: '向阳农场主', isMock: true }
}

export async function getWechatLoginCode() {
  const result = await Taro.login()
  if (!result.code) throw new Error('未获得微信登录 code')
  return result.code
}
