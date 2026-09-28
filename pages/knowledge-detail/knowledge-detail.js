Page({
  data: { saved: false, fontLarge: false },
  onLoad(options) { this.setData({ fontLarge: options.large === '1' }) },
  toggleSave() { this.setData({ saved: !this.data.saved }); wx.showToast({ title: this.data.saved ? '已收藏' : '已取消收藏', icon: 'success' }) },
  toggleFont() { this.setData({ fontLarge: !this.data.fontLarge }) },
  startDiagnosis() { wx.redirectTo({ url: '/pages/diagnosis/diagnosis' }) }
})
