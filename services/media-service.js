function saveImageForHistory(tempFilePath) {
  if (!tempFilePath || tempFilePath === 'mock') return Promise.resolve(tempFilePath)

  return new Promise((resolve) => {
    wx.saveFile({
      tempFilePath,
      success: ({ savedFilePath }) => resolve(savedFilePath || tempFilePath),
      fail: () => resolve(tempFilePath)
    })
  })
}

function getImageInfo(src) {
  return new Promise((resolve) => {
    wx.getImageInfo({
      src,
      success: ({ width, height }) => resolve({ width, height }),
      fail: () => resolve({ width: 0, height: 0 })
    })
  })
}

module.exports = { saveImageForHistory, getImageInfo }
