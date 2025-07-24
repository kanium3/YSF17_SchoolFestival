import { Callout } from './callout'
import './extra/base.css'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Ganoine/Callout',
  component: Callout,
} as Meta<typeof Callout>

export const Warn = {
  args: {
    kind: 'warn',
    children: <p>危険です</p>,
  },
} as StoryObj<typeof Callout>

export const Info = {
  args: {
    kind: 'info',
    children: <p>情報です</p>,
  },
} as StoryObj<typeof Callout>

export const Default = {
  args: {
    kind: 'default',
    children: <p>デフォルトの表示です</p>,
  },
} as StoryObj<typeof Callout>
