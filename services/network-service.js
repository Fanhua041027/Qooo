function getNetworkState() {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success: ({ networkType }) => resolve({ isOnline: networkType !== 'none', networkType }),
      fail: () => resolve({ isOnline: false, networkType: 'unknown' })
    })
  })
}

function subscribeNetwork(listener) {
  const handler = ({ isConnected, networkType }) => listener({ isOnline: isConnected, networkType })
  wx.onNetworkStatusChange(handler)
  return () => {
    if (typeof wx.offNetworkStatusChange === 'function') wx.offNetworkStatusChange(handler)
  }
}

module.exports = { getNetworkState, subscribeNetwork }
