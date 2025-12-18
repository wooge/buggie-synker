import { AlbumsListItem } from './AlbumsListItem'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  args: {
    createdAt: new Date(),
    url: 'https://music.youtube.com/album/abcdefgh',
  },
  component: AlbumsListItem,
  tags: ['autodocs'],
  title: 'Components/AlbumsListItem',
} satisfies Meta<typeof AlbumsListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
