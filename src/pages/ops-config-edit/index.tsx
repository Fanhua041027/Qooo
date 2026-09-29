import Taro, { useLoad } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { LoadingState } from '@/components/qd-ui/PageState'
import './index.scss'

/**
 * 兼容旧链接的路由适配页。
 * 运营配置编辑已经统一收敛到 /pages/ops-config/index，避免旧页面继续使用
 * 不同的权限、校验和版本逻辑；历史链接仍会保留当前配置 key。
 */
export default function OpsConfigEditPage() {
  useLoad((params) => {
    const key = params.key ? `?key=${encodeURIComponent(params.key)}` : ''
    Taro.redirectTo({ url: `/pages/ops-config/index${key}` })
  })

  return <View className='page ops-edit-redirect'><LoadingState label='正在打开运营配置' /><Text className='ops-edit-redirect__hint'>如果页面没有自动打开，请返回后从运营配置入口进入。</Text></View>
}
