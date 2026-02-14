import { PlaylistItem } from './PlaylistItem'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { JobStatus } from '@/models/api/jobs'

const defaultPlaylist = {
  created_at: new Date(),
  id: 1,
  name: 'playlist name',
  status: 'ready' as JobStatus,
  url: 'https://music.youtube.com/playlist/abcdefgh',
}

const meta = {
  args: {
    initialData: defaultPlaylist,
  },
  component: PlaylistItem,
  tags: ['autodocs'],
  title: 'Components/PlaylistItem',
} satisfies Meta<typeof PlaylistItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InProgress: Story = {
  args: {
    initialData: {
      ...defaultPlaylist,
      status: 'active',
    },
  },
}
