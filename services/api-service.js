const DEFAULT_API_BASE_URL = 'http://127.0.0.1:3000/api'
const TOKEN_KEY = 'qd_api_token'

function getApiBaseUrl() {
  return (wx.getStorageSync('qd_api_base_url') || DEFAULT_API_BASE_URL).replace(/\/$/, '')
}

function request({ path, method = 'GET', data, header = {}, skipAuth = false, timeout = 20000, retried = false }) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = skipAuth ? '' : await ensureAccessToken()
      wx.request({
        url: `${getApiBaseUrl()}${path}`,
        method,
        data,
        timeout,
        header: {
          'content-type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...header
        },
        success: ({ statusCode, data: envelope }) => {
          if (statusCode >= 200 && statusCode < 300 && (!envelope || envelope.code === 'OK')) {
            resolve(envelope && Object.prototype.hasOwnProperty.call(envelope, 'data') ? envelope.data : envelope)
            return
          }
          if (statusCode === 401 && !skipAuth && !retried) {
            wx.removeStorageSync(TOKEN_KEY)
            request({ path, method, data, header, skipAuth, timeout, retried: true }).then(resolve).catch(reject)
            return
          }
          const error = new Error((envelope && envelope.message) || `请求失败（${statusCode}）`)
          error.code = (envelope && envelope.code) || 'HTTP_ERROR'
          error.statusCode = statusCode
          reject(error)
        },
        fail: (cause) => {
          const error = new Error(cause.errMsg || '无法连接诊断服务')
          error.code = cause.errMsg && cause.errMsg.includes('timeout') ? 'TIMEOUT' : 'NETWORK_ERROR'
          reject(error)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

async function ensureAccessToken() {
  const existing = wx.getStorageSync(TOKEN_KEY)
  if (existing) return existing
  const auth = await request({
    path: '/v1/auth/mock-login',
    method: 'POST',
    data: { accountId: 'user_p0_farmer_001' },
    skipAuth: true
  })
  wx.setStorageSync(TOKEN_KEY, auth.accessToken)
  return auth.accessToken
}

function getFileInfo(filePath) {
  return new Promise((resolve, reject) => {
    wx.getFileInfo({ filePath, success: resolve, fail: reject })
  })
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({ filePath, success: ({ data }) => resolve(data), fail: reject })
  })
}

function uploadBinary(url, data, contentType) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'PUT',
      data,
      timeout: 60000,
      header: { 'content-type': contentType },
      success: ({ statusCode }) => statusCode >= 200 && statusCode < 300
        ? resolve()
        : reject(new Error(`图片上传失败（${statusCode}）`)),
      fail: (cause) => reject(new Error(cause.errMsg || '图片上传失败'))
    })
  })
}

async function uploadDiagnosisImage(filePath) {
  const info = await getFileInfo(filePath)
  const extension = ((filePath.match(/\.([a-zA-Z0-9]+)(?:\?|$)/) || [])[1] || 'jpg').toLowerCase()
  const safeExtension = ['jpg', 'jpeg', 'png', 'webp'].includes(extension) ? extension : 'jpg'
  const contentType = safeExtension === 'png'
    ? 'image/png'
    : safeExtension === 'webp'
      ? 'image/webp'
      : 'image/jpeg'
  const upload = await request({
    path: '/v1/files/upload-url',
    method: 'POST',
    data: { contentType, extension: safeExtension, size: info.size, purpose: 'diagnoses' }
  })
  const binary = await readFile(filePath)
  await uploadBinary(upload.uploadUrl, binary, contentType)
  await request({ path: `/v1/files/${upload.fileId}/complete`, method: 'POST' })
  return { objectKey: upload.objectKey, size: info.size }
}

module.exports = { request, uploadDiagnosisImage }
