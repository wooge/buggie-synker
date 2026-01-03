import React, { useEffect, useMemo, useState } from 'react'
import './AlbumsListItem.scss'
import type { Album } from '@/models/api/album'
import { RandomlyColoredWord } from '@/components/RandomlyColoredWord'
import { useEnqueueAlbum } from '@/hooks/requests/useEnqueueAlbum'
import { useAlbum } from '@/hooks/requests/useAlbum'

interface AlbumsListItemProps {
  initialData: Album
}

export const AlbumsListItem: React.FC<AlbumsListItemProps> = ({
  initialData,
}) => {
  // Whether the fetch button has been clicked for this item
  const [triggered, setTriggered] = useState(false)

  // Hook storing periodically refetching album but only if fetch button has been clicked
  const { data: album, isFetching } = useAlbum(triggered, initialData)

  // Resetting triggered to prevent unnecessary refetches after trigger has completed
  useEffect(() => {
    if (album.status === 'ready') setTriggered(false)
  }, [album])

  // Unpacking album information
  const { id: albumId, artist = '...', name = '...', status, url } = album

  // Hook for refetching the album
  const { isPending: isEnqueuing, mutate: enqueueAlbum } =
    useEnqueueAlbum(albumId)

  const ready = useMemo(
    () => !triggered && status === 'ready' && !isFetching && !isEnqueuing,
    [triggered, status, isFetching, isEnqueuing],
  )

  const handleButtonClick = () => {
    enqueueAlbum()
    setTriggered(true)
  }

  return (
    <div className="albums-list-item">
      <span className="albums-list-item__artist">
        <RandomlyColoredWord text={artist} />
      </span>
      <span className="albums-list-item__album">
        <RandomlyColoredWord text={name} />
      </span>
      <a className="albums-list-item__link" href={url} target="blank_">
        Link
      </a>
      <button
        className="albums-list-item__trigger"
        disabled={!ready}
        onClick={handleButtonClick}
      >
        {ready ? 'Hent igen' : 'Henter...'}
      </button>
    </div>
  )
}
