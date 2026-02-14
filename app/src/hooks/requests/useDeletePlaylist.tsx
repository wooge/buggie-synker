import { useMutation } from '@tanstack/react-query'
import { useApiContext } from '@/contexts/ApiContext'

export const useDeletePlaylist = (playlistId: number) => {
  const { apiPath } = useApiContext()

  const path = `${apiPath}/playlist/${playlistId}`

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(path, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete playlist (${response.status})`)
      }
    },
  })
}
