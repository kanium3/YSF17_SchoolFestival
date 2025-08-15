import { config as baseConfig } from './base.js'
import reactPlugin from 'eslint-plugin-react'

import { configs as reactHooksConfigs } from 'eslint-plugin-react-hooks'

export const config = [
  ...baseConfig,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  reactHooksConfigs['recommended-latest'],
]
