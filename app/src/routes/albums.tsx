import { Link, createFileRoute } from '@tanstack/react-router'
import './albums.scss'
import { PageLink } from '@/components/PageLink'
import { useAlbums } from '@/hooks/requests/useAlbums'
import { AlbumAdder } from '@/components/AlbumAdder/AlbumAdder'
import { AlbumItem } from '@/components/AlbumItem/AlbumItem'
import { JobList } from '@/components/JobList/JobList'

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
      <div className="albums-page__contents">
        <AlbumAdder />
        {albumsIsFetching && <p>Loading albums...</p>}
        {albums && (
          <JobList>
            {albums.map((album) => (
              <AlbumItem initialData={album} key={album.id} />
            ))}
          </JobList>
        )}
      </div>
    </div>
  )
}
