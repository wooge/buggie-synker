import { RandomlyColoredWord } from './RandomlyColoredWord'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  args: {
    text: 'The Long Random Text',
  },
  component: RandomlyColoredWord,
  tags: ['autodocs'],
  title: 'Components/RandomlyColoredWord',
} satisfies Meta<typeof RandomlyColoredWord>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
