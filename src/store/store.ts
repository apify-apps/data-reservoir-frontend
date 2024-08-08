import { QueryClient } from "@tanstack/react-query";
import { create } from 'zustand'
import { produce } from 'immer'

export interface QueryClientStore {
  queryClient: QueryClient,
  setQueryClient: (s : QueryClient) => void
}

export interface AppStore {
  query: QueryClientStore
}

export const useAppStore = create<AppStore>(set => ({
  query: {
    queryClient: new QueryClient(),
    setQueryClient: (s) => set(produce((state) => {
      state.query.queryClient = s;
    }))
  }
}));