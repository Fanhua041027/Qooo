const USER_KEY = 'qd_user'

function getCurrentUser() {
  return wx.getStorageSync(USER_KEY) || null
}

function mockLogin() {
  const user = {
    id: 'user_p0_farmer_001',
    name: '陈师傅',
    role: '农户',
    isMock: true,
    loginAt: new Date().toISOString()
  }
  wx.setStorageSync(USER_KEY, user)
  const app = typeof getApp === 'function' ? getApp() : null
  if (app && app.globalData) app.globalData.user = user
  return user
}

function logout() {
  wx.removeStorageSync(USER_KEY)
  const app = typeof getApp === 'function' ? getApp() : null
  if (app && app.globalData) app.globalData.user = null
}

function requireAuth() {
  if (getCurrentUser()) return true
  wx.redirectTo({ url: '/pages/login/login' })
  return false
}

module.exports = { getCurrentUser, mockLogin, logout, requireAuth }
