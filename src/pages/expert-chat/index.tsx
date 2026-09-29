import Taro, { useLoad } from '@tarojs/taro'
import { Input, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import type { ExpertChatSession, ExpertProfile } from '@nongjianzhen/types'
import { Badge } from '@/components/qd-ui/Badge'
import { Button } from '@/components/qd-ui/Button'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { extendedFeaturesApi } from '@/services/extended-features.api'
import './index.scss'

export default function ExpertChatPage() {
  const [experts, setExperts] = useState<ExpertProfile[]>([])
  const [session, setSession] = useState<ExpertChatSession>()
  const [expertId, setExpertId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  useLoad((params) => setExpertId(params.expertId || ''))
  useEffect(() => { extendedFeaturesApi.listExperts().then(async (response) => { setExperts(response.data.items); if (expertId) setSession((await extendedFeaturesApi.getChat(expertId)).data) }).catch((reason) => setError(reason instanceof Error ? reason.message : '专家服务暂时不可用')).finally(() => setLoading(false)) }, [expertId])
  const openChat = async (expert: ExpertProfile) => { setLoading(true); try { setSession((await extendedFeaturesApi.getChat(expert.id)).data) } catch (reason) { setError(reason instanceof Error ? reason.message : '会话暂时无法打开') } finally { setLoading(false) } }
  const send = async () => { if (!session || !message.trim() || sending) return; const text = message.trim(); setMessage(''); setSending(true); try { await extendedFeaturesApi.sendMessage(session.expert.id, text); setSession((await extendedFeaturesApi.getChat(session.expert.id)).data) } catch (reason) { setMessage(text); Taro.showToast({ title: reason instanceof Error ? reason.message : '发送失败，请稍后重试', icon: 'none' }) } finally { setSending(false) } }
  if (loading && !experts.length) return <View className='page expert-chat-page'><LoadingState label='正在读取专家列表' /></View>
  if (error && !experts.length) return <View className='page expert-chat-page'><ErrorState title='专家服务暂时不可用' message={error} onRetry={() => Taro.reLaunch({ url: '/pages/expert-chat/index' })} /></View>
  if (!session) return <View className='page expert-chat-page'><View className='expert-heading'><View><Text className='page-title'>找农艺专家</Text><Text className='page-description'>高风险、低置信度或连续无改善时，建议带着诊断记录来复核。</Text></View></View><View className='expert-safety surface'><Text>复核前准备</Text><Text>作物和生长期 · 异常部位近照 · 已做处理 · 产品标签（如涉及用药）</Text></View><View className='expert-list'>{experts.map((expert) => <View className='expert-item surface' key={expert.id}><View className='expert-item__head'><View className='expert-avatar'>{expert.name.slice(0, 1)}</View><View className='expert-item__identity'><Text>{expert.name}</Text><Text>{expert.title}</Text></View><Badge tone={expert.online ? 'success' : 'neutral'}>{expert.online ? '在线' : '稍后回复'}</Badge></View><Text className='expert-item__specialty'>{expert.specialty}</Text><View className='expert-item__meta'><Text>擅长：{expert.crops.join('、')}</Text><Text>评分 {expert.rating} · 已复核 {expert.cases} 例</Text></View><View className='expert-item__footer'><Text>{expert.responseTime}</Text><Button size='md' onClick={() => openChat(expert)}>发起复核</Button></View></View>)}</View></View>
  return <View className='page expert-chat-page expert-chat-page--session'><View className='chat-header'><View onClick={() => setSession(undefined)} className='chat-back'>返回专家列表</View><View><Text className='chat-header__name'>{session.expert.name}</Text><Text className='chat-header__status'>{session.expert.specialty}</Text></View><Badge tone={session.expert.online ? 'success' : 'neutral'}>{session.expert.online ? '在线' : '离线'}</Badge></View><View className='chat-notice'>对话用于补充信息和人工复核，不会替代现场检查；涉及用药请以产品标签和当地农技意见为准。</View><View className='chat-messages'>{session.messages.map((item) => <View className={`chat-message chat-message--${item.sender.toLowerCase()}`} key={item.id}><Text>{item.text}</Text></View>)}</View><View className='chat-composer'><Input value={message} maxlength={500} placeholder='描述你看到的变化…' onInput={(event) => setMessage(event.detail.value)} confirmType='send' onConfirm={send} /><Button size='md' loading={sending} disabled={!message.trim() || sending} onClick={send}>发送</Button></View></View>
}
