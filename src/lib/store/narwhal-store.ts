import { create } from 'zustand'
import { devtools, StateCreator } from 'zustand/middleware'
import { Model } from '@/lib/types'

interface NarwhalState {
  error: string | null
  models: Model[]
  isLoadingModels: boolean
}

interface NarwhalActions {
  setError: (error: string | null) => void
  setModels: (models: Model[]) => void
  addModel: (model: Model) => void
  setIsLoadingModels: (isLoading: boolean) => void
}

type NarwhalStore = NarwhalState & NarwhalActions

export const useNarwhalStore = create<NarwhalStore>()(
  devtools(
    (set: StateCreator<NarwhalState>) => ({
      // Initial State
      models: [],
      isLoadingModels: false,
      error: null,

      // Actions
      setModels: (models: Model[]) => 
        set({ models }, false, 'setModels'),
      
      addModel: (model: Model) => 
        set(
          (state: NarwhalState) => ({ 
            models: [...state.models, model] 
          }), 
          false, 
          'addModel'
        ),

      setIsLoadingModels: (isLoading: boolean) => 
        set({ isLoadingModels: isLoading }, false, 'setIsLoadingModels'),
      
      setError: (error: string | null) => 
        set({ error }, false, 'setError'),
    }),
    {
      name: 'Narwhal-Store',
    }
  )
)