import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { Picker, Text, View } from '@tarojs/components'
import { useCallback, useEffect, useState } from 'react'
import type { WeatherHistoryResult, WeatherOverview } from '@nongjianzhen/types'
import { Badge } from '@/components/qd-ui/Badge'
import { Button } from '@/components/qd-ui/Button'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { extendedFeaturesApi } from '@/services/extended-features.api'
import './index.scss'

interface WeatherSelection { name: string; address: string; latitude?: number; longitude?: number }

const WEATHER_SELECTION_KEY = 'nongjianzhen_weather_selection'

function formatUpdated(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '刚刚更新' : `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} 更新`
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherOverview>()
  const [selection, setSelection] = useState<WeatherSelection>(() => Taro.getStorageSync<WeatherSelection>(WEATHER_SELECTION_KEY))
  const [region, setRegion] = useState<string[]>(() => Taro.getStorageSync<string[]>(`${WEATHER_SELECTION_KEY}_region`) || [])
  const [history, setHistory] = useState<WeatherHistoryResult>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState('')
  const load = useCallback(async (nextSelection?: WeatherSelection) => {
    const target = nextSelection || selection
    if (!target) {
      Taro.stopPullDownRefresh()
      return
    }
    setError('')
    setLoading(true)
    try { setWeather((await extendedFeaturesApi.getWeather({ location: target.name || target.address, latitude: target.latitude, longitude: target.longitude })).data); setError('') }
    catch (reason) { setError(reason instanceof Error ? reason.message : '天气服务暂时不可用') }
    finally { setLoading(false); Taro.stopPullDownRefresh() }
  }, [selection])
  usePullDownRefresh(load)
  useEffect(() => {
    if (selection && !weather) void load(selection)
  }, [load, selection, weather])
  const selectRegion = useCallback((value: string[]) => {
    const normalized = value.filter(Boolean)
    if (normalized.length < 3) return
    const name = normalized.join('')
    const nextSelection = { name, address: normalized.join(' · ') }
    setRegion(normalized)
    setSelection(nextSelection)
    Taro.setStorageSync(WEATHER_SELECTION_KEY, nextSelection)
    Taro.setStorageSync(`${WEATHER_SELECTION_KEY}_region`, normalized)
    setWeather(undefined)
    setError('')
    setHistory(undefined)
    setHistoryError('')
  }, [])

  const regionPicker = (label: string) => <Picker mode='region' value={region} onChange={(event) => selectRegion(event.detail.value as string[])}><View className='weather-region-picker' role='button'><Text>{label}</Text><Text className='weather-region-picker__arrow'>选择省、市、区县</Text></View></Picker>
  const loadHistory = useCallback(async () => {
    setHistoryLoading(true)
    setHistoryError('')
    try {
      setHistory((await extendedFeaturesApi.getWeatherHistory({ location: selection?.name || weather?.location, latitude: selection?.latitude, longitude: selection?.longitude })).data)
    } catch (reason) {
      setHistoryError(reason instanceof Error ? reason.message : '历史天气暂时无法读取')
    } finally {
      setHistoryLoading(false)
    }
  }, [selection, weather?.location])

  if (loading && !weather) return <View className='page weather-page'><LoadingState label='正在读取田间天气' /></View>
  if (error && !weather) return <View className='page weather-page'><ErrorState title='天气暂时不可用' message={`${error}，已保留重试入口。`} onRetry={() => load()} /></View>
  if (!selection || !weather) return <View className='page weather-page'><View className='weather-empty'><Text className='page-title'>选择天气地区</Text><Text className='page-description'>从微信地区选项中选择省、市和区县，系统会自动查询对应天气。</Text>{regionPicker('选择省、市、区县')}{error ? <Text className='weather-empty__error'>{error}</Text> : null}</View></View>

  return <View className='page weather-page'>
    <View className='weather-heading'><View><Text className='page-title'>田间天气</Text><Text className='page-description'>{selection?.name || weather.location}</Text><Text className='weather-location-detail'>{selection?.address || '请选择一个地区查看对应天气'}</Text></View><View className='weather-heading__meta'><Badge tone={weather.source === 'AGENT_TECH' ? 'success' : 'warning'}>{weather.source === 'AGENT_TECH' ? '实时天气' : '演示数据'}</Badge><Text>{formatUpdated(weather.updatedAt)}</Text></View></View>
    {regionPicker(`切换地区 · ${selection.name}`)}
    {error ? <View className='weather-alert weather-alert--error' role='alert'><Text>{error}</Text><Text onClick={() => load()}>重新读取</Text></View> : null}
    <View className='weather-current surface'>
      <View className='weather-current__top'><View><Text className='weather-current__condition'>{weather.current.condition}</Text><Text className='weather-current__feels'>体感 {weather.current.feelsLike}°C</Text></View><Text className={`weather-symbol weather-symbol--${weather.current.icon}`} aria-label={weather.current.condition}>{weather.current.condition.slice(0, 1)}</Text></View>
      <View className='weather-current__temperature'><Text>{weather.current.temperature}</Text><Text>°C</Text></View>
      <View className='weather-metrics'><View><Text>{weather.current.humidity}%</Text><Text>相对湿度</Text></View><View><Text>{weather.current.wind}</Text><Text>风力</Text></View><View><Text>UV {weather.current.uvIndex}</Text><Text>紫外线</Text></View></View>
    </View>
    {weather.alerts.map((alert) => <View className={`weather-alert weather-alert--${alert.level.toLowerCase()}`} key={alert.id}><View><Text className='weather-alert__title'>{alert.title}</Text><Text className='weather-alert__content'>{alert.content}</Text></View><Text className='weather-alert__action' onClick={() => Taro.switchTab({ url: '/pages/tasks/index' })}>{alert.action}</Text></View>)}
    <View className='section'><View className='weather-section-heading'><Text className='section-title'>未来 5 天</Text><Text className='weather-section-heading__hint'>降雨概率仅作安排参考</Text></View><View className='surface weather-forecast'>{weather.forecast.map((day) => <View className='weather-day' key={day.date}><Text className='weather-day__date'>{day.weekday}</Text><Text className={`weather-symbol weather-symbol--${day.icon}`} aria-label={day.condition}>{day.condition.slice(0, 1)}</Text><Text className='weather-day__condition'>{day.condition}</Text><Text className='weather-day__temp'>{day.high}° / {day.low}°</Text><Text className='weather-day__rain'>雨 {day.precipitation}%</Text><Text className='weather-day__wind'>{day.wind}</Text></View>)}</View></View>
    <View className='section weather-history'><View className='weather-section-heading'><View><Text className='section-title'>历史天气</Text><Text className='weather-section-heading__hint'>最近 7 天再分析数据，仅作复盘参考</Text></View><Button size='md' variant='secondary' loading={historyLoading} onClick={loadHistory}>读取</Button></View>{historyError ? <View className='weather-alert weather-alert--error' role='alert'><Text>{historyError}</Text><Text onClick={loadHistory}>重试</Text></View> : null}{history ? <View className='surface weather-history__list'>{history.days.map((day) => <View className='weather-history__row' key={day.date}><View><Text>{day.date}</Text><Text>{day.condition} · 湿度 {day.humidity}%</Text></View><View><Text>{day.high}° / {day.low}°</Text><Text>降水 {day.precipitation}mm</Text></View></View>)}</View> : <Text className='weather-history__empty'>点击“读取”查看最近 7 天的天气复盘，帮助判断异常是否与连续高湿或降雨有关。</Text>}</View>
    <View className='section weather-actions'><Text className='section-title'>今天怎么安排</Text><View className='weather-action-grid'><View className='weather-action' onClick={() => Taro.switchTab({ url: '/pages/diagnosis/index' })}><Text className='weather-action__title'>拍照看叶面</Text><Text>天气变化后，先记录异常部位</Text></View><View className='weather-action' onClick={() => Taro.switchTab({ url: '/pages/tasks/index' })}><Text className='weather-action__title'>调整农事任务</Text><Text>避开叶面潮湿时段操作</Text></View></View></View>
    <Button block variant='secondary' onClick={() => load()}>刷新天气</Button>
  </View>
}
