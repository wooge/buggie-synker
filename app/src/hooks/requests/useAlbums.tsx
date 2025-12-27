import { useQuery } from '@tanstack/react-query'
import type { AlbumsResponse } from '@/models/api/album'

export const useAlbums = () => {
  const path = `${import.meta.env.VITE_API_PATH}/album`

  console.log("path", import.meta.env.VITE_API_PATH);

  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const response = await fetch(path)

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`)
      }

      const result: AlbumsResponse = await response.json()

      return result
    },
  })
}
