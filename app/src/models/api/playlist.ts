import type { JobStatus } from './jobs'

export type Playlist = {
  artist?: string
  created_at: Date
  executed_at?: Date
  id: number
  name: string
  status: JobStatus
  url: string
}

export type GetPlaylistResponse = Playlist

export type CreatePlaylistResponse = Playlist

export type GetPlaylistsResponse = Array<Playlist>
