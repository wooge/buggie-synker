import React, { useEffect, useMemo, useState } from 'react'
import './AlbumsListItem.scss'
import type { Album } from '@/models/api/album'
import type { JobStatus } from '@/models/api/jobs'
import { RandomlyColoredWord } from '@/components/RandomlyColoredWord'
import { useEnqueueAlbum } from '@/hooks/requests/useEnqueueAlbum'
import { useAlbum } from '@/hooks/requests/useAlbum'
import { ColoredWord } from '@/components/ColoredWord'
import { useDeleteAlbum } from '@/hooks/requests/useDeleteAlbum'
import { useAlbums } from '@/hooks/requests/useAlbums'

interface AlbumsListItemProps {
  initialData: Album
}

const isRunning = (jobStatus: JobStatus) =>
  jobStatus !== 'ready' && jobStatus !== 'failed'

export const AlbumsListItem: React.FC<AlbumsListItemProps> = ({
  initialData,
}) => {
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

  const ready = useMemo(
    () =>
      !autoRefresh && !isRunning(album.status) && !isFetching && !isEnqueuing,
    [autoRefresh, album.status, isFetching, isEnqueuing],
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
          <span className="albums-list-item__subtitle">
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
            className="albums-list-item__button albums-list-item__button--delete"
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
        <span className="albums-list-item__title">
          <RandomlyColoredWord text={displayedArtist} />
        </span>
        <span className="albums-list-item__subtitle">
          <RandomlyColoredWord text={displayedName} />
        </span>
      </>
    ) : (
      <span className="albums-list-item__title">
        <RandomlyColoredWord text={displayedName} />
      </span>
    )
  }, [album])

  return (
    <div className="albums-list-item">
      {albumIdentityElements}
      <a className="albums-list-item__link" href={album.url} target="blank_">
        Link
      </a>
      <button
        className="albums-list-item__button"
        disabled={!ready}
        onClick={handleButtonClick}
      >
        {ready ? 'Hent igen' : 'Henter...'}
      </button>
    </div>
  )
}
