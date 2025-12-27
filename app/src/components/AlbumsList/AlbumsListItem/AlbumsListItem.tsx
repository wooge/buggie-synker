import React from 'react'
import type { Album } from '@/models/Album'
import './AlbumsListItem.scss'

export const AlbumsListItem: React.FC<Album> = ({ url, executedAt }) => {
  const status = executedAt ? '✅' : '⏳'

  return (
    <div className="albums-list-item">
      <div className="albums-list-item__row">
        <a className="albums-list-item__link" href={url} target="blank_">
          {url}
        </a>
        <p className="albums-list-item__status">{status}</p>
      </div>
    </div>
  )
}
