import { QueryClient } from "react-query"

const queryErrorHandler = (_error: unknown): void => {
  throw new Error("Method not implemented")
}

export const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
        cacheTime: 600000, // 10 minutes
        retry: 3,
        retryDelay: 500, // 1/2 second
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true
      },
      mutations: {
        onError: queryErrorHandler
      }
    }
  })
}

export const queryClient = generateQueryClient()
