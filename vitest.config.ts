import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import { name } from './package.json';

export default defineConfig({
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    css: true,
    alias: {
      [name]: resolve(__dirname, './src'),
    },
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'lcov'],
      include: ['src/**/*'],
    },
  },
});
