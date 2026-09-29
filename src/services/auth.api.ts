import Taro from '@tarojs/taro'
import type { AuthIdentity } from '@nongjianzhen/types'

export async function mockLogin(userId = 'user_p0_farmer_001'): Promise<AuthIdentity> {
  await new Promise((resolve) => setTimeout(resolve, 360))
  if (userId === 'ops_admin_p0_001') return { userId, displayName: '管理员测试账号', isMock: true, role: 'ADMIN' }
  if (userId === 'ops_expert_p0_001') return { userId, displayName: '农艺专家测试账号', isMock: true, role: 'EXPERT' }
  if (userId === 'ops_p0_001') return { userId, displayName: '运营测试账号', isMock: true, role: 'OPERATOR' }
  return { userId, displayName: '向阳农场主', isMock: true, role: 'FARMER' }
}

export async function getWechatLoginCode() {
  const result = await Taro.login()
  if (!result.code) throw new Error('未获得微信登录 code')
  return result.code
}
