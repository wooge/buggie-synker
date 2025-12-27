import { AlbumsList } from './AlbumsList'
import type { Meta, StoryObj } from '@storybook/react-vite'

const mockAlbums = [
  {
    createdAt: new Date(),
    url: 'https://music.youtube.com/album/abcdefgh',
  },
  {
    createdAt: new Date(),
    executedAt: new Date(),
    url: 'https://music.youtube.com/album/bcdefghi',
  },
  {
    createdAt: new Date(),
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
