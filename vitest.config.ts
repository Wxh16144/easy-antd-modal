import { resolve } from 'path';
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
      'easy-antd-modal': resolve(__dirname, 'packages/easy-antd-modal/src'),
      'easy-antd-modal-m': resolve(__dirname, 'packages/easy-antd-modal-mobile/src'),
      '@wuxh/use-modal-enhanced': resolve(__dirname, 'packages/hooks/src'),
    },
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'lcov'],
      include: ['packages/**/src/**/*'],
    },
  },
});
