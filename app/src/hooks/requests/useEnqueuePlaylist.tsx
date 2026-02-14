import { useMutation } from '@tanstack/react-query'
import { useApiContext } from '@/contexts/ApiContext'

export const useEnqueuePlaylist = (playlistId: number) => {
  const { apiPath } = useApiContext()

  const path = `${apiPath}/playlist/${playlistId}/enqueue`

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(path, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(
          `Failed to enqueue playlist #${playlistId} (${response.status})`,
        )
      }

      const scheduledJobId: string = await response.json()

      return scheduledJobId
    },
  })
}
