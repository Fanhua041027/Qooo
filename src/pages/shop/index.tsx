import Taro from '@tarojs/taro'
import { Input, Text, View } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'
import type { ShopCartItem, ShopCategory, ShopProduct } from '@nongjianzhen/types'
import { Badge } from '@/components/qd-ui/Badge'
import { Button } from '@/components/qd-ui/Button'
import { EmptyState } from '@/components/qd-ui/EmptyState'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { extendedFeaturesApi } from '@/services/extended-features.api'
import './index.scss'

const categories: Array<{ key: ShopCategory | 'ALL'; label: string }> = [{ key: 'ALL', label: '全部' }, { key: 'BIOCONTROL', label: '生物防控' }, { key: 'TOOLS', label: '田间工具' }, { key: 'PROTECTION', label: '防护用品' }, { key: 'SEEDS', label: '种苗种子' }, { key: 'FERTILIZER', label: '土壤管理' }]

export default function ShopPage() {
  const [products, setProducts] = useState<ShopProduct[]>([])
  const [category, setCategory] = useState<ShopCategory | 'ALL'>('ALL')
  const [cart, setCart] = useState<ShopCartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [ordering, setOrdering] = useState(false)
  const [orderMessage, setOrderMessage] = useState('')
  useEffect(() => { extendedFeaturesApi.listProducts().then((response) => setProducts(response.data.items)).catch((reason) => setError(reason instanceof Error ? reason.message : '商品暂时无法加载')).finally(() => setLoading(false)) }, [])
  const visibleProducts = useMemo(() => category === 'ALL' ? products : products.filter((product) => product.category === category), [category, products])
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const addToCart = (product: ShopProduct) => setCart((items) => items.some((item) => item.product.id === product.id) ? items.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item) : [...items, { product, quantity: 1 }])
  const updateQuantity = (productId: string, delta: number) => setCart((items) => items.map((item) => item.product.id === productId ? { ...item, quantity: Math.max(0, Math.min(item.product.stock, item.quantity + delta)) } : item).filter((item) => item.quantity > 0))
  const submitOrder = async () => {
    if (!address.trim() || !cart.length) return
    setOrdering(true)
    try { await extendedFeaturesApi.createOrder({ address, items: cart.map((item) => ({ productId: item.product.id, quantity: item.quantity })) }); setCart([]); setCheckoutOpen(false); setAddress(''); setOrderMessage('订单已提交，当前为待确认状态。'); Taro.showToast({ title: '订单已提交', icon: 'success' }) }
    catch (reason) { setOrderMessage(reason instanceof Error ? reason.message : '提交失败，请稍后重试') }
    finally { setOrdering(false) }
  }
  if (loading) return <View className='page shop-page'><LoadingState label='正在读取农资商品' /></View>
  if (error && !products.length) return <View className='page shop-page'><ErrorState title='商品暂时无法加载' message={error} onRetry={() => Taro.reLaunch({ url: '/pages/shop/index' })} /></View>
  return <View className='page shop-page'>
    <View className='shop-heading'><View><Text className='page-title'>农资小铺</Text><Text className='page-description'>只推荐适合观察、隔离和记录的基础用品，涉及用药请先咨询农技人员。</Text></View><View className='shop-cart-button' onClick={() => setCheckoutOpen(true)} role='button' aria-label='打开购物车'><Text>购物车</Text>{totalCount ? <Badge tone='warning'>{totalCount}</Badge> : null}</View></View>
    {orderMessage ? <View className='shop-message' role='status'><Text>{orderMessage}</Text><Text onClick={() => setOrderMessage('')}>关闭</Text></View> : null}
    <View className='shop-categories' role='tablist'>{categories.map((item) => <View className={`shop-category ${category === item.key ? 'shop-category--active' : ''}`} key={item.key} role='tab' aria-selected={category === item.key} onClick={() => setCategory(item.key)}>{item.label}</View>)}</View>
    {!visibleProducts.length ? <EmptyState title='这个分类暂时没有商品' description='换一个分类看看，或先使用拍照诊断。' actionLabel='去拍照诊断' onAction={() => Taro.switchTab({ url: '/pages/diagnosis/index' })} /> : <View className='shop-grid'>{visibleProducts.map((product) => <View className='shop-product surface' key={product.id}><View className='shop-product__visual'><Text>{product.categoryLabel.slice(0, 2)}</Text>{product.badge ? <Badge tone='warning'>{product.badge}</Badge> : null}</View><Text className='shop-product__name'>{product.name}</Text><Text className='shop-product__subtitle'>{product.subtitle}</Text><Text className='shop-product__safety'>{product.safetyNote}</Text><View className='shop-product__bottom'><View><Text className='shop-product__price'>¥{product.price.toFixed(1)}</Text><Text className='shop-product__unit'>/{product.unit}</Text></View><Button size='md' onClick={() => addToCart(product)}>加入购物车</Button></View></View>)}</View>}
    {checkoutOpen ? <View className='shop-overlay' onClick={() => setCheckoutOpen(false)}><View className='shop-sheet' onClick={(event) => event.stopPropagation()}><Text className='shop-sheet__title'>确认购物车</Text>{cart.length ? <View className='shop-cart-list'>{cart.map((item) => <View className='shop-cart-item' key={item.product.id}><View><Text>{item.product.name}</Text><Text>¥{(item.product.price * item.quantity).toFixed(1)}</Text></View><View className='shop-quantity'><Text onClick={() => updateQuantity(item.product.id, -1)}>-</Text><Text>{item.quantity}</Text><Text onClick={() => updateQuantity(item.product.id, 1)}>+</Text></View></View>)}</View> : <Text className='shop-empty-cart'>购物车还是空的，先挑一件需要的用品。</Text>}{cart.length ? <><Input className='shop-address' value={address} placeholder='填写收货地址（Mock 不会真实配送）' onInput={(event) => setAddress(event.detail.value)} /><Text className='shop-total'>合计 ¥{totalPrice.toFixed(1)}</Text><Button block size='lg' loading={ordering} disabled={!address.trim() || ordering} onClick={submitOrder}>提交订单</Button></> : null}<Button block variant='ghost' onClick={() => setCheckoutOpen(false)}>继续挑选</Button></View></View> : null}
  </View>
}
