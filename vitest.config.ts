import { defineConfig } from 'vitest/config';
import { name } from './package.json';

export default defineConfig({
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    css: true,
    alias: {
      '@': './src',
      [name]: './src',
    },
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'lcov'],
    },
  },
});
