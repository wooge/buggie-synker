import { Link, createFileRoute } from '@tanstack/react-router'
import './playlists.scss'
import { PageLink } from '@/components/PageLink'
import { usePlaylists } from '@/hooks/requests/usePlaylists'
import { JobList } from '@/components/JobList/JobList'
import { PlaylistItem } from '@/components/PlaylistItem/PlaylistItem'

export const Route = createFileRoute('/playlists')({ component: PlaylistsPage })

const backLinkParts = [
  {
    color: 'teal',
    text: '< Pl',
  },
  {
    color: 'magenta',
    text: 'ay',
  },
  {
    color: 'purple',
    text: 'lis',
  },
  {
    color: 'gray',
    text: 'ts',
  },
]

function PlaylistsPage() {
  const { data: playlists, isFetching: playlistsAreFetching } = usePlaylists()

  return (
    <div className="playlists-page">
      <Link to="/">
        <PageLink
          className="playlists-page__back-link"
          parts={backLinkParts}
          size="small"
        />
      </Link>
      <div className="playlists-page__contents">
        {/* <AlbumAdder /> */}
        {playlistsAreFetching && <p>Loading playlists...</p>}
        {playlists && (
          <JobList>
            {playlists.map((playlist) => (
              <PlaylistItem initialData={playlist} key={playlist.id} />
            ))}
          </JobList>
        )}
      </div>
    </div>
  )
}
