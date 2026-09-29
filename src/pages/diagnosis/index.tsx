import Taro from '@tarojs/taro'
import { Image, Picker, Text, View } from '@tarojs/components'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { DiagnosisImage, Plot } from '@nongjianzhen/types'
import { Button } from '@/components/qd-ui/Button'
import { Badge } from '@/components/qd-ui/Badge'
import { ErrorState } from '@/components/qd-ui/PageState'
import { Field } from '@/components/qd-ui/Field'
import { farmApi } from '@/services/farm.api'
import { diagnosisApi } from '@/services/diagnosis.api'
import { chooseDiagnosisImage, MediaPermissionError, uploadDiagnosisImage } from '@/services/media.api'
import { useAuthStore } from '@/store/auth.store'
import { createClientRequestId } from '@/utils/id'
import { track } from '@/utils/analytics'
import { splitOpsContent, useOpsConfigStore } from '@/store/ops-config.store'
import { DEFAULT_OPS_CONFIGS } from '@/mocks/ops-config'
import './index.scss'

const cropOptions = ['番茄', '黄瓜', '水稻', '玉米', '柑橘']

export default function DiagnosisPage() {
  const identity = useAuthStore((state) => state.identity)
  const { configs, load: loadOpsConfig } = useOpsConfigStore()
  const [plots, setPlots] = useState<Plot[]>([])
  const [plotSelection, setPlotSelection] = useState(0)
  const [cropName, setCropName] = useState('番茄')
  const [growthStage, setGrowthStage] = useState('开花期')
  const [symptomDescription, setSymptomDescription] = useState('')
  const [image, setImage] = useState<DiagnosisImage | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [permissionDenied, setPermissionDenied] = useState(false)
  const submittingRef = useRef(false)
  const clientRequestIdRef = useRef<string>()
  const quickStart = splitOpsContent(configs.find((item) => item.key === 'home.quick-start')?.content || DEFAULT_OPS_CONFIGS.find((item) => item.key === 'home.quick-start')?.content || '')

  useEffect(() => { void loadOpsConfig() }, [loadOpsConfig])

  useEffect(() => {
    let active = true
    if (!identity) {
      setPlots([])
      setPlotSelection(0)
      setError('')
      return () => { active = false }
    }
    farmApi.list()
      .then((response) => {
        if (active) setPlots(response.data.items.flatMap((farm) => farm.plots || []))
      })
      .catch((reason) => {
        if (active) setError(reason instanceof Error ? reason.message : '地块加载失败')
      })
    return () => { active = false }
  }, [identity])

  useEffect(() => {
    if (plotSelection > plots.length) setPlotSelection(0)
  }, [plotSelection, plots.length])

  const selectedPlot = plotSelection > 0 ? plots[plotSelection - 1] : undefined
  const plotNames = useMemo(() => ['暂不关联地块', ...plots.map((plot) => `${plot.name} · ${plot.cropName}`)], [plots])

  const handlePlotChange = (event: { detail: { value: string | number } }) => {
    const nextSelection = Number(event.detail.value)
    const nextPlot = nextSelection > 0 ? plots[nextSelection - 1] : undefined
    setPlotSelection(nextSelection)
    if (nextPlot) {
      setCropName(nextPlot.cropName)
      setGrowthStage(nextPlot.growthStage || '')
    }
  }

  const chooseImage = async () => {
    try {
      setError('')
      setPermissionDenied(false)
      const selected = await chooseDiagnosisImage()
      // 更换图片后必须生成新的幂等键，避免复用上一张图片的请求。
      clientRequestIdRef.current = undefined
      setImage(selected)
      track('diagnosis_image_selected', { quality: selected.quality.status })
    } catch (reason) {
      if (reason instanceof MediaPermissionError) {
        setPermissionDenied(true)
        setError(reason.message)
        return
      }
      const message = reason instanceof Error
        ? reason.message
        : typeof reason === 'object' && reason !== null && 'errMsg' in reason
          ? String((reason as { errMsg?: unknown }).errMsg || '无法读取图片')
          : '无法读取图片'
      if (!/cancel/i.test(message)) setError(message)
    }
  }

  const removeImage = () => {
    clientRequestIdRef.current = undefined
    setImage(null)
    setError('')
  }

  const openSettingsForPermission = async () => {
    try {
      await Taro.openSetting()
      const settings = await Taro.getSetting()
      const authSetting = settings.authSetting as unknown as Record<string, boolean | undefined>
      if (authSetting?.['scope.camera'] === false && authSetting?.['scope.album'] === false) {
        setPermissionDenied(true)
        setError('仍未获得图片权限，请允许访问相机或相册后再试。')
        return
      }
      setPermissionDenied(false)
      setError('')
    } catch {
      setError('暂时无法打开微信设置，请在微信的设置中允许访问相机或相册。')
    }
  }

  const submit = async () => {
    if (!identity) {
      const result = await Taro.showModal({ title: '请先登录', content: '登录后才能保存诊断记录和后续任务。', confirmText: '去登录' })
      if (result.confirm) Taro.switchTab({ url: '/pages/profile/index' })
      return
    }
    if (!image || loading || submittingRef.current) return
    // 在弹出质量确认前就锁定提交，避免快速连点打开多个确认框并重复创建诊断。
    submittingRef.current = true
    if (image.quality.status === 'FAILED') {
      Taro.showToast({ title: '请重新选择清晰图片', icon: 'none' })
      submittingRef.current = false
      return
    }
    if (image.quality.status === 'WARNING') {
      const result = await Taro.showModal({ title: '图片质量有限', content: image.quality.issues.join('；'), confirmText: '继续提交', cancelText: '重新拍摄' })
      if (!result.confirm) {
        submittingRef.current = false
        return
      }
    }

    // 同一张图片的失败重试复用幂等键，避免服务端成功但客户端超时后创建重复诊断。
    clientRequestIdRef.current ||= createClientRequestId('client_diag')
    setLoading(true)
    setError('')
    setProgress(10)
    try {
      const uploaded = await uploadDiagnosisImage(image, (percent) => setProgress(Math.max(10, Math.round(percent * 0.45))))
      setProgress(58)
      const response = await diagnosisApi.create({
        plotId: selectedPlot?.id,
        crop: { name: cropName.trim(), growthStage: growthStage.trim() },
        description: symptomDescription.trim() || undefined,
        images: [uploaded],
        clientRequestId: clientRequestIdRef.current!
      })
      setProgress(100)
      track('diagnosis_submitted', { diagnosisId: response.data.id })
      clientRequestIdRef.current = undefined
      Taro.navigateTo({ url: `/pages/diagnosis-result/index?id=${response.data.id}` })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '提交失败，请重试')
      track('diagnosis_submit_failed')
    } finally {
      submittingRef.current = false
      setLoading(false)
    }
  }

  return (
    <View className='page page--with-footer diagnosis-page'>
      <Text className='page-title'>{quickStart.title}</Text>
      <Text className='page-description'>{quickStart.body}</Text>

      <View className='diagnosis-steps' aria-label={loading ? '正在分析，第二步' : '正在拍摄，第一步'}>
        <View className={`diagnosis-step ${loading ? 'diagnosis-step--done' : 'diagnosis-step--active'}`}><Text>1</Text><Text>拍摄</Text></View>
        <View className={`diagnosis-step ${loading ? 'diagnosis-step--active' : ''}`}><Text>2</Text><Text>分析</Text></View>
        <View className='diagnosis-step'><Text>3</Text><Text>建议</Text></View>
      </View>

      <View className='section'>
        <Text className='section-title'>作物信息</Text>
        <View className='surface diagnosis-form'>
          <View className='diagnosis-picker'>
            <Text className='diagnosis-picker__label'>关联地块</Text>
            <Picker mode='selector' range={plotNames} value={plotSelection} onChange={handlePlotChange}>
              <View className='diagnosis-picker__value'>{selectedPlot ? `${selectedPlot.name} · ${selectedPlot.cropName}` : '暂不关联地块'}</View>
            </Picker>
          </View>
          <Field label='作物名称' value={cropName} placeholder='例如：番茄' onChange={setCropName} />
          <View className='diagnosis-crop-options'>
            <Text className='diagnosis-crop-options__label'>常用作物</Text>
            <View className='diagnosis-crop-options__list'>
              {cropOptions.map((crop) => (
                <Text key={crop} className={`diagnosis-crop-option ${cropName === crop ? 'diagnosis-crop-option--selected' : ''}`} onClick={() => setCropName(crop)}>{crop}</Text>
              ))}
            </View>
          </View>
          <Field label='生长阶段' value={growthStage} placeholder='例如：开花期' onChange={setGrowthStage} />
          <Field label='症状补充（可选）' value={symptomDescription} placeholder='例如：三天前开始出现，先从下部叶片变黄' multiline maxLength={160} onChange={setSymptomDescription} />
          <Text className='diagnosis-form__hint'>{symptomDescription.length}/160 字，描述出现时间、位置和变化会更有帮助</Text>
        </View>
      </View>

      <View className='section'>
        <Text className='section-title'>异常照片</Text>
        {image ? (
          <View className='diagnosis-preview surface'>
            <Image className='diagnosis-preview__image' src={image.url} mode='aspectFill' onClick={() => Taro.previewImage({ urls: [image.url] })} />
            <View className='diagnosis-preview__body'>
              <Badge tone={image.quality.status === 'PASS' ? 'success' : image.quality.status === 'WARNING' ? 'warning' : 'danger'}>
                {image.quality.status === 'PASS' ? '基础质量通过' : image.quality.status === 'WARNING' ? '建议检查图片' : '需要重新拍摄'}
              </Badge>
              {typeof image.quality.score === 'number' ? (
                <View className='diagnosis-preview__quality'>
                  <View className='diagnosis-preview__quality-top'><Text>拍摄质量</Text><Text>{image.quality.score} 分</Text></View>
                  <View className={`diagnosis-preview__quality-track diagnosis-preview__quality-track--${image.quality.status.toLowerCase()}`}><View style={{ transform: `scaleX(${(image.quality.score || 0) / 100})` }} /></View>
                </View>
              ) : null}
              <Text className='diagnosis-preview__meta'>{image.width} × {image.height}</Text>
              {image.quality.issues.map((issue) => <Text key={issue} className='diagnosis-preview__issue'>{issue}</Text>)}
              <View className='diagnosis-preview__actions'>
                <Text onClick={chooseImage}>重新选择</Text>
                <Text onClick={removeImage}>移除</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className='diagnosis-upload' onClick={chooseImage} role='button' aria-label='拍照或从相册选择图片'>
            <View className='diagnosis-upload__focus' />
            <Text className='diagnosis-upload__title'>拍照或从相册选择</Text>
            <Text className='diagnosis-upload__description'>靠近病斑 · 主体完整 · 避免逆光和反光</Text>
          </View>
        )}
      </View>

      <View className='diagnosis-tips'>
        <Text className='diagnosis-tips__title'>拍摄要点</Text>
        <View className='diagnosis-tip-row'><Text className='diagnosis-tip-row__index'>1</Text><Text>让病斑占画面一半以上，保留边缘和一小块健康组织。</Text></View>
        <View className='diagnosis-tip-row'><Text className='diagnosis-tip-row__index'>2</Text><Text>避开逆光、反光和手部阴影，叶片正反面各拍一张更好。</Text></View>
        <View className='diagnosis-tip-row'><Text className='diagnosis-tip-row__index'>3</Text><Text>当前客户端先检查尺寸和压缩情况，亮度、清晰度与主体由服务端复核。</Text></View>
      </View>

      {error ? <ErrorState title={permissionDenied ? '需要图片权限' : undefined} message={error} onRetry={permissionDenied ? undefined : image ? submit : chooseImage} actionLabel='前往设置' onAction={permissionDenied ? openSettingsForPermission : undefined} /> : null}

      <View className='fixed-footer'>
        {loading ? <View className='diagnosis-progress'><View className='diagnosis-progress__bar' style={{ transform: `scaleX(${progress / 100})` }} /></View> : null}
        <Button block size='lg' loading={loading} disabled={!image || !cropName.trim()} onClick={submit}>
          {image ? '提交诊断' : '请先选择图片'}
        </Button>
      </View>
    </View>
  )
}
