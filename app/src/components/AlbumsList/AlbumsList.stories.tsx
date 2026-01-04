import { AlbumsList } from './AlbumsList'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { JobStatus } from '@/models/api/jobs'

const mockAlbums = [
  {
    artist: "Artist Name",
    created_at: new Date(),
    id: 1,
    name: 'Alboom',
    status: 'ready' as JobStatus,
    url: 'https://music.youtube.com/album/abcdefgh',
  },
  {
    artist: "I am Artist",
    created_at: new Date(),
    executed_at: new Date(),
    id: 2,
    name: 'Big Album',
    status: 'active' as JobStatus,
    url: 'https://music.youtube.com/album/bcdefghi',
  },
  {
    artist: "Baptist",
    created_at: new Date(),
    id: 3,
    name: 'The Album',
    status: 'ready' as JobStatus,
    url: 'https://music.youtube.com/album/cdefghij',
  },
]

const meta = {
  args: {
    albums: mockAlbums,
  },
  component: AlbumsList,
  tags: ['autodocs'],
  title: 'Components/AlbumsList',
} satisfies Meta<typeof AlbumsList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
