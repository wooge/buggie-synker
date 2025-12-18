import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { QueryContextProvider, getQueryContext } from './contexts/QueryContext'

// Create a new router instance
export const getRouter = () => {
  const rqContext = getQueryContext()

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <QueryContextProvider {...rqContext}>
          {props.children}
        </QueryContextProvider>
      )
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}
