import { useQuery } from '@tanstack/react-query'
import type { Album, GetAlbumResponse } from '@/models/api/album'
import { useApiContext } from '@/contexts/ApiContext'

export const useAlbum = (enabled: boolean = true, initialData: Album) => {
  const { apiPath } = useApiContext()
  const albumId = initialData.id
  const path = `${apiPath}/album/${albumId}`

  return useQuery({
    enabled,
    initialData,
    queryKey: ['album', albumId],
    queryFn: async () => {
      const response = await fetch(path, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch album (${response.status})`)
      }

      const result: GetAlbumResponse = await response.json()

      return result
    },
    refetchInterval: 1000 * 10,
  })
}
