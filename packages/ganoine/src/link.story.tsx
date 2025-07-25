import { Link } from './link'
import './extra/base.css'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Ganoine/Link',
  component: Link,
} as Meta<typeof Link>

export const Default = {
  args: {
    children: <p>デフォルトのリンク</p>,
    href: '#',
  },
} as StoryObj<typeof Link>
