import React from 'react'
import type { Album } from '@/models/Album'
import './AlbumsListItem.scss'

export const AlbumsListItem: React.FC<Album> = ({ url }) => {
  return (
    <div className="albums-list-item">
      <a href={url} target='blank_'>{url}</a>
    </div>
  )
}
