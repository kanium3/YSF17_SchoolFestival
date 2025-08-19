import { config } from '@latimeria/eslint-config/base'

export default [
  ...config,
  { ignores: ['dist/', '*/generated/*'] },
]
