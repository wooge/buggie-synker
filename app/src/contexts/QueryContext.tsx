import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const getQueryContext = () => {
  const queryClient = new QueryClient()
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
