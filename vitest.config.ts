import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@main': resolve('src/main'),
      '@renderer': resolve('src/renderer'),
      '@shared': resolve('src/shared')
    }
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.{test,spec}.ts'],
    globals: true
  }
})
