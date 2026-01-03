import type { JobStatus } from './jobs'

export type Album = {
  artist?: string
  id: number
  name?: string
  status: JobStatus
  url: string
}

export type AlbumResponse = Album

export type AlbumsResponse = Array<Album>
