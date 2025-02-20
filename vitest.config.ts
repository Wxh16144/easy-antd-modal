import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    workspace: ['packages/*'],
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    css: true,
    // alias: {
    // [name]: resolve(__dirname, './src'),
    // ['##/*']: resolve(__dirname, '/'),
    // },
    alias: [
      { find: '##/*', replacement: resolve(__dirname, '/$1') },
    ],
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'lcov'],
      include: ['src/**/*'],
    },
  },
});
