import Taro, { useDidShow } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Farm } from '@nongjianzhen/types'
import { Button } from '@/components/qd-ui/Button'
import { EmptyState } from '@/components/qd-ui/EmptyState'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { Field } from '@/components/qd-ui/Field'
import { farmApi } from '@/services/farm.api'
import { useAuthStore } from '@/store/auth.store'
import './index.scss'

export default function FarmPage() {
  const identity = useAuthStore((state) => state.identity)
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [saving, setSaving] = useState(false)
  const [editingFarmId, setEditingFarmId] = useState<string>()
  const loadedIdentityRef = useRef<string>()

  const load = useCallback(async () => {
    if (!identity) {
      loadedIdentityRef.current = undefined
      setFarms([])
      setError('')
      setLoading(false)
      return
    }
    loadedIdentityRef.current = identity.userId
    try {
      const response = await farmApi.list()
      setFarms(response.data.items)
      setError('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '农场加载失败')
    } finally {
      setLoading(false)
    }
  }, [identity])

  useDidShow(load)

  useEffect(() => {
    if (!identity) {
      loadedIdentityRef.current = undefined
      return
    }
    if (loadedIdentityRef.current !== identity.userId) {
      setLoading(true)
      void load()
    }
  }, [identity, load])

  const createFarm = async () => {
    if (!name.trim() || !location.trim() || saving) return
    setSaving(true)
    try {
      if (editingFarmId) await farmApi.update(editingFarmId, { name: name.trim(), location: location.trim() })
      else await farmApi.create({ name: name.trim(), location: location.trim() })
      setName('')
      setLocation('')
      setEditingFarmId(undefined)
      setShowForm(false)
      await load()
      Taro.showToast({ title: editingFarmId ? '农场已更新' : '农场已创建', icon: 'success' })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '创建失败')
    } finally {
      setSaving(false)
    }
  }

  const startCreate = () => {
    setEditingFarmId(undefined)
    setName('')
    setLocation('')
    setShowForm(true)
  }

  const startEdit = (farm: Farm) => {
    setEditingFarmId(farm.id)
    setName(farm.name)
    setLocation(farm.location)
    setShowForm(true)
  }

  if (!identity) {
    return <View className='page page--with-footer'><EmptyState title='登录后管理农场' description='农场和地块会作为诊断上下文保存。' actionLabel='去登录' onAction={() => Taro.switchTab({ url: '/pages/profile/index' })} /></View>
  }

  return (
    <View className='page page--with-footer farm-page'>
      <View className='farm-heading'>
        <View><Text className='page-title'>我的农场</Text><Text className='page-description'>管理地块、作物与生长阶段。</Text></View>
        <Button variant='secondary' onClick={() => showForm ? setShowForm(false) : startCreate()}>{showForm ? '取消' : '新建'}</Button>
      </View>

      {showForm ? (
        <View className='surface farm-form'>
          <Text className='section-title'>{editingFarmId ? '编辑农场' : '创建农场'}</Text>
          <Field label='农场名称' value={name} placeholder='例如：向阳示范农场' onChange={setName} />
          <Field label='所在地区' value={location} placeholder='例如：浙江省杭州市临安区' onChange={setLocation} />
          <View className='farm-form__submit'><Button block loading={saving} disabled={!name.trim() || !location.trim()} onClick={createFarm}>保存农场</Button></View>
        </View>
      ) : null}

      {loading ? <LoadingState /> : error && farms.length === 0 ? <ErrorState title='农场加载失败' message={error} onRetry={load} /> : farms.length === 0 ? (
        <EmptyState title='还没有农场' description='先创建农场，再添加地块和作物信息。' actionLabel='创建农场' onAction={startCreate} />
      ) : (
        <View>{error ? <View className='farm-stale' role='status'><Text>网络暂时不可用，以下是最近一次同步的农场。</Text><Text className='farm-stale__action' onClick={load}>重试</Text></View> : null}<View className='farm-list'>
          {farms.map((farm) => (
            <View className='farm-card' key={farm.id}>
              <View className='farm-card__main' onClick={() => Taro.navigateTo({ url: `/pages/farm-detail/index?id=${farm.id}&name=${encodeURIComponent(farm.name)}` })}>
                <View className='farm-card__top'><Text className='farm-card__name'>{farm.name}</Text><Text className='farm-card__score'>{farm.healthScore ? `健康度 ${farm.healthScore}` : '查看详情'}</Text></View>
                <Text className='farm-card__location'>{farm.location}</Text>
                <View className='farm-card__stats'><Text>{farm.plots?.length || 0} 块地</Text><Text>{farm.areaMu || 0} 亩</Text></View>
              </View>
              <View className='farm-card__actions'><Button size='md' variant='ghost' onClick={() => startEdit(farm)}>编辑农场</Button><Button size='md' variant='secondary' onClick={() => Taro.navigateTo({ url: `/pages/farm-detail/index?id=${farm.id}&name=${encodeURIComponent(farm.name)}` })}>管理地块</Button></View>
            </View>
          ))}
        </View></View>
      )}
    </View>
  )
}
