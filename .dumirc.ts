import { defineConfig } from 'dumi';
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: 'easy-antd-modal',
    github: homepage,
  },
  html2sketch: {},
  mfsu: false,
});
