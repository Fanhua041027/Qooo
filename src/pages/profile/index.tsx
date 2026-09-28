import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { Button } from '@/components/qd-ui/Button'
import { Badge } from '@/components/qd-ui/Badge'
import { useAuthStore } from '@/store/auth.store'
import { requestTaskSubscription } from '@/services/subscription'
import { API_MODE } from '@/config/env'
import { track } from '@/utils/analytics'
import './index.scss'

export default function ProfilePage() {
  const { identity, loading, loginWithMock, loginWithWechat, logout } = useAuthStore()

  const login = async () => {
    try {
      await loginWithMock()
      track('login_success', { mode: API_MODE })
      Taro.showToast({ title: '登录成功', icon: 'success' })
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '登录失败，请稍后重试', icon: 'none' })
    }
  }

  const loginWechat = async () => {
    try {
      await loginWithWechat()
      track('wechat_login_success')
      Taro.showToast({ title: '登录成功', icon: 'success' })
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '微信登录暂不可用', icon: 'none' })
    }
  }

  const subscribe = async () => {
    try {
      const result = await requestTaskSubscription()
      Taro.showToast({ title: result.configured ? (result.accepted ? '提醒已开启' : '未开启提醒') : '模板 ID 尚未配置', icon: 'none' })
    } catch (reason) {
      Taro.showToast({ title: reason instanceof Error ? reason.message : '订阅失败', icon: 'none' })
    }
  }

  const confirmLogout = async () => {
    const result = await Taro.showModal({ title: '退出登录', content: '退出后将停止展示当前用户的个人数据。', confirmColor: '#BC2D35' })
    if (result.confirm) logout()
  }

  return (
    <View className='page profile-page'>
      <Text className='page-title'>我的</Text>
      {identity ? (
        <View className='profile-identity'>
          <View className='profile-identity__avatar'><Text>{identity.displayName.slice(0, 1)}</Text></View>
          <View className='profile-identity__body'>
            <Text className='profile-identity__name'>{identity.displayName}</Text>
            <Text className='profile-identity__id'>{identity.userId}</Text>
          </View>
          {identity.isMock ? <Badge tone='info'>模拟账号</Badge> : null}
        </View>
      ) : (
        <View className='profile-login'>
          <Badge tone='info'>开发环境</Badge>
          <Text className='profile-login__title'>登录并保存你的诊断记录</Text>
          <Text className='profile-login__description'>{API_MODE === 'mock' ? '开发环境使用模拟农户账号，数据保存在当前设备。' : '使用服务端接口登录后，诊断和任务会按账号保存。'}</Text>
          <Button block size='lg' loading={loading} onClick={login}>{API_MODE === 'mock' ? '模拟登录' : '开发账号登录'}</Button>
          {API_MODE === 'real' ? <Button block variant='ghost' loading={loading} onClick={loginWechat}>微信登录</Button> : null}
        </View>
      )}

      <View className='profile-menu'>
        <View onClick={() => Taro.navigateTo({ url: '/pages/diagnosis-history/index' })}><Text>诊断历史</Text><Text>查看记录</Text></View>
        <View onClick={() => Taro.navigateTo({ url: '/pages/messages/index' })}><Text>消息与提醒</Text><Text>查看站内消息</Text></View>
        <View onClick={() => Taro.switchTab({ url: '/pages/farm/index' })}><Text>农场与地块</Text><Text>管理信息</Text></View>
        <View onClick={() => Taro.switchTab({ url: '/pages/tasks/index' })}><Text>农事任务</Text><Text>查看进度</Text></View>
        <View onClick={subscribe}><Text>微信订阅提醒</Text><Text>配置提醒</Text></View>
      </View>

      <View className='profile-environment'>
        <Text>接口模式</Text>
        <Badge tone={API_MODE === 'mock' ? 'warning' : 'success'}>{API_MODE === 'mock' ? 'Mock' : 'Real API'}</Badge>
      </View>

      {identity ? <View className='profile-logout'><Button block variant='danger' onClick={confirmLogout}>退出登录</Button></View> : null}
    </View>
  )
}
