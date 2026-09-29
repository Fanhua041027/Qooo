import type { CommunityPost, CreateCommunityPostInput, CreateShopOrderInput, ExpertChatSession, ExpertProfile, PageResult, ShopOrder, ShopProduct, WeatherForecastResult, WeatherHistoryResult, WeatherOverview } from '@nongjianzhen/types'
import { apiClient } from './client'

export const extendedFeaturesApi = {
  getWeather: (input: { location?: string; latitude?: number; longitude?: number } = {}) => apiClient.getWeather(input.location, input.latitude, input.longitude),
  getWeatherForecast: (input?: Parameters<typeof apiClient.getWeatherForecast>[0]) => apiClient.getWeatherForecast(input),
  getWeatherHistory: (input?: Parameters<typeof apiClient.getWeatherHistory>[0]) => apiClient.getWeatherHistory(input),
  listProducts: (category?: string) => apiClient.listShopProducts(category),
  createOrder: (input: CreateShopOrderInput) => apiClient.createShopOrder(input),
  listPosts: (topic?: string) => apiClient.listCommunityPosts(topic),
  createPost: (input: CreateCommunityPostInput) => apiClient.createCommunityPost(input),
  likePost: (postId: string) => apiClient.likeCommunityPost(postId),
  listExperts: () => apiClient.listExperts(),
  getChat: (expertId: string) => apiClient.getExpertChat(expertId),
  sendMessage: (expertId: string, text: string) => apiClient.sendExpertMessage(expertId, text)
}

export type { CommunityPost, ExpertChatSession, ExpertProfile, PageResult, ShopOrder, ShopProduct, WeatherForecastResult, WeatherHistoryResult, WeatherOverview }
