import type { CreateFarmInput, CreatePlotInput, UpdateFarmInput, UpdatePlotInput } from '@nongjianzhen/types'
import { apiClient } from './client'

export const farmApi = {
  list: () => apiClient.listFarms(),
  create: (input: CreateFarmInput) => apiClient.createFarm(input),
  update: (farmId: string, input: UpdateFarmInput) => apiClient.updateFarm(farmId, input),
  listPlots: (farmId: string) => apiClient.listPlots(farmId),
  createPlot: (farmId: string, input: CreatePlotInput) => apiClient.createPlot(farmId, input),
  updatePlot: (plotId: string, input: UpdatePlotInput) => apiClient.updatePlot(plotId, input),
  deletePlot: (plotId: string) => apiClient.deletePlot(plotId)
}
