import { AlbumItem } from './AlbumItem'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { JobStatus } from '@/models/api/jobs'
import './AlbumItem.scss'

const defaultAlbum = {
  id: 1,
  status: 'ready' as JobStatus,
  url: 'https://music.youtube.com/album/abcdefgh',
}

const meta = {
  args: {
    initialData: defaultAlbum,
  },
  component: AlbumItem,
  tags: ['autodocs'],
  title: 'Components/AlbumItem',
} satisfies Meta<typeof AlbumItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InProgress: Story = {
  args: {
    initialData: {
      ...defaultAlbum,
      status: 'active',
    },
  },
}

export const Fetched: Story = {
  args: {
    initialData: {
      ...defaultAlbum,
      artist: 'Artist',
      name: 'Album-name',
    },
  },
}
