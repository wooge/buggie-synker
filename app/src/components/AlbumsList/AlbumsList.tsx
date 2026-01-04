import React from 'react'
import { AlbumsListItem } from './AlbumsListItem'
import './AlbumsList.scss'
import type { Album } from '@/models/api/album'

interface AlbumsListProps {
  albums: Array<Album>
}

export const AlbumsList: React.FC<AlbumsListProps> = ({ albums }) => {
  return (
    <div className="albums-list">
      {albums.map((album) => (
        <AlbumsListItem key={album.id} initialData={album} />
      ))}
    </div>
  )
}
