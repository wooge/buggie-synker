import { useMutation } from '@tanstack/react-query'
import { useApiContext } from '@/contexts/ApiContext'

export const useDeleteAlbum = (albumId: number) => {
  const { apiPath } = useApiContext()

  const path = `${apiPath}/album/${albumId}`

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(path, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete album (${response.status})`)
      }
    },
  })
}
