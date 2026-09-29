import { useCallback, useEffect, useRef, useState } from 'react'
import type { DiagnosisRecord } from '@nongjianzhen/types'
import { diagnosisApi } from '@/services/diagnosis.api'

const terminalStatuses = new Set<DiagnosisRecord['status']>([
  'COMPLETED',
  'NEED_MORE_IMAGES',
  'NEED_EXPERT_REVIEW',
  'FAILED'
])

export const DIAGNOSIS_POLL_INTERVAL_MS = 1200
export const DIAGNOSIS_POLL_MAX_ATTEMPTS = 25
export const DIAGNOSIS_POLL_TIMEOUT_MS = 45_000

export function useDiagnosisPolling(diagnosisId?: string) {
  const [diagnosis, setDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pollingTimedOut, setPollingTimedOut] = useState(false)
  const [pollingVersion, setPollingVersion] = useState(0)
  const pollingRunRef = useRef(0)

  const fetchDiagnosis = useCallback(async (runId: number) => {
    if (!diagnosisId) return null
    try {
      const response = await diagnosisApi.getResult(diagnosisId)
      if (pollingRunRef.current !== runId) return null
      setDiagnosis(response.data)
      setError('')
      return response.data
    } catch (reason) {
      if (pollingRunRef.current !== runId) return null
      setError(reason instanceof Error ? reason.message : '诊断结果加载失败')
      return null
    }
  }, [diagnosisId])

  const retryPolling = useCallback(() => {
    setPollingTimedOut(false)
    setError('')
    setPollingVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    setDiagnosis(null)
    setPollingTimedOut(false)

    if (!diagnosisId) {
      setError('缺少诊断编号')
      setLoading(false)
      return
    }

    let disposed = false
    let timer: ReturnType<typeof setTimeout> | undefined
    let attempts = 0
    const startedAt = Date.now()
    const runId = pollingRunRef.current + 1
    pollingRunRef.current = runId
    setLoading(true)

    const poll = async () => {
      attempts += 1
      const next = await fetchDiagnosis(runId)
      if (disposed) return

      const shouldContinue = !next || !terminalStatuses.has(next.status)
      const timedOut = attempts >= DIAGNOSIS_POLL_MAX_ATTEMPTS || Date.now() - startedAt >= DIAGNOSIS_POLL_TIMEOUT_MS
      if (shouldContinue && timedOut) {
        setLoading(false)
        setPollingTimedOut(true)
        setError('分析等待时间较长，诊断记录仍会保留。你可以稍后重试或从诊断历史查看。')
        return
      }
      if (shouldContinue) {
        // 弱网下保留处理中状态并继续轮询，避免首次请求失败就把用户送进死路。
        setLoading(true)
        setError('')
        timer = setTimeout(poll, DIAGNOSIS_POLL_INTERVAL_MS)
      } else {
        setLoading(false)
      }
    }

    void poll()
    return () => {
      disposed = true
      if (pollingRunRef.current === runId) pollingRunRef.current += 1
      if (timer) clearTimeout(timer)
    }
  }, [diagnosisId, fetchDiagnosis, pollingVersion])

  return { diagnosis, loading, error, pollingTimedOut, reload: retryPolling }
}
