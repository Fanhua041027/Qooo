const test = require('node:test')
const assert = require('node:assert/strict')

const storage = new Map()
let redirectUrl = ''
global.wx = {
  getStorageSync(key) { return storage.get(key) },
  setStorageSync(key, value) { storage.set(key, value) },
  removeStorageSync(key) { storage.delete(key) },
  redirectTo({ url }) { redirectUrl = url }
}
global.getApp = () => ({ globalData: {} })

const authService = require('../services/auth-service')

test('模拟登录创建稳定测试身份并可退出', () => {
  storage.clear()
  const user = authService.mockLogin()
  assert.equal(user.id, 'user_p0_farmer_001')
  assert.equal(authService.getCurrentUser().role, '农户')
  authService.logout()
  assert.equal(authService.getCurrentUser(), null)
})

test('未登录访问受保护页面时跳转登录页', () => {
  storage.clear()
  redirectUrl = ''
  assert.equal(authService.requireAuth(), false)
  assert.equal(redirectUrl, '/pages/login/login')
})
