import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Preview } from '@storybook/react-vite'
import '../src/appStyles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    ((Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      });

      return <QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
    }),
  ],
}

export default preview
