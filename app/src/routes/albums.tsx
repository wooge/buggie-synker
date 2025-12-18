import { Link, createFileRoute } from '@tanstack/react-router'
import './albums.scss'
import { PageLink } from '@/components/PageLink'

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
  return (
    <div className="albums-page">
      <Link to="/">
        <PageLink className="back-link" parts={backLinkParts} size="small" />
      </Link>
    </div>
  )
}
