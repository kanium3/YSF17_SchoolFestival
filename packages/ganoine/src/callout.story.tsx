import { Callout } from './callout'
import './extra/base.css'

export default {
  title: 'Ganoine/Callout',
  component: Callout,
}

export const Warn = {
  args: {
    kind: 'warn',
    children: <p>危険です</p>,
  },
}

export const Info = {
  args: {
    kind: 'info',
    children: <p>情報です</p>,
  },
}
export const Default = {
  args: {
    kind: 'default',
    children: <p>デフォルトの表示です</p>,
  },
}
