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

export const External = {
  args: {
    kind: 'external',
    children: <p>外部リンク</p>,
    href: '#',
  },
} as StoryObj<typeof Link>

export const Internal = {
  args: {
    kind: 'internal',
    children: <p>内部リンク</p>,
    href: '#',
  },
} as StoryObj<typeof Link>
