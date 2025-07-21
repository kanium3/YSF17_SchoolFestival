import { Button } from './button'
import './extra/base.css'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Ganoine/Button',
  component: Button,
} as Meta<typeof Button>

export const Default = {
  args: {
    children: <p>デフォルトの表示です</p>,
  },
} as StoryObj<typeof Button>

export const Primary = {
  args: {
    children: <p>デフォルトの表示です</p>,
    kind: 'primary',
  },
} as StoryObj<typeof Button>

export const Danger = {
  args: {
    children: <p>デフォルトの表示です</p>,
    kind: 'danger',
  },
} as StoryObj<typeof Button>

export const Disabled = {
  args: {
    children: <p>デフォルトの表示です</p>,
    disabled: true,
  },
} as StoryObj<typeof Button>
