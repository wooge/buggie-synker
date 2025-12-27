import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const getQueryContext = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 30,
        // Try 3 times in total.
        retry: 2,
      },
    },
  })
  return {
    queryClient,
  }
}

export const QueryContextProvider = ({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
