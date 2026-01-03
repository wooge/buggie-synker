import { Link, createFileRoute } from '@tanstack/react-router'
import './albums.scss'
import { PageLink } from '@/components/PageLink'
import { useAlbums } from '@/hooks/requests/useAlbums'
import { AlbumsListItem } from '@/components/AlbumsList'

export const Route = createFileRoute('/albums')({ component: AlbumsPage })

const backLinkParts = [
  {
    color: 'blue',
    text: '< A',
  },
  {
    color: 'purple',
    text: 'lb',
  },
  {
    color: 'orange',
    text: 'ums',
  },
]

function AlbumsPage() {
  const { data: albums, isFetching: albumsIsFetching } = useAlbums()

  return (
    <div className="albums-page">
      <Link to="/">
        <PageLink
          className="albums-page__back-link"
          parts={backLinkParts}
          size="small"
        />
      </Link>
      <div className="albums-page__list">
        {albumsIsFetching && <p>Loading albums...</p>}
        {albums &&
          albums.map((album) => (
            <AlbumsListItem initialData={album} key={album.id} />
          ))}
      </div>
    </div>
  )
}
