import { Link, createFileRoute } from '@tanstack/react-router'
import { PageLink } from '@/components/PageLink'
import './index.scss'

export const Route = createFileRoute('/')({ component: IndexPage })

const albumLinkParts = [
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
        <PageLink className="albums-link" parts={albumLinkParts} size="large" />
      </Link>

      <Link to="/">
        <PageLink
          className="browse-link"
          parts={browseLinkParts}
          size="small"
        />
      </Link>
    </div>
  )
}
