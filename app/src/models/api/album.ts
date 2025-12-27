export type Album = {
  url: string
  artist?: string
  name?: string
  created_at: Date
  executed_at?: Date
}

export type AlbumsResponse = Array<Album>
