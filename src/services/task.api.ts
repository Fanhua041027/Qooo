import type { CreateTaskInput, UpdateTaskInput } from '@nongjianzhen/types'
import { apiClient } from './client'

export const taskApi = {
  list: () => apiClient.listTasks(),
  create: (input: CreateTaskInput) => apiClient.createTask(input),
  update: (taskId: string, input: UpdateTaskInput) => apiClient.updateTask(taskId, input),
  complete: (taskId: string, note?: string) => apiClient.completeTask(taskId, note)
}
