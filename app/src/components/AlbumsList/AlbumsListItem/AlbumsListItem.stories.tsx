import { AlbumsListItem } from './AlbumsListItem'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { JobStatus } from '@/models/api/jobs'

const defaultAlbum = {
  id: 1,
  status: 'ready' as JobStatus,
  url: 'https://music.youtube.com/album/abcdefgh',
}

const meta = {
  args: {
    initialData: defaultAlbum,
  },
  component: AlbumsListItem,
  tags: ['autodocs'],
  title: 'Components/AlbumsListItem',
} satisfies Meta<typeof AlbumsListItem>

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
