import Taro from '@tarojs/taro'
import type { DiagnosisImage, DiagnosisImageQuality } from '@nongjianzhen/types'
import { API_MODE } from '@/config/env'
import { apiClient } from './client'

export const MAX_DIAGNOSIS_IMAGE_BYTES = 10 * 1024 * 1024

export class MediaContractError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MediaContractError'
  }
}

export class MediaPermissionError extends MediaContractError {
  constructor() {
    super('没有照片权限，请在微信设置中允许访问相机或相册')
    this.name = 'MediaPermissionError'
  }
}

function getErrorMessage(reason: unknown) {
  if (reason instanceof Error) return reason.message
  if (typeof reason === 'object' && reason !== null && 'errMsg' in reason) return String((reason as { errMsg?: unknown }).errMsg || '')
  return String(reason || '')
}

export async function chooseDiagnosisImage(): Promise<DiagnosisImage> {
  let result: Awaited<ReturnType<typeof Taro.chooseMedia>>
  try {
    result = await Taro.chooseMedia({ count: 1, mediaType: ['image'], sourceType: ['camera', 'album'], sizeType: ['original', 'compressed'] })
  } catch (reason) {
    const message = getErrorMessage(reason)
    if (/auth deny|authorize|permission|camera|album|相机|相册|摄像头/i.test(message)) throw new MediaPermissionError()
    throw reason
  }
  const selected = result.tempFiles[0]
  if (!selected?.tempFilePath) throw new MediaContractError('没有选择图片')
  const selectedSize = 'size' in selected && typeof selected.size === 'number' ? selected.size : 0
  if (selectedSize > MAX_DIAGNOSIS_IMAGE_BYTES * 2) {
    throw new MediaContractError('图片文件过大，请选择 20 MB 以内的照片后重试')
  }

  let path = selected.tempFilePath
  if (selectedSize > 1024 * 1024) {
    const compressed = await Taro.compressImage({ src: path, quality: 78 })
    path = compressed.tempFilePath
  }
  const info = await Taro.getImageInfo({ src: path })
  // 低版本基础库可能无法读取临时文件大小，失败时沿用 chooseMedia 返回值。
  let fileSize = selectedSize
  try {
    const fileInfo = await Taro.getFileInfo({ filePath: path })
    if ('size' in fileInfo && fileInfo.size) fileSize = fileInfo.size
  } catch {
    // 尺寸信息不是诊断提交的硬依赖，继续使用已知大小做质量检查。
  }
  if (fileSize > MAX_DIAGNOSIS_IMAGE_BYTES) {
    throw new MediaContractError('图片压缩后仍超过 10 MB，请换一张照片重试')
  }
  const quality = inspectImageQuality(info.width, info.height, fileSize)
  return { url: path, width: info.width, height: info.height, fileSize, quality }
}

export function inspectImageQuality(width: number, height: number, fileSize: number): DiagnosisImageQuality {
  const issues: string[] = []
  const issueCodes: DiagnosisImageQuality['issueCodes'] = []
  if (fileSize > MAX_DIAGNOSIS_IMAGE_BYTES) {
    issues.push('图片文件过大，请压缩后重新选择')
    issueCodes.push('QUALITY_SIGNAL_INVALID')
  }
  if (Math.min(width, height) < 640) {
    issues.push('图片尺寸偏小，请靠近异常部位重新拍摄')
    issueCodes.push('IMAGE_TOO_SMALL')
  }
  if (fileSize > 0 && fileSize < 45 * 1024) {
    issues.push('图片信息较少，可能经过多次压缩')
    issueCodes.push('QUALITY_SIGNAL_INVALID')
  }
  if (issues.length > 0) return { status: fileSize > MAX_DIAGNOSIS_IMAGE_BYTES || Math.min(width, height) < 480 ? 'FAILED' : 'WARNING', issues, issueCodes, score: fileSize > MAX_DIAGNOSIS_IMAGE_BYTES || Math.min(width, height) < 480 ? 35 : 68 }
  return { status: 'PASS', issues: [], issueCodes: [], score: 92 }
}

function inferContentType(path: string, contentType?: DiagnosisImage['contentType']): NonNullable<DiagnosisImage['contentType']> {
  if (contentType) return contentType
  const extension = path.split('?')[0].split('.').pop()?.toLowerCase()
  if (extension === 'png') return 'image/png'
  if (extension === 'webp') return 'image/webp'
  return 'image/jpeg'
}

function readLocalFile(filePath: string): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    Taro.getFileSystemManager().readFile({
      filePath,
      success: (result) => {
        if (typeof result.data === 'string') {
          reject(new MediaContractError('图片读取结果不是二进制数据，请重新选择图片'))
          return
        }
        resolve(result.data)
      },
      fail: reject
    })
  })
}

async function uploadToObjectStorage(image: DiagnosisImage, onProgress?: (percent: number) => void): Promise<DiagnosisImage> {
  const contentType = inferContentType(image.url, image.contentType)
  const extension = contentType.split('/')[1] as 'jpeg' | 'png' | 'webp'
  const ticket = (await apiClient.createUpload({
    contentType,
    extension,
    size: image.fileSize,
    purpose: 'diagnoses'
  })).data

  onProgress?.(35)
  const data = await readLocalFile(image.url)
  onProgress?.(55)
  const response = await Taro.request({
    url: ticket.uploadUrl,
    method: 'PUT',
    data,
    timeout: 30_000,
    header: { 'content-type': ticket.contentType || contentType }
  })
  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new MediaContractError('图片上传失败，请检查网络后重试')
  }

  onProgress?.(88)
  await apiClient.completeUpload(ticket.fileId)
  onProgress?.(100)
  return { ...image, objectKey: ticket.objectKey, fileId: ticket.fileId, contentType }
}

export async function uploadDiagnosisImage(image: DiagnosisImage, onProgress?: (percent: number) => void): Promise<DiagnosisImage> {
  onProgress?.(25)
  if (API_MODE === 'mock') {
    await new Promise((resolve) => setTimeout(resolve, 420))
    onProgress?.(100)
    return image
  }
  try {
    return await uploadToObjectStorage(image, onProgress)
  } catch (reason) {
    if (reason instanceof MediaContractError) throw reason
    throw new MediaContractError('图片上传失败，请检查网络后重试')
  }
}
