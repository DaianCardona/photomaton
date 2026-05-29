import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: ['out/**', 'dist/**', 'release/**', 'node_modules/**', '**/*.tsbuildinfo']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Main / preload / shared → entorno Node
  {
    files: ['src/main/**/*.ts', 'src/preload/**/*.ts', 'src/shared/**/*.ts'],
    languageOptions: {
      globals: { ...globals.node }
    }
  },
  // Renderer → entorno navegador + React
  {
    files: ['src/renderer/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser }
    },
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Con el nuevo JSX transform no hace falta importar React en cada archivo.
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off'
    }
  },
  // Config / tests → Node
  {
    files: ['**/*.{js,cjs,mjs}', 'tests/**/*.ts', 'vitest.config.ts', 'electron.vite.config.ts'],
    languageOptions: {
      globals: { ...globals.node }
    }
  },
  prettier
)
