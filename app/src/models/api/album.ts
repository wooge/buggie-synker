import type { JobStatus } from './jobs'

export type Album = {
  artist?: string
  executed_at?: Date
  id: number
  name?: string
  status: JobStatus
  url: string
}

export type GetAlbumResponse = Album

export type CreateAlbumResponse = Album

export type GetAlbumsResponse = Array<Album>
