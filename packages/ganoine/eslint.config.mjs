import { config } from '@latimeria/eslint-config/base'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  ...config,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    rules: {
      'react/prop-types': 'off',
    },
  },
  reactHooks.configs['recommended-latest'],
  { ignores: ['dist/'] },
]
