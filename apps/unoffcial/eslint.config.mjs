import { config } from '@latimeria/eslint-config/with-react'

export default [
  ...config,
  { ignores: ['dist/'] },
]
