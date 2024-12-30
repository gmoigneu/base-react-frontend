import { useCallback } from 'react'
import { useNarwhalStore } from '@/lib/store/narwhal-store'
import { apiService } from '@/lib/api/api-service'
import { Model } from '@/lib/types'

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

  const createModel = async (persona: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newModel = await apiService.post<Model>('/api/models', persona)
    if (newModel) {
      addModel(newModel)
    }
    return newModel
  }

  const updateModel = async (id: string, persona: Partial<Model>) => {
    const updatedModel = await apiService.put<Model>(`/api/models/${id}`, persona)
    if (updatedModel) {
      setModels(models.map((p: Model) => p.id === id ? updatedModel : p))
    }
    return updatedModel
  }

  const deleteModel = async (id: string) => {
    await apiService.delete(`/api/models/${id}`)
    setModels(models.filter((p: Model) => p.id !== id))
  }

  return {
    models,
    fetchModels,
    createModel,
    updateModel,
    deleteModel,
  }
} 