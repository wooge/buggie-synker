import { AlbumAdder } from './AlbumAdder'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  args: {},
  component: AlbumAdder,
  tags: ['autodocs'],
  title: 'Components/AlbumAdder',
} satisfies Meta<typeof AlbumAdder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
