import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import turboPlugin from 'eslint-plugin-turbo'
import { configs as tsconfigs, parser as tsparser } from 'typescript-eslint'
import globals from 'globals'
import unusedPlugin from 'eslint-plugin-unused-imports'
import { importX, createNodeResolver } from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import vitest from '@vitest/eslint-plugin'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

/**
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  js.configs.recommended,
  ...tsconfigs.recommended,
  {
    files: ['*/turbo.json'],
    plugins: {
      turbo: turboPlugin,
    },
  },
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  importX.flatConfigs.react,
  {
    files: ['tests/**'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: [
            'packages/*/{ts,js}config.json',
            'apps/*/{ts,js}config.json',
          ],
        }),
        createNodeResolver(),
      ],
      'import-x/order': [
        'error',
      ],
    },
  },
  {
    plugins: {
      'unused-imports': unusedPlugin,
    },
    rules: {
      // typescript-eslintとの競合を避けるために、unused-importsのルールをオフにする
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintPluginUnicorn.configs.recommended,
  stylistic.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: [
          'packages/*/{ts,js}config.json',
          'apps/web/{ts,js}config.json',
        ],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: ['dist/**', '.next/**', 'node_modules/**'],
  },
]
