import { PlaylistAdder } from './PlaylistAdder'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  args: {},
  component: PlaylistAdder,
  tags: ['autodocs'],
  title: 'Components/PlaylistAdder',
} satisfies Meta<typeof PlaylistAdder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
