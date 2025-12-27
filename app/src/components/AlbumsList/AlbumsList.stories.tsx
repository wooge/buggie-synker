import { AlbumsList } from './AlbumsList'
import type { Meta, StoryObj } from '@storybook/react-vite'

const mockAlbums = [
  {
    artist: "Artist Name",
    created_at: new Date(),
    name: 'Alboom',
    url: 'https://music.youtube.com/album/abcdefgh',
  },
  {
    artist: "I am Artist",
    created_at: new Date(),
    executed_at: new Date(),
    name: 'Big Album',
    url: 'https://music.youtube.com/album/bcdefghi',
  },
  {
    artist: "Baptist",
    created_at: new Date(),
    name: 'The Album',
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
