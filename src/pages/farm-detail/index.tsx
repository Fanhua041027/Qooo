import Taro, { useLoad } from '@tarojs/taro'
import { Picker, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import type { Plot } from '@nongjianzhen/types'
import { Button } from '@/components/qd-ui/Button'
import { EmptyState } from '@/components/qd-ui/EmptyState'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { Field } from '@/components/qd-ui/Field'
import { farmApi } from '@/services/farm.api'
import { useAuthStore } from '@/store/auth.store'
import './index.scss'

export default function FarmDetailPage() {
  const identity = useAuthStore((state) => state.identity)
  const [farmId, setFarmId] = useState('')
  const [farmName, setFarmName] = useState('农场')
  const [plots, setPlots] = useState<Plot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [cropName, setCropName] = useState('')
  const [growthStage, setGrowthStage] = useState('')
  const [plantedAt, setPlantedAt] = useState('')
  const [saving, setSaving] = useState(false)
  const [editingPlotId, setEditingPlotId] = useState<string>()
  const [deletingPlotId, setDeletingPlotId] = useState<string>()

  const load = async (id: string) => {
    if (!identity) {
      setPlots([])
      setError('')
      setLoading(false)
      return
    }
    if (!id) {
      setError('缺少农场编号，请返回农场列表后重试')
      setLoading(false)
      return
    }
    try {
      const response = await farmApi.listPlots(id)
      setPlots(response.data.items)
      setError('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '地块加载失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (identity && farmId) void load(farmId)
  }, [identity, farmId])

  useLoad((params) => {
    const id = params.id || ''
    setFarmId(id)
    let name = '农场'
    if (params.name) {
      try {
        name = decodeURIComponent(params.name)
      } catch {
        name = params.name
      }
    }
    setFarmName(name)
  })

  const createPlot = async () => {
    if (!farmId || !name.trim() || !cropName.trim() || !plantedAt || saving) return
    setSaving(true)
    try {
      const input = { name: name.trim(), cropName: cropName.trim(), growthStage: growthStage.trim() || undefined, plantedAt }
      if (editingPlotId) await farmApi.updatePlot(editingPlotId, input)
      else await farmApi.createPlot(farmId, input)
      setName('')
      setCropName('')
      setGrowthStage('')
      setPlantedAt('')
      setEditingPlotId(undefined)
      setShowForm(false)
      await load(farmId)
      Taro.showToast({ title: editingPlotId ? '地块已更新' : '地块已添加', icon: 'success' })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '地块创建失败')
    } finally {
      setSaving(false)
    }
  }

  const startCreatePlot = () => {
    setEditingPlotId(undefined)
    setName('')
    setCropName('')
    setGrowthStage('')
    setPlantedAt('')
    setShowForm(true)
  }

  const startEditPlot = (plot: Plot) => {
    setEditingPlotId(plot.id)
    setName(plot.name)
    setCropName(plot.cropName)
    setGrowthStage(plot.growthStage || '')
    setPlantedAt(plot.plantedAt ? plot.plantedAt.slice(0, 10) : '')
    setShowForm(true)
  }

  const removePlot = async (plot: Plot) => {
    if (deletingPlotId) return
    const result = await Taro.showModal({ title: '删除地块？', content: '已有诊断记录会保留，但之后不会再把这块地作为诊断上下文。', confirmText: '删除', confirmColor: '#b63f37' })
    if (!result.confirm) return
    setDeletingPlotId(plot.id)
    try {
      await farmApi.deletePlot(plot.id)
      if (editingPlotId === plot.id) startCreatePlot()
      await load(farmId)
      Taro.showToast({ title: '地块已删除', icon: 'success' })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '地块删除失败')
    } finally {
      setDeletingPlotId(undefined)
    }
  }

  if (!identity) {
    return <View className='page'><EmptyState title='登录后查看农场' description='登录后可以管理农场和地块信息。' actionLabel='去登录' onAction={() => Taro.switchTab({ url: '/pages/profile/index' })} /></View>
  }

  return (
    <View className='page farm-detail-page'>
      <View className='farm-detail-heading'>
        <View><Text className='page-title'>{farmName}</Text><Text className='page-description'>{plots.length} 块地正在管理</Text></View>
        <Button variant='secondary' onClick={() => showForm ? setShowForm(false) : startCreatePlot()}>{showForm ? '取消' : '添加地块'}</Button>
      </View>

      {showForm ? (
        <View className='surface plot-form'>
          <Text className='section-title'>{editingPlotId ? '编辑地块' : '地块信息'}</Text>
          <Field label='地块名称' value={name} placeholder='例如：东一号棚' onChange={setName} />
          <Field label='当前作物' value={cropName} placeholder='例如：番茄' onChange={setCropName} />
          <Field label='生长阶段' value={growthStage} placeholder='例如：开花期' onChange={setGrowthStage} />
          <View className='plot-form__date'>
            <Text>种植日期</Text>
            <Picker mode='date' value={plantedAt} onChange={(event) => setPlantedAt(event.detail.value)}>
              <View>{plantedAt || '选择日期'}</View>
            </Picker>
          </View>
          <Button block loading={saving} disabled={!name.trim() || !cropName.trim() || !plantedAt} onClick={createPlot}>保存地块</Button>
        </View>
      ) : null}

      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={() => load(farmId)} /> : plots.length === 0 ? (
        <EmptyState title='还没有地块' description='添加地块、作物和种植日期，为诊断补充上下文。' actionLabel='添加地块' onAction={startCreatePlot} />
      ) : (
        <View className='plot-list'>
          {plots.map((plot) => (
            <View className='plot-row' key={plot.id}>
              <View className='plot-row__crop'><Text>{plot.cropName.slice(0, 1)}</Text></View>
              <View className='plot-row__body'>
                <Text className='plot-row__name'>{plot.name}</Text>
                <Text className='plot-row__meta'>{plot.cropName} · {plot.growthStage || '阶段未填写'} · {plot.areaMu ? `${plot.areaMu} 亩` : '面积未填写'}</Text>
                <View className='plot-row__actions'><Button size='md' variant='ghost' onClick={() => startEditPlot(plot)}>编辑</Button><Button size='md' variant='danger' loading={deletingPlotId === plot.id} onClick={() => removePlot(plot)}>删除</Button></View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
