const { requireAuth } = require('../../services/auth-service')
const { getFarm, createFarm, updateFarm, createPlot } = require('../../services/farm-service')

Page({
  data: {
    state: 'normal',
    forceEmpty: false,
    farm: null,
    plots: [],
    editor: null
  },
  onLoad(options) {
    if (!requireAuth()) return
    this.setData({ state: options.state || 'normal', forceEmpty: options.state === 'empty' })
  },
  onShow() {
    if (this.data.forceEmpty) {
      this.setData({ farm: null, plots: [], state: 'empty' })
      return
    }
    if (!this.data.farm) this.loadFarm()
  },
  loadFarm() {
    const farm = getFarm()
    const plots = (farm.plots || []).map((plot) => ({ ...plot, cropLabel: `${plot.crop} · ${plot.growthStage}` }))
    this.setData({ farm, plots, state: plots.length || farm.name ? 'normal' : 'empty' })
  },
  openFarmEditor() {
    const farm = this.data.farm || { name: '', location: '' }
    this.setData({ editor: { type: 'farm', name: farm.name, location: farm.location } })
  },
  addFarm() { this.setData({ editor: { type: 'farm', name: '', location: '' } }) },
  addPlot() { this.setData({ editor: { type: 'plot', name: '', crop: '', growthStage: '苗期', area: '' } }) },
  updateEditor(event) {
    this.setData({ [`editor.${event.currentTarget.dataset.field}`]: event.detail.value })
  },
  closeEditor() { this.setData({ editor: null }) },
  saveEditor() {
    const editor = this.data.editor
    if (!editor || !editor.name.trim()) {
      wx.showToast({ title: editor && editor.type === 'plot' ? '请填写地块名称' : '请填写农场名称', icon: 'none' })
      return
    }
    if (editor.type === 'farm') {
      if (this.data.farm) updateFarm({ name: editor.name.trim(), location: editor.location.trim() || '待补充地区' })
      else createFarm({ name: editor.name.trim(), location: editor.location.trim() || '待补充地区' })
      wx.showToast({ title: '农场信息已保存', icon: 'success' })
    } else {
      if (!editor.crop.trim()) {
        wx.showToast({ title: '请填写作物', icon: 'none' })
        return
      }
      createPlot({ name: editor.name.trim(), crop: editor.crop.trim(), growthStage: editor.growthStage, area: editor.area.trim() })
      wx.showToast({ title: '地块已添加', icon: 'success' })
    }
    this.setData({ editor: null })
    this.setData({ forceEmpty: false })
    this.loadFarm()
  },
  startDiagnosis() { wx.redirectTo({ url: '/pages/diagnosis/diagnosis' }) }
})
