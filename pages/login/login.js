const { getCurrentUser, mockLogin } = require('../../services/auth-service')

Page({
  data: { loading: false, privacyDenied: false },
  onLoad(options) {
    if (options.preview !== '1' && getCurrentUser()) wx.redirectTo({ url: '/pages/index/index' })
  },
  mockLogin() {
    this.setData({ loading: true })
    setTimeout(() => {
      mockLogin()
      wx.redirectTo({ url: '/pages/index/index?first=1' })
    }, 650)
  },
  showPrivacy() {
    wx.showModal({ title: '隐私说明', content: '仅在你主动使用诊断时读取所选照片；位置与通知权限均可稍后单独开启。', showCancel: false, confirmText: '我知道了' })
  },
  showDenied() { this.setData({ privacyDenied: true }) },
  dismissDenied() { this.setData({ privacyDenied: false }) }
})
