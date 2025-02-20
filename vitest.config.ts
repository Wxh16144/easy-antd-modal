import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // workspace: ['packages/*'],
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    css: true,
    alias: {
      '##': __dirname,
    },
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'lcov'],
      include: ['packages/**/src/**/*'],
    },
  },
});
