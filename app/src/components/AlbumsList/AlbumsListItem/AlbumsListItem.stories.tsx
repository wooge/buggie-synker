import { AlbumsListItem } from './AlbumsListItem'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  args: {
    created_at: new Date(),
    url: 'https://music.youtube.com/album/abcdefgh',
  },
  component: AlbumsListItem,
  tags: ['autodocs'],
  title: 'Components/AlbumsListItem',
} satisfies Meta<typeof AlbumsListItem>

export default meta
type Story = StoryObj<typeof meta>

export const FirstFetch: Story = {}

export const Fetched: Story = {
  args: {
    artist: 'artist',
    executed_at: new Date(),
    name: 'album name',
  },
}
