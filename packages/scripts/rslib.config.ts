import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    tsconfigPath: 'tsconfig.json',
  },
  lib: [
    {
      format: 'esm',
      output: {
        distPath: {
          root: './dist/esm',
        },
      },
    },
    {
      format: 'cjs',
      output: {
        distPath: {
          root: './dist/cjs',
        },
      },
    },
  ],
})
