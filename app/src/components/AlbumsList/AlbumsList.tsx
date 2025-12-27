import React from 'react'
import { AlbumsListItem } from './AlbumsListItem'
import type { Album } from '@/models/Album'
import './AlbumsList.scss'

interface AlbumsListProps {
  albums: Array<Album>
}

export const AlbumsList: React.FC<AlbumsListProps> = ({ albums }) => {
  return (
    <div className="albums-list">
      {albums.map((album) => (
        <AlbumsListItem key={album.url} {...album} />
      ))}
    </div>
  )
}
