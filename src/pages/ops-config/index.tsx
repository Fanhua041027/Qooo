import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { Input, Text, Textarea, View } from '@tarojs/components'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/qd-ui/Badge'
import { Button } from '@/components/qd-ui/Button'
import { EmptyState } from '@/components/qd-ui/EmptyState'
import { ErrorState, LoadingState } from '@/components/qd-ui/PageState'
import { useAuthStore } from '@/store/auth.store'
import { opsConfigApi, type OpsConfig } from '@/services/ops-config.api'
import { formatDateTime } from '@/utils/format'
import { isOpsIdentity } from './policy'
import { useOpsConfigStore } from '@/store/ops-config.store'
import { canManageOpsConfig } from '@/store/ops-config.store'
import { validateOpsConfigContent } from './policy'
import './index.scss'

const MAX_CONTENT_LENGTH = 2000

function getPageParams() {
  return (Taro.getCurrentInstance().router?.params || {}) as Record<string, string | undefined>
}

function categoryLabel(category: OpsConfig['category']) {
  return { RISK: '风险等级', ACTION: '处理建议', IMAGE_QUALITY: '图片质量', SAFETY: '安全提醒', EXPERT_REVIEW: '专家复核', HOME: '首页提示' }[category] || category
}

function getErrorMessage(reason: unknown, fallback: string) {
  return reason instanceof Error ? reason.message : fallback
}

function displayConfigContent(content: string) {
  try { return JSON.stringify(JSON.parse(content), null, 2) }
  catch { return content }
}

