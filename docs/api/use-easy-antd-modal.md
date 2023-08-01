---
title: useEasyAntdModal
description: 上下文 Hook
order: 2
group: Hooks
---

## 简介

该 Hook 用于获取 EasyAntdModal 的上下文, 通过该 Hook 可以获取到 Modal 的配置

```tsx
import { useEasyAntdModal } from 'easy-antd-modal';

export default () => {
  const { triggerProps, contentProps } = useEasyAntdModal();
  return (
    <>
      <p>triggerProps: {JSON.stringify(triggerProps)}</p>
      <p>contentProps: {JSON.stringify(contentProps)}</p>
    </>
  );
};
```

## API

| 参数         | 说明                 | 类型                  | 默认值     |
| ------------ | -------------------- | --------------------- | ---------- |
| triggerProps | Modal 触发器的 props | `trigger \| children` | `trigger`  |
| contentProps | Modal 内容的 props   | `children \| content` | `children` |
