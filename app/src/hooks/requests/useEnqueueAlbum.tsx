import { useMutation } from '@tanstack/react-query'

export const useEnqueueAlbum = (albumId: number) => {
  const path = `${import.meta.env.VITE_API_PATH}/album/${albumId}/enqueue`

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
