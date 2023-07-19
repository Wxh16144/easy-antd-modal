---
title: EasyAntdModalProvider
sourceUrl: '{github}/blob/master/src/context/index.tsx'
description: 用于全局配置 Modal 组件的 Provider
nav: API
order: 1
group: 容器组件
demo:
  cols: 2
---

## 简介

该容器可以针对全局的 Modal 组件进行配置, 按照 Ant Design 的 Modal 组件的 API 约定, 默认情况下 children 为 Modal 的内容. 下面示例是将 Modal 的触发器设为 `children` 内容设为 `content`.

<code src="../examples/provider-demo/case01.tsx"></code>

下面示例是将 Modal 的内容设为 `content`.

<code src="../examples/provider-demo/case02.tsx"></code>

### API

| 参数         | 说明                 | 类型                  | 默认值     |
| ------------ | -------------------- | --------------------- | ---------- |
| triggerProps | Modal 触发器的 props | `trigger \| children` | `trigger`  |
| contentProps | Modal 内容的 props   | `children \| content` | `children` |
