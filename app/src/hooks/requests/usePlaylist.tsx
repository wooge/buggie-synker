import { useQuery } from '@tanstack/react-query'
import type { GetPlaylistResponse, Playlist } from '@/models/api/playlist'
import { useApiContext } from '@/contexts/ApiContext'

export const usePlaylist = (enabled: boolean = true, initialData: Playlist) => {
  const { apiPath } = useApiContext()
  const albumId = initialData.id
  const path = `${apiPath}/playlist/${albumId}`

  return useQuery({
    enabled,
    initialData,
    queryKey: ['playlist', albumId],
    queryFn: async () => {
      const response = await fetch(path, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch playlist (${response.status})`)
      }

      const result: GetPlaylistResponse = await response.json()

      return result
    },
    refetchInterval: 1000 * 10,
  })
}
