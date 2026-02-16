import React, { useEffect, useMemo, useState } from 'react'
import './AlbumItem.scss'
import type { Album } from '@/models/api/album'
import type { JobStatus } from '@/models/api/jobs'
import { RandomlyColoredWord } from '@/components/RandomlyColoredWord'
import { useEnqueueAlbum } from '@/hooks/requests/useEnqueueAlbum'
import { useAlbum } from '@/hooks/requests/useAlbum'
import { ColoredWord } from '@/components/ColoredWord'
import { useDeleteAlbum } from '@/hooks/requests/useDeleteAlbum'
import { useAlbums } from '@/hooks/requests/useAlbums'

interface AlbumItemProps {
  initialData: Album
}

const isRunning = (jobStatus: JobStatus) =>
  jobStatus !== 'ready' && jobStatus !== 'failed'

export const AlbumItem: React.FC<AlbumItemProps> = ({ initialData }) => {
  // Status determining whether to refetch album until its status is 'ready' or 'failed'.
  // Also set to true after the refetch button is clicked.
  const [autoRefresh, setAutoRefresh] = useState(isRunning(initialData.status))

  const {
    data: album,
    dataUpdatedAt: albumUpdatedAt,
    isFetching,
  } = useAlbum(autoRefresh, initialData)

  const { refetch: refetchAlbums } = useAlbums()

  const { mutateAsync: deleteAlbumAsync, isPending: isDeletingAlbum } =
    useDeleteAlbum(initialData.id)

  // After status has changed to 'ready' or 'failed', no longer auto-refetching
  useEffect(
    () => setAutoRefresh(isRunning(album.status)),
    [album, albumUpdatedAt],
  )

  // Hook for refetching the album
  const { isPending: isEnqueuing, mutate: enqueueAlbum } = useEnqueueAlbum(
    album.id,
  )

  const readyForDownload = useMemo(
    () =>
      !autoRefresh &&
      !isRunning(album.status) &&
      !isFetching &&
      !isEnqueuing &&
      !isDeletingAlbum,
    [autoRefresh, album.status, isFetching, isEnqueuing, isDeletingAlbum],
  )

  const handleButtonClick = () => {
    enqueueAlbum()
    setAutoRefresh(true)
  }

  const handleOnDeleteClick = () => {
    deleteAlbumAsync().then(() => refetchAlbums())
  }

  const albumIdentityElements = useMemo(() => {
    if (album.status === 'failed') {
      return (
        <>
          <span className="album-item__subtitle">
            <ColoredWord
              parts={[
                {
                  color: 'red',
                  text: `(id ${album.id})`,
                },
              ]}
            />
          </span>
          <button
            className="album-item__button album-item__button--delete"
            disabled={isDeletingAlbum}
            onClick={handleOnDeleteClick}
          >
            {isDeletingAlbum ? 'Sletter' : 'Slet?'}
          </button>
        </>
      )
    }

    const displayedArtist = album.artist
    const displayedName = album.name ?? '...'

    return displayedArtist ? (
      <>
        <span className="album-item__title">
          <RandomlyColoredWord text={displayedArtist} />
        </span>
        <span className="album-item__subtitle">
          <RandomlyColoredWord text={displayedName} />
        </span>
      </>
    ) : (
      <span className="album-item__title">
        <RandomlyColoredWord text={displayedName} />
      </span>
    )
  }, [album])

  return (
    <div className="album-item">
      {albumIdentityElements}
      <a className="album-item__link" href={album.url} target="blank_">
        Link
      </a>
      <button
        className="album-item__button"
        disabled={!readyForDownload}
        onClick={handleButtonClick}
      >
        {readyForDownload ? 'Hent igen' : 'Henter...'}
      </button>
    </div>
  )
}
