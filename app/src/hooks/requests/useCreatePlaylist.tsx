import { useMutation } from '@tanstack/react-query'
import type { CreatePlaylistResponse } from '@/models/api/playlist'
import { useApiContext } from '@/contexts/ApiContext'

export const useCreatePlaylist = () => {
  const { apiPath } = useApiContext()

  const path = `${apiPath}/playlist`

  return useMutation({
    mutationFn: async (input: {
      playlistName: string
      playlistUrl: string
    }) => {
      const response = await fetch(path, {
        body: JSON.stringify({
          name: input.playlistName,
          url: input.playlistUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(
          `Failed to create playlist ${input.playlistName} (${response.status})`,
        )
      }

      const playlist: CreatePlaylistResponse = await response.json()

      return playlist
    },
  })
}
