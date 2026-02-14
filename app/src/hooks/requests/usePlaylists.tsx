import { useQuery } from '@tanstack/react-query'
import type { GetPlaylistsResponse } from '@/models/api/playlist'
import { useApiContext } from '@/contexts/ApiContext'

export const usePlaylists = () => {
  const { apiPath } = useApiContext()

  const path = `${apiPath}/playlist`

  return useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await fetch(path)

      if (!response.ok) {
        throw new Error(`Failed to fetch playlists (${response.status})`)
      }

      const result: GetPlaylistsResponse = await response.json()

      return result
    },
  })
}
