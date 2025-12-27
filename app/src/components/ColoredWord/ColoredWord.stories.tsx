import { ColoredWord } from './ColoredWord'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  args: {
    parts: [
      {
        color: 'blue',
        text: 'Hel',
      },
      {
        color: 'green',
        text: 'lo',
      },
    ],
  },
  component: ColoredWord,
  tags: ['autodocs'],
  title: 'Components/ColoredWord',
} satisfies Meta<typeof ColoredWord>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongWord: Story = {
  args: {
    parts: [
      {
        color: 'blue',
        text: 'a'.repeat(50),
      },
      {
        color: 'green',
        text: 'a'.repeat(50),
      },
    ],
  },
}
