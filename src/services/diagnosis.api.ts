import type { CreateDiagnosisInput, DiagnosisVerificationOutcome } from '@nongjianzhen/types'
import { apiClient } from './client'

export const diagnosisApi = {
  create: (input: CreateDiagnosisInput) => apiClient.createDiagnosis(input),
  get: (diagnosisId: string) => apiClient.getDiagnosis(diagnosisId),
  getResult: (diagnosisId: string) => apiClient.getDiagnosisResult(diagnosisId),
  list: async () => {
    const response = await apiClient.listDiagnoses()
    return {
      ...response,
      data: {
        ...response.data,
        // 服务端负责分页，客户端保证当前页仍按最新创建时间展示，兼容 Mock 和旧接口。
        items: [...response.data.items].sort((left, right) => {
          const rightTime = Date.parse(right.createdAt)
          const leftTime = Date.parse(left.createdAt)
          return (Number.isFinite(rightTime) ? rightTime : 0) - (Number.isFinite(leftTime) ? leftTime : 0)
        })
      }
    }
  },
  retry: (diagnosisId: string) => apiClient.retryDiagnosis(diagnosisId),
  verify: (diagnosisId: string, outcome: DiagnosisVerificationOutcome, note?: string) => apiClient.verifyDiagnosis(diagnosisId, outcome, note)
}
