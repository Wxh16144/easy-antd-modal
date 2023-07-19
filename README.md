# easy-antd-modal

<!-- SHIELD GROUP -->

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] [![Deploy CI][release-ci]][release-ci-url] [![Coverage][coverage]][codecov-url]

[![contributors][contributors-shield]][contributors-url] [![forks][forks-shield]][forks-url] [![stargazers][stargazers-shield]][stargazers-url] [![issues][issues-shield]][issues-url]

[![docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

<!-- umi url -->

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/easy-antd-modal.svg?style=flat-square&color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/easy-antd-modal
[npm-size]: https://img.shields.io/bundlephobia/minzip/easy-antd-modal?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=easy-antd-modal

<!-- coverage -->

[coverage]: https://codecov.io/gh/Wxh16144/easy-antd-modal/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/Wxh16144/easy-antd-modal/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/Wxh16144/easy-antd-modal/workflows/Test%20CI/badge.svg
[release-ci]: https://github.com/Wxh16144/easy-antd-modal/workflows/Release%20CI/badge.svg
[test-ci-url]: https://github.com/Wxh16144/easy-antd-modal/actions?query=workflow%3ATest%20CI
[release-ci-url]: https://github.com/Wxh16144/easy-antd-modal/actions?query=workflow%3ARelease%20CI
[download-image]: https://img.shields.io/npm/dm/easy-antd-modal.svg?style=flat-square
[download-url]: https://npmjs.org/package/easy-antd-modal

## 简介

基于 Ant Design 的 Modal 组件的二次封装，简化了 Modal 的使用方式

- 支持 antd4.x 和 antd5.x, API 保持一致
- 自动绑定打开事件, 无需维护 open 状态
- content 增强, 支持内部手动关闭
- 支持拖拽, 类 window 窗口
- 可直接对接 antd-mobile 的 Mask, Modal, Popup, Dialog 组件
- 长期维护 (欢迎 PR)

## 快速上手

### 安装

推荐使用 `pnpm` 安装

```bash
pnpm i easy-antd-modal -S
```

### 使用

```tsx | pure
import { Button } from 'antd';
import Modal from 'easy-antd-modal';

export default () => (
  <Modal title="easy-antd-modal" trigger={<Button type="primary">Click Me</Button>}>
    I ❤️ antd
  </Modal>
);
```

## 迭代记录

详情：[CHANGELOG](./CHANGELOG.md)

## License

Copyright © 2023 - present [Wxh16144][profile-url]. <br />
This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

[profile-url]: https://github.com/Wxh16144

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/Wxh16144/easy-antd-modal.svg?style=flat
[contributors-url]: https://github.com/Wxh16144/easy-antd-modal/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/Wxh16144/easy-antd-modal.svg?style=flat
[forks-url]: https://github.com/Wxh16144/easy-antd-modal/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/Wxh16144/easy-antd-modal.svg?style=flat
[stargazers-url]: https://github.com/Wxh16144/easy-antd-modal/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/Wxh16144/easy-antd-modal.svg?style=flat
[issues-url]: https://github.com/Wxh16144/easy-antd-modal/issues/new/choose
