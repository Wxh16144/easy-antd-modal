---
title: 为什么二开?
nav: 快速了解
group:
  title: 介绍
order: 0
---

## 为什么二开

Ant Design 的 Modal 组件提供了非常多的 API 以便于我们可以灵活方便的使用, 那为什么我又二次封装了一个 Modal 组件呢? 这不是重复造轮子吗?

## 前言

过去一年半时间, 我一直使用 React + antd 进行开发，也积累了一些经验, 但是在使用过程中，我发现有一些问题， 例如:

1. 每一个 Modal 都需要使用 React.useState 进行维护维护一个 open 状态，通过 visible 控制打开状态，最后还需要在 Modal 的 onOk 和 onCancel 事件中手动修改，就这样整个代码会变得冗余，不够优雅。

2. Modal 的打开事件, 一般都是通过点击某个按钮来触发, 但是每次都需要手动绑定 onClick 事件. 同样不够优雅.

3. Ant Design 提供了 footer 属性, 假设业务代码很复杂，不得不将其抽离出来，但是 footer 又和业务分离，不够内聚，导致我们需要将控制开关手动传递下去, 而不抽离的话又会使得 Modal 组件变得臃肿。

4. 一般情况下，Modal 都是固定位置打开，但是有时候我们需要将其拖拽到某个位置，虽然 Ant Design 提供了[可拖拽 Demo](https://ant.design/components/modal#components-modal-demo-modal-render) 但是并没有直接提供这样的功能，需要自己去实现。

## 解决方案

针对问题 1, 2, 3 封装了 [useModalEnhanced](/api/use-modal-enhanced) hook, 支持对 antd 提供的 API 进行封装, 不需要维护 open 状态, 以及绑定打开事件, 也不需要在 onOk 和 onCancel 中手动修改 open 状态, 一切都是自动的, 代码变得更加优雅。

问题 4 属于一个新功能, 直接基于前面的 1, 2, 3 再次封装, 使得 Modal 可以拖拽。

:::info{title=不是银弹}
深知**一千个人眼中有一千个哈姆雷特**, 所以没有绝对好的方案，只有更适合自己的。 [看看更多 FAQ ](../faq.md)
:::
