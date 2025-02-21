import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    output: 'lib',
    platform: 'browser',
  },
  esm: {
    output: 'es',
  },
  targets: {
    chrome: 85,
  },
});
