import { useNarwhalStore } from '@/lib/store/narwhal-store.ts'
import { apiService } from '@/lib/api/api-service.ts'
import { Model } from '../types.ts'

export const storeService = {
  async populateStore() {
    const store = useNarwhalStore.getState()
    
    // Only load if store is empty and not already loading
    if (store.models.length === 0 && !store.isLoadingModels) {
      try {
        store.setIsLoadingModels(true)
        const models = await apiService.get<Model[]>('/api/models')
        store.setModels(models)
        store.setError(null)
      } catch (error) {
        store.setError(error instanceof Error ? error.message : 'Failed to load models')
        console.error('Failed to populate store:', error)
      } finally {
        store.setIsLoadingModels(false)
      }
    }
  },

  async refreshStore() {
    const store = useNarwhalStore.getState()
    
    try {
      store.setIsLoadingModels(true)
      const models = await apiService.get<Model[]>('/api/models')
      store.setModels(models)
      store.setError(null)
    } catch (error) {
      store.setError(error instanceof Error ? error.message : 'Failed to refresh models')
      console.error('Failed to refresh store:', error)
    } finally {
      store.setIsLoadingModels(false)
    }
  }
} 