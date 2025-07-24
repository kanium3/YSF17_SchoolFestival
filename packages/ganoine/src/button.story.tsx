import { Button } from './button'
import './extra/base.css'
import type { Meta, StoryObj } from '@storybook/react'
import { Button as AriaButton } from 'react-aria-components'

export default {
  title: 'Ganoine/Button',
  component: Button,
} as Meta<typeof Button>

export const Default = {
  args: {
    children: <p>デフォルトの表示です</p>,
    onPress: () => alert('ボタンが押されました'),
  },
} as StoryObj<typeof Button>

export const Primary = {
  args: {
    children: <p>デフォルトの表示です</p>,
    kind: 'primary',
    component: AriaButton,
    onPress: () => alert('ボタンが押されました'),
  },
} as StoryObj<typeof Button>

export const PrimaryAsLink = {
  args: {
    children: <p>デフォルトの表示です</p>,
    kind: 'primary',
    component: 'a',
    href: 'https://example.com',
  },
} as StoryObj<typeof Button>

export const Danger = {
  args: {
    children: <p>デフォルトの表示です</p>,
    kind: 'danger',
    component: AriaButton,
    onPress: () => alert('ボタンが押されました'),
  },
} as StoryObj<typeof Button>

export const Disabled = {
  args: {
    children: <p>デフォルトの表示です</p>,
    disabled: true,
  },
} as StoryObj<typeof Button>
