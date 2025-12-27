import React from 'react'
import './AlbumsListItem.scss'
import type { Album } from '@/models/api/album'
import { RandomlyColoredWord } from '@/components/RandomlyColoredWord'

export const AlbumsListItem: React.FC<Album> = ({
  artist = '...',
  name = '...',
  executed_at,
  url,
}) => {
  const ready = !!executed_at

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
      <button className="albums-list-item__trigger" disabled={!ready}>
        {ready ? 'Hent igen' : 'Henter...'}
      </button>
    </div>
  )
}
