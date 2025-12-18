import { PageLink } from './PageLink'
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
  component: PageLink,
  tags: ['autodocs'],
  title: 'Components/PageLink',
} satisfies Meta<typeof PageLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}
