import { createContext, useContext } from 'react'

interface ApiContextValue {
  apiPath: string
}

const ApiContext = createContext<ApiContextValue | undefined>({
  apiPath: 'placeholder-path',
})

export const ApiContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const devPath = import.meta.env.VITE_API_PATH
  const prodPath = import.meta.env.INTRO_API_PATH

  const apiPath = prodPath ?? devPath

  const contextValue = {
    apiPath,
  }

  return <ApiContext value={contextValue}>{children}</ApiContext>
}

export const useApiContext = () => {
  const context = useContext(ApiContext)

  if (!context) {
    throw new Error('useApiContext must be used within an ApiContextProvider')
  }

  return context
}
