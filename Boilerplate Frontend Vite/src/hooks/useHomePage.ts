import { useQuery } from "react-query"

// Api
import { api } from "../services/api"

// Types
import { IHomePage, IData } from "../models/home.model"

// Keys
import { queryKeys } from "../services/queryClient"

const getHome = async (): Promise<IData[]> => {
  const { data } = await api.get("/api/home")
  return data
}

export function useHome(): IHomePage {
  const { data, isLoading, refetch } = useQuery(queryKeys.home, getHome, {
    staleTime: 10000, // 10 seconds
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  return {
    data: data || [],
    isLoading,
    refetch
  }
}
