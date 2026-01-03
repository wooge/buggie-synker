import { useQuery } from '@tanstack/react-query'
import type { AlbumsResponse } from '@/models/api/album'
import { useApiContext } from '@/contexts/ApiContext'

export const useAlbums = () => {
  const { apiPath } = useApiContext()

  const path = `${apiPath}/album`

  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const response = await fetch(path)

      if (!response.ok) {
        throw new Error(`Failed to fetch albums (${response.status})`)
      }

      const result: AlbumsResponse = await response.json()

      return result
    },
  })
}