export default function OpsConfigPage() {
  const replaceOpsConfig = useOpsConfigStore((state) => state.replace)
  const replaceAllOpsConfigs = useOpsConfigStore((state) => state.replaceAll)
  const storedConfigs = useOpsConfigStore((state) => state.configs)
  const identity = useAuthStore((state) => state.identity)
  const params = getPageParams()
  const demoState = params.state || ''
  const forceUnauthorized = demoState === 'unauthorized'
  const authorized = isOpsIdentity(identity?.userId, identity?.role) && !forceUnauthorized
  const isLarge = params.large === '1' || demoState === 'large'
  const isLongTextDemo = params.long === '1' || demoState === 'long'
  const forcedEmpty = demoState === 'empty'
  const forcedError = demoState === 'error'
  const forcedSaveError = demoState === 'save-error'
  const [categoryFilter, setCategoryFilter] = useState<OpsConfig['category'] | 'ALL'>('ALL')
  const [selectedKey, setSelectedKey] = useState(params.key || '')
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewing, setPreviewing] = useState(false)
  const [rollingBack, setRollingBack] = useState(false)
  const [error, setError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [offline, setOffline] = useState(false)
  const [editing, setEditing] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [newConfig, setNewConfig] = useState({ key: '', name: '', description: '', category: 'HOME' as OpsConfig['category'], content: '' })
  const loadedRef = useRef(false)
  const longDemoAppliedRef = useRef(false)
  const configs = forcedEmpty || forcedError ? [] : storedConfigs
  const filteredConfigs = categoryFilter === 'ALL' ? configs : configs.filter((item) => item.category === categoryFilter)
  const selected = filteredConfigs.find((item) => item.key === selectedKey)
  const canEditSelected = Boolean(selected && canManageOpsConfig(identity?.role) && (selected.category !== 'SAFETY' || ['EXPERT', 'ADMIN'].includes(String(identity?.role || '').toUpperCase())))
  const dirty = Boolean(selected && draft !== selected.content)
  const canSave = Boolean(canEditSelected && draft.trim() && dirty && !saving && !offline)
  const canCreate = Boolean(newConfig.key.trim() && newConfig.name.trim() && newConfig.description.trim() && newConfig.content.trim() && newConfig.content.length <= MAX_CONTENT_LENGTH && !creating && !offline)

  const load = useCallback(async () => {
    if (!authorized) {
      setLoading(false)
      return
    }
    setLoading(true)
    if (forcedEmpty) {
      replaceAllOpsConfigs([])
      setSelectedKey('')
      setError('')
      setLoading(false)
      Taro.stopPullDownRefresh()
      return
    }
    if (forcedError) {
      replaceAllOpsConfigs([])
      setSelectedKey('')
      setError('演示：配置服务返回错误，请稍后重试。')
      setLoading(false)
      Taro.stopPullDownRefresh()
      return
    }
    try {
      const response = await opsConfigApi.list()
      const items = response.data.items
      replaceAllOpsConfigs(items)
      setSelectedKey((current) => (current && items.some((item) => item.key === current) ? current : items[0]?.key || ''))
      setError('')
      setOffline(false)
      loadedRef.current = true
    } catch (reason) {
      setOffline(true)
      setError(getErrorMessage(reason, '配置读取失败，请重试'))
    } finally {
      setLoading(false)
      Taro.stopPullDownRefresh()
    }
  }, [authorized, forcedEmpty, forcedError, replaceAllOpsConfigs])

  useEffect(() => { void load() }, [load])
  usePullDownRefresh(load)

  useEffect(() => {
    if (!selected) return
    setDraft(selected.content)
    setEditing(false)
    setPreviewOpen(false)
    setSaveError('')
    setSuccessMessage('')
    if (isLongTextDemo && !longDemoAppliedRef.current) {
      longDemoAppliedRef.current = true
      setDraft(`${selected.content}\n\n长文案演示：请结合田间实际情况持续观察。${'记录叶片颜色、病斑边缘和扩散方向，有助于下一次复查时比较变化。'.repeat(5)}`)
      setEditing(true)
    }
  }, [selectedKey, selected?.content, isLongTextDemo])

  useEffect(() => {
    const handler = (event: { isConnected: boolean }) => {
      setOffline(!event.isConnected)
      if (event.isConnected && authorized && loadedRef.current) void load()
    }
    Taro.onNetworkStatusChange(handler)
    return () => Taro.offNetworkStatusChange(handler)
  }, [authorized, load])

  const save = async () => {
    if (!selected || !canSave) return
    setSaving(true)
    setSaveError('')
    setSuccessMessage('')
    try {
      const response = await opsConfigApi.save(selected.key, forcedSaveError ? `${draft}\n[保存失败演示]` : draft, selected.version)
      replaceOpsConfig(response.data)
      setDraft(response.data.content)
      setEditing(false)
      setError('')
      setSuccessMessage(`已保存并发布 ${response.data.version}`)
      Taro.showToast({ title: `已保存 ${response.data.version}`, icon: 'success' })
    } catch (reason) {
      const message = getErrorMessage(reason, '保存失败，上一版本仍可用')
      setSaveError(message)
      setError('')
    } finally {
      setSaving(false)
    }
  }

  const openPreview = async () => {
    if (!selected || !canSave) return
    const validationError = validateOpsConfigContent(draft, selected.category)
    if (validationError) {
      setSaveError(validationError)
      return
    }
    setPreviewing(true)
    setSaveError('')
    try {
      await opsConfigApi.preview(selected.key, draft, selected.category)
      setPreviewOpen(true)
    } catch (reason) {
      setSaveError(getErrorMessage(reason, '配置校验失败，请检查必填字段后重试'))
    } finally {
      setPreviewing(false)
    }
  }

  const createConfig = async () => {
    if (!canCreate) return
    setCreating(true)
    setCreateError('')
    try {
      const response = await opsConfigApi.create(newConfig)
      replaceOpsConfig(response.data)
      setSelectedKey(response.data.key)
      setCreateOpen(false)
      setNewConfig({ key: '', name: '', description: '', category: 'HOME', content: '' })
      setSuccessMessage(`已新增并发布 ${response.data.version}`)
      Taro.showToast({ title: '新增成功', icon: 'success' })
    } catch (reason) {
      setCreateError(getErrorMessage(reason, '新增失败，请检查配置后重试'))
    } finally {
      setCreating(false)
    }
  }

  const rollback = async (version: string) => {
    if (!selected || rollingBack) return
    const result = await Taro.showModal({ title: `恢复 ${version}`, content: '恢复后会生成一个新的已发布版本，当前版本仍会保留在历史记录中。', confirmText: '确认恢复', cancelText: '取消' })
    if (!result.confirm) return
    setRollingBack(true)
    setSaveError('')
    try {
      const response = await opsConfigApi.rollback(selected.key, version)
      replaceOpsConfig(response.data)
      setDraft(response.data.content)
      setEditing(false)
      setError('')
      setSuccessMessage(`已恢复 ${version}，新版本 ${response.data.version}`)
      Taro.showToast({ title: `已恢复 ${version}`, icon: 'success' })
    } catch (reason) {
      setSaveError(getErrorMessage(reason, '恢复失败，当前配置未改变'))
    } finally {
      setRollingBack(false)
    }
  }

  if (!authorized) {
    return <View className='page ops-config-page'><ErrorState title='无权访问运营配置' message={identity ? '当前账号不是运营账号，配置不会被读取或保存。' : '请使用运营测试账号登录后再访问。'} onRetry={() => Taro.switchTab({ url: '/pages/profile/index' })} /></View>
  }
  if (loading && !configs.length) return <View className={`page ops-config-page ${isLarge ? 'ops-config-page--large' : ''}`}><LoadingState label='正在读取最新配置' /></View>
  if (error && !configs.length) return <View className={`page ops-config-page ${isLarge ? 'ops-config-page--large' : ''}`}><ErrorState title='配置服务暂时不可用' message={error} onRetry={load} /></View>
  if (!configs.length) return <View className={`page ops-config-page ${isLarge ? 'ops-config-page--large' : ''}`}><EmptyState title='暂无运营配置' description='配置项为空时，诊断结果会继续使用安全默认文案。创建配置后即可在这里统一维护。' actionLabel='重新读取' onAction={load} /></View>

  return (
    <View className={`page ops-config-page ${isLarge ? 'ops-config-page--large' : ''}`}>
      <View className='ops-config-heading'>
        <View><Text className='page-title'>运营配置</Text><Text className='page-description'>调整风险说明、处理建议和首页提示。保存后会记录版本，结果页只读取已发布内容。</Text></View>
        <Button size='md' variant='secondary' onClick={() => { setCreateOpen(true); setCreateError('') }}>新增配置</Button>
        <Badge tone={offline ? 'warning' : 'success'}>{offline ? '离线' : '已同步'}</Badge>
      </View>
      {error ? <View className='ops-config-alert' role='alert'><Text>读取失败：{error}</Text><Text className='ops-config-alert__retry' onClick={load}>重新读取</Text></View> : null}
      {successMessage ? <View className='ops-config-success' role='status'><Text className='ops-config-success__icon'>✓</Text><Text>{successMessage}</Text></View> : null}
      <View className='ops-config-filters' role='tablist'>
        {(['ALL', 'RISK', 'ACTION', 'IMAGE_QUALITY', 'SAFETY', 'EXPERT_REVIEW', 'HOME'] as const).map((category) => <View key={category} className={`ops-config-filter ${categoryFilter === category ? 'ops-config-filter--active' : ''}`} role='tab' aria-selected={categoryFilter === category} onClick={() => { setCategoryFilter(category); const next = category === 'ALL' ? configs : configs.filter((item) => item.category === category); setSelectedKey(next[0]?.key || '') }}>{category === 'ALL' ? '全部' : categoryLabel(category)}</View>)}
      </View>
      <View className='ops-config-layout'>
        <View className='ops-config-list surface'>
          <View className='ops-config-list__heading'><Text className='ops-config-list__title'>配置项</Text><Text className='ops-config-list__count'>{filteredConfigs.length} / {configs.length} 项</Text></View>
          {filteredConfigs.map((item) => <View key={item.key} className={`ops-config-list__item ${item.key === selectedKey ? 'ops-config-list__item--active' : ''}`} role='button' aria-current={item.key === selectedKey ? 'page' : undefined} onClick={() => setSelectedKey(item.key)}>
            <View className='ops-config-list__item-main'><View className='ops-config-list__item-title'><Text>{item.name}</Text><Badge tone={item.status === 'PUBLISHED' ? 'success' : 'warning'}>{item.status === 'PUBLISHED' ? '已发布' : '草稿'}</Badge></View><Text className='ops-config-list__category'>{categoryLabel(item.category)}</Text><Text className='ops-config-list__meta'>当前版本 {item.version} · 最后修改 {formatDateTime(item.updatedAt)}</Text></View>
            <Text className='ops-config-list__arrow' aria-hidden>›</Text>
          </View>)}
        </View>
        {selected ? <View className='ops-config-editor'>
          <View className='surface ops-config-card'>
            <View className='ops-config-card__head'><View><Text className='ops-config-card__eyebrow'>{categoryLabel(selected.category)} · {selected.key}</Text><Text className='ops-config-card__title'>{selected.name}</Text><Text className='ops-config-card__description'>{selected.description}</Text></View><Badge tone={selected.status === 'PUBLISHED' ? 'success' : 'warning'}>{selected.status === 'PUBLISHED' ? '已发布' : '草稿'}</Badge></View>
            <View className='ops-config-meta'><Text>当前版本 {selected.version}</Text><Text>最后修改 {formatDateTime(selected.updatedAt)}</Text><Text>修改人 {selected.updatedBy}</Text></View>
            {!editing ? <View className='ops-config-readonly'><Text className='ops-config-readonly__label'>当前配置</Text><Text className='ops-config-content'>{displayConfigContent(selected.content)}</Text>{canEditSelected ? <Button block size='lg' onClick={() => { setEditing(true); setSuccessMessage('') }}>编辑配置</Button> : <Text className='ops-config-helper'>安全提醒由农艺专家或管理员维护，当前账号仅可查看。</Text>}</View> : <View className='ops-config-editing'>
              <View className='ops-config-editing__label'><Text>编辑文案</Text><Text className='ops-config-counter'>{draft.length}/{MAX_CONTENT_LENGTH}</Text></View>
              <Textarea className={`ops-config-textarea ${saveError ? 'ops-config-textarea--error' : ''}`} maxlength={MAX_CONTENT_LENGTH} value={draft} onInput={(event) => { setDraft(event.detail.value); setSaveError(''); setSuccessMessage('') }} placeholder='请输入配置文案' autoHeight />
              <Text className='ops-config-helper'>支持换行，长文案会完整展示；请避免使用“确定诊断”等绝对表述。</Text>
              <View className='ops-config-preview'><View className='ops-config-preview__heading'><Text className='ops-config-preview__label'>保存前预览</Text><Text className='ops-config-preview__hint'>不会立即保存</Text></View><Text className='ops-config-content'>{draft ? displayConfigContent(draft) : '暂无内容'}</Text></View>
              {saveError ? <View className='ops-config-save-error' role='alert'><Text className='ops-config-save-error__icon'>!</Text><View><Text className='ops-config-save-error__title'>保存失败</Text><Text className='ops-config-save-error__message'>{saveError} 修改文案后可再次尝试。</Text></View></View> : null}
              <View className='ops-config-edit-actions'><Button variant='ghost' onClick={() => { setDraft(selected.content); setEditing(false); setSaveError('') }}>取消编辑</Button><Button block size='lg' variant={saveError ? 'danger' : 'primary'} loading={saving || previewing} disabled={!canSave || previewing} onClick={openPreview}>{saveError ? '重新预览并保存' : '预览并保存'}</Button></View>
            </View>}
          </View>
          <View className='surface ops-config-history'><View className='ops-config-history__heading'><Text className='ops-config-history__title'>历史版本</Text><Text className='ops-config-history__hint'>恢复会生成新版本</Text></View>{selected.previousVersions.length ? selected.previousVersions.map((version) => <View className='ops-config-version' key={version.version}><View className='ops-config-version__body'><View className='ops-config-version__top'><Text className='ops-config-version__name'>{version.version}</Text><Text className='ops-config-version__meta'>{formatDateTime(version.updatedAt)} · {version.updatedBy}</Text></View><Text className='ops-config-version__content'>{version.content}</Text></View><Button size='md' variant='secondary' loading={rollingBack} disabled={rollingBack || offline} onClick={() => rollback(version.version)}>恢复</Button></View>) : <Text className='ops-config-empty'>暂无可恢复版本</Text>}</View>
        </View> : null}
      </View>
      {previewOpen && selected ? <View className='ops-config-overlay' onClick={() => setPreviewOpen(false)}><View className='ops-config-preview-sheet' onClick={(event) => event.stopPropagation()}><View className='ops-config-preview-sheet__handle' /><Text className='ops-config-preview-sheet__title'>确认发布？</Text><Text className='ops-config-preview-sheet__description'>发布后结果页会读取新文案，当前版本 {selected.version} 会保留在历史记录中。</Text><View className='ops-config-preview-sheet__content'><Text className='ops-config-preview-sheet__label'>新配置预览</Text><Text className='ops-config-content'>{displayConfigContent(draft)}</Text></View><View className='ops-config-preview-sheet__actions'><Button variant='ghost' onClick={() => setPreviewOpen(false)}>返回修改</Button><Button block size='lg' loading={saving} disabled={saving || offline} onClick={save}>确认保存</Button></View></View></View> : null}
      {createOpen ? <View className='ops-config-overlay' onClick={() => setCreateOpen(false)}><View className='ops-config-create-sheet' onClick={(event) => event.stopPropagation()}><View className='ops-config-preview-sheet__handle' /><Text className='ops-config-preview-sheet__title'>新增配置</Text><Text className='ops-config-preview-sheet__description'>新增后立即发布，结果页会读取该配置。</Text><Input className='ops-config-input' value={newConfig.key} maxlength={80} placeholder='配置 key，例如 home.quick-start' onInput={(event) => setNewConfig((current) => ({ ...current, key: event.detail.value }))} /><Input className='ops-config-input' value={newConfig.name} maxlength={80} placeholder='配置名称' onInput={(event) => setNewConfig((current) => ({ ...current, name: event.detail.value }))} /><Input className='ops-config-input' value={newConfig.description} maxlength={200} placeholder='配置说明' onInput={(event) => setNewConfig((current) => ({ ...current, description: event.detail.value }))} /><Input className='ops-config-input' value={newConfig.category} placeholder='分类：RISK / ACTION / HOME' onInput={(event) => setNewConfig((current) => ({ ...current, category: event.detail.value.toUpperCase() as OpsConfig['category'] }))} /><Textarea className='ops-config-textarea' maxlength={MAX_CONTENT_LENGTH} value={newConfig.content} placeholder='请输入配置文案' autoHeight onInput={(event) => setNewConfig((current) => ({ ...current, content: event.detail.value }))} />{createError ? <View className='ops-config-save-error' role='alert'><Text>{createError}</Text></View> : null}<View className='ops-config-preview-sheet__actions'><Button variant='ghost' onClick={() => setCreateOpen(false)}>取消</Button><Button block size='lg' loading={creating} disabled={!canCreate} onClick={createConfig}>确认新增</Button></View></View></View> : null}
    </View>
  )
}

export { isOpsIdentity }
