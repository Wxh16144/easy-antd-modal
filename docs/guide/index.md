---
title: 安装
group:
  title: 快速上手
order: 2
---

## 介绍

`ease-antd-modal` 是一个简化 Ant Design Modal 的使用方式的库, 通过对 [Modal](https://ant.design/components/modal) 的封装, 使得 Modal 的使用更加简单, 无需手动维护 open 状态, 自动绑定打开事件, 同时支持 antd4.x 和 antd5.x, 与 antd 提供的 [API](https://ant.design/components/modal#api) 保持一致

## 安装

```bash
npm install easy-antd-modal --save
```

## 使用

```tsx | pure
import { Button } from 'antd';
import Modal from 'easy-antd-modal';

export default () => (
  <Modal title="easy-antd-modal" trigger={<Button type="primary">Click Me</Button>}>
    I ❤️ antd
  </Modal>
);
```
