import { ApiClient } from '@nongjianzhen/api-client'
import { API_MODE } from '@/config/env'
import { mockTransport } from '@/mocks/transport'
import { taroTransport } from './http'

export const apiClient = new ApiClient(API_MODE === 'mock' ? mockTransport : taroTransport)
