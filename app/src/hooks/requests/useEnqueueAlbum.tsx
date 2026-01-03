import { useMutation } from '@tanstack/react-query'
import { useApiContext } from '@/contexts/ApiContext'

export const useEnqueueAlbum = (albumId: number) => {
  const { apiPath } = useApiContext()

  const path = `${apiPath}/album/${albumId}/enqueue`

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(path, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(
          `Failed to enqueue album #${albumId} (${response.status})`,
        )
      }

      const scheduledJobId: string = await response.json()

      return scheduledJobId
    },
  })
}
