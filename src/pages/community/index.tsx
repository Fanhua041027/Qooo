import Taro from '@tarojs/taro'
import { Input, Text, Textarea, View } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'
import type { CommunityPost } from '@nongjianzhen/types'
import { Badge } from '@/components/qd-ui/Badge'
import { Button } from '@/components/qd-ui/Button'
import { EmptyState } from '@/components/qd-ui/EmptyState'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { extendedFeaturesApi } from '@/services/extended-features.api'
import './index.scss'

type Feed = 'ALL' | 'EXPERT' | 'FARMER'

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [feed, setFeed] = useState<Feed>('ALL')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [composerOpen, setComposerOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [crop, setCrop] = useState('')
  const [publishing, setPublishing] = useState(false)
  useEffect(() => { extendedFeaturesApi.listPosts().then((response) => setPosts(response.data.items)).catch((reason) => setError(reason instanceof Error ? reason.message : '社区内容暂时无法加载')).finally(() => setLoading(false)) }, [])
  const visiblePosts = useMemo(() => feed === 'ALL' ? posts : posts.filter((post) => post.role === feed), [feed, posts])
  const like = async (post: CommunityPost) => { try { const response = await extendedFeaturesApi.likePost(post.id); setPosts((items) => items.map((item) => item.id === post.id ? response.data : item)) } catch (reason) { Taro.showToast({ title: reason instanceof Error ? reason.message : '点赞失败', icon: 'none' }) } }
  const publish = async () => {
    if (!title.trim() || !content.trim()) return
    setPublishing(true)
    try { const response = await extendedFeaturesApi.createPost({ title, content, crop, tags: crop ? [crop] : [] }); setPosts((items) => [response.data, ...items]); setTitle(''); setContent(''); setCrop(''); setComposerOpen(false); Taro.showToast({ title: '已发布', icon: 'success' }) }
    catch (reason) { Taro.showToast({ title: reason instanceof Error ? reason.message : '发布失败，请重试', icon: 'none' }) }
    finally { setPublishing(false) }
  }
  if (loading) return <View className='page community-page'><LoadingState label='正在读取农友动态' /></View>
  if (error && !posts.length) return <View className='page community-page'><ErrorState title='社区暂时不可用' message={error} onRetry={() => Taro.reLaunch({ url: '/pages/community/index' })} /></View>
  return <View className='page community-page'>
    <View className='community-heading'><View><Text className='page-title'>农友交流</Text><Text className='page-description'>分享观察过程，先讲证据，再一起找下一步。</Text></View><Button size='md' onClick={() => setComposerOpen(true)}>发帖</Button></View>
    <View className='community-guide surface'><View><Text className='community-guide__title'>让别人更快帮到你</Text><Text>作物、生长期、异常部位和已经做过的处理，尽量一次写清。</Text></View><Text className='community-guide__link' onClick={() => Taro.switchTab({ url: '/pages/diagnosis/index' })}>去拍照</Text></View>
    <View className='community-tabs' role='tablist'>{[['ALL', '全部'], ['EXPERT', '专家回答'], ['FARMER', '农友经验']].map(([key, label]) => <View className={`community-tab ${feed === key ? 'community-tab--active' : ''}`} key={key} role='tab' aria-selected={feed === key} onClick={() => setFeed(key as Feed)}>{label}</View>)}</View>
    {!visiblePosts.length ? <EmptyState title='还没有这个分类的内容' description='换个分类，或者分享你的田间观察。' actionLabel='发布第一条' onAction={() => setComposerOpen(true)} /> : <View className='community-list'>{visiblePosts.map((post) => <View className='community-post surface' key={post.id}><View className='community-post__head'><View className='community-avatar'>{post.author.slice(0, 1)}</View><View className='community-post__author'><Text>{post.author}</Text><Text>{post.role === 'EXPERT' ? '农艺专家' : post.role === 'OFFICIAL' ? '农间诊官方' : '农友'} · {post.crop || '综合'}</Text></View><Badge tone={post.role === 'EXPERT' ? 'info' : post.role === 'OFFICIAL' ? 'success' : 'neutral'}>{post.role === 'EXPERT' ? '专家' : post.role === 'OFFICIAL' ? '官方' : '农友'}</Badge></View><Text className='community-post__title'>{post.title}</Text><Text className='community-post__content'>{post.content}</Text><View className='community-tags'>{post.tags.map((tag) => <Text key={tag}>#{tag}</Text>)}</View><View className='community-post__footer'><Text onClick={() => like(post)} className={post.liked ? 'community-post__liked' : ''}>赞 {post.likes}</Text><Text>评论 {post.comments}</Text><Text>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</Text></View></View>)}</View>}
    {composerOpen ? <View className='community-overlay' onClick={() => setComposerOpen(false)}><View className='community-sheet' onClick={(event) => event.stopPropagation()}><Text className='community-sheet__title'>分享田间观察</Text><Input className='community-input' value={title} maxlength={60} placeholder='一句话说清你遇到的问题' onInput={(event) => setTitle(event.detail.value)} /><Input className='community-input' value={crop} maxlength={12} placeholder='作物（可选，例如番茄）' onInput={(event) => setCrop(event.detail.value)} /><Textarea className='community-textarea' value={content} maxlength={600} autoHeight placeholder='写下症状、时间、范围和你已经做过的处理' onInput={(event) => setContent(event.detail.value)} /><Text className='community-sheet__hint'>请勿发布个人联系方式、具体剂量或未经核验的用药结论。</Text><View className='community-sheet__actions'><Button variant='ghost' onClick={() => setComposerOpen(false)}>取消</Button><Button block loading={publishing} disabled={!title.trim() || !content.trim() || publishing} onClick={publish}>发布</Button></View></View></View> : null}
  </View>
}
