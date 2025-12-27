import { useQuery } from "@tanstack/react-query"

export const useAlbums = () => {
    const path = "https://"

    return useQuery({
        queryKey: ['albums'],
        queryFn: () => {
            fetch
        }
    })

  return ['']
}
