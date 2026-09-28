App({
  globalData: {
    user: null,
    currentFarm: null,
    isOnline: true
  },

  onLaunch() {
    this.globalData.user = wx.getStorageSync('qd_user') || null
    this.globalData.currentFarm = wx.getStorageSync('qd_current_farm') || null
    wx.getNetworkType({
      success: ({ networkType }) => {
        this.globalData.isOnline = networkType !== 'none'
      }
    })
    wx.onNetworkStatusChange(({ isConnected }) => {
      this.globalData.isOnline = isConnected
    })
  }
})
