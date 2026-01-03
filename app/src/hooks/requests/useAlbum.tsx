import { useQuery } from '@tanstack/react-query'
import type { Album, AlbumResponse } from '@/models/api/album'

export const useAlbum = (autoRefresh: boolean, initialData: Album) => {
  const albumId = initialData.id

  const path = `${import.meta.env.VITE_API_PATH}/album/${albumId}`

  return useQuery({
    enabled: autoRefresh,
    initialData,
    queryKey: ['album', albumId],
    queryFn: async () => {
      const response = await fetch(path, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch album (${response.status})`)
      }

      const result: AlbumResponse = await response.json()

      return result
    },
    refetchInterval: 1000 * 10,
  })
}
