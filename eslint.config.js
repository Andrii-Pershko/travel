import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    ...reactHooks.configs.flat.recommended,
    ...reactRefresh.configs.vite,
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-undef': 'error',
      'import/no-unresolved': ['error', { ignore: ['^@/', '^vite', '^@vitejs/', '^@tailwindcss/'] }],
      'import/named': 'error',
      'import/default': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
]
