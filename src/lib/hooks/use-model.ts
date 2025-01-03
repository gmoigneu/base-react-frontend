import { useCallback } from 'react'
import { useNarwhalStore } from '@/lib/store/narwhal-store.ts'
import { apiService } from '@/lib/api/api-service.ts'
import { Model } from '@/lib/types.ts'

export function useModels() {
  const { models, setModels, addModel, setIsLoadingModels, setError } = useNarwhalStore()

  const fetchModels = useCallback(async () => {
    setIsLoadingModels(true)
    try {
      const data = await apiService.get<Model[]>('/api/models')
      if (data) setModels(data)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoadingModels(false)
    }
  }, [setModels, setIsLoadingModels, setError])

  const createModel = async (model: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newModel = await apiService.post<Model>('/api/models', model)
    if (newModel) {
      addModel(newModel)
    }
    return newModel
  }

  const updateModel = async (id: string, model: Partial<Model>) => {
    const updatedModel = await apiService.put<Model>(`/api/models/${id}`, model)
    if (updatedModel) {
      setModels(models.map((m: Model) => m.id === id ? updatedModel : m))
    }
    return updatedModel
  }

  const deleteModel = async (id: string) => {
    await apiService.delete(`/api/models/${id}`)
    setModels(models.filter((m: Model) => m.id !== id))
  }

  return {
    models,
    fetchModels,
    createModel,
    updateModel,
    deleteModel,
  }
} 