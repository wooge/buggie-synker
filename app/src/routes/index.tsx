import { Link, createFileRoute } from '@tanstack/react-router'
import { PageLink } from '@/components/PageLink'
import './index.scss'

export const Route = createFileRoute('/')({ component: IndexPage })

const albumsLinkParts = [
  {
    color: 'green',
    text: 'A',
  },
  {
    color: 'purple',
    text: 'l',
  },
  {
    color: 'blue',
    text: 'bums',
  },
]

const playlistsLinkParts = [
  {
    color: 'orange',
    text: 'Play',
  },
  {
    color: 'magenta',
    text: 'li',
  },
  {
    color: 'pink',
    text: 'sts',
  },
]

const browseLinkParts = [
  {
    color: 'blue',
    text: 'B',
  },
  {
    color: 'purple',
    text: 'row',
  },
  {
    color: 'orange',
    text: 'se',
  },
]

function IndexPage() {
  return (
    <div className="index-page">
      <Link to="/albums">
        <PageLink
          className="albums-link"
          parts={albumsLinkParts}
          size="large"
        />
      </Link>

      <Link to="/playlists">
        <PageLink
          className="playlists-link"
          parts={playlistsLinkParts}
          size="large"
        />
      </Link>

      <a href="/lms/releases">
        <PageLink
          className="browse-link"
          parts={browseLinkParts}
          size="small"
        />
      </a>
    </div>
  )
}
