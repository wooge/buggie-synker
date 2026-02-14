import React, { useEffect, useMemo, useState } from 'react'
import './PlaylistItem.scss'
import type { JobStatus } from '@/models/api/jobs'
import type { Playlist } from '@/models/api/playlist'
import { RandomlyColoredWord } from '@/components/RandomlyColoredWord'
import { ColoredWord } from '@/components/ColoredWord'
import { usePlaylist } from '@/hooks/requests/usePlaylist'
import { usePlaylists } from '@/hooks/requests/usePlaylists'
import { useDeletePlaylist } from '@/hooks/requests/useDeletePlaylist'
import { useEnqueuePlaylist } from '@/hooks/requests/useEnqueuePlaylist'

interface PlaylistItemProps {
  initialData: Playlist
}

const isRunning = (jobStatus: JobStatus) =>
  jobStatus !== 'ready' && jobStatus !== 'failed'

export const PlaylistItem: React.FC<PlaylistItemProps> = ({ initialData }) => {
  // Status determining whether to refetch playlist until its status is 'ready' or 'failed'.
  // Also set to true after the refetch button is clicked.
  const [autoRefresh, setAutoRefresh] = useState(isRunning(initialData.status))

  const {
    data: playlist,
    dataUpdatedAt: playlistUpdatedAt,
    isFetching,
  } = usePlaylist(autoRefresh, initialData)

  const { refetch: refetchPlaylists } = usePlaylists()

  const { mutateAsync: deletePlaylistAsync, isPending: isDeletingPlaylist } =
    useDeletePlaylist(initialData.id)

  // After status has changed to 'ready' or 'failed', no longer auto-refetching
  useEffect(
    () => setAutoRefresh(isRunning(playlist.status)),
    [playlist, playlistUpdatedAt],
  )

  // Hook for refetching the playlist
  const { isPending: isEnqueuing, mutate: enqueuePlaylist } =
    useEnqueuePlaylist(playlist.id)

  const readyForDownload = useMemo(
    () =>
      !autoRefresh &&
      !isRunning(playlist.status) &&
      !isFetching &&
      !isEnqueuing &&
      !isDeletingPlaylist,
    [autoRefresh, playlist.status, isFetching, isEnqueuing, isDeletingPlaylist],
  )

  const handleButtonClick = () => {
    enqueuePlaylist()
    setAutoRefresh(true)
  }

  const handleOnDeleteClick = () => {
    deletePlaylistAsync().then(() => refetchPlaylists())
  }

  const albumIdentityElements = useMemo(() => {
    if (playlist.status === 'failed') {
      return (
        <>
          <span className="playlist-item__subtitle">
            <ColoredWord
              parts={[
                {
                  color: 'red',
                  text: `(id ${playlist.id})`,
                },
              ]}
            />
          </span>
          <button
            className="playlist-item__button playlist-item__button--delete"
            disabled={isDeletingPlaylist}
            onClick={handleOnDeleteClick}
          >
            {isDeletingPlaylist ? 'Sletter' : 'Slet?'}
          </button>
        </>
      )
    }

    const displayedArtist = playlist.artist

    return displayedArtist ? (
      <>
        <span className="playlist-item__title">
          <RandomlyColoredWord text={displayedArtist} />
        </span>
        <span className="playlist-item__subtitle">
          <RandomlyColoredWord text={playlist.name} />
        </span>
      </>
    ) : (
      <span className="playlist-item__title">
        <RandomlyColoredWord text={playlist.name} />
      </span>
    )
  }, [playlist])

  return (
    <div className="playlist-item">
      {albumIdentityElements}
      <a className="playlist-item__link" href={playlist.url} target="blank_">
        Link
      </a>
      <button
        className="playlist-item__button"
        disabled={!readyForDownload}
        onClick={handleButtonClick}
      >
        {readyForDownload ? 'Hent igen' : 'Henter...'}
      </button>
    </div>
  )
}
