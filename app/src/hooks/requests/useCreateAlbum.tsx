import { useMutation } from '@tanstack/react-query'
import type { CreateAlbumResponse } from '@/models/api/album'
import { useApiContext } from '@/contexts/ApiContext'

export const useCreateAlbum = () => {
  const { apiPath } = useApiContext()

  const path = `${apiPath}/album`

  return useMutation({
    mutationFn: async (input: { albumUrl: string }) => {
      const response = await fetch(path, {
        body: JSON.stringify({
          url: input.albumUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(
          `Failed to create album #${input.albumUrl} (${response.status})`,
        )
      }

      const album: CreateAlbumResponse = await response.json()

      return album
    },
  })
}
