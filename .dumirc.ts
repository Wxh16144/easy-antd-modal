import { defineConfig } from 'dumi';
import { homepage } from './package.json';

const isProd = process.env.NODE_ENV === 'production';
// 不是预览模式 同时是生产环境
const isProdSite = process.env.PREVIEW !== '1' && isProd;

const name = 'easy-antd-modal';

export default defineConfig({
  themeConfig: {
    name,
    github: homepage,
  },
  base: isProdSite ? `/${name}/` : '/',
  publicPath: isProdSite ? `/${name}/` : '/',
  html2sketch: {},
  mfsu: false,
  outputPath: '.doc',
});
