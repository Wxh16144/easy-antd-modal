---
title: useModalEnhanced
description: Modal 增强 Hook
sourceUrl: '{github}/blob/master/src/hooks/useModalEnhanced.ts'
order: 2
group: Hooks
---

## 简介

内部对 Trigger 和 Content 进行了 HOC, 通过该 hook 不仅可以对 Modal 进行增强, 还可以对 Ant Design 的 Drawer, 以及 Ant Design Mobile 的 Modal, Popup 以及 Mask 进行增强.

## API

| 参数        | 说明               | 类型                                          | 默认值 |
| ----------- | ------------------ | --------------------------------------------- | ------ |
| defaultOpen | 默认是否打开       | `boolean`                                     | false  |
| onClick     | 点击事件           | [`HandleCallback`](#handlecallback)           | -      |
| actionRef   | 获取 action 的 ref | [`ModalEnhancedAction`](#modalenhancedaction) | -      |
| content     | 内容               | [`ContentType`](#contenttype)                 | -      |
| trigger     | 触发器             | [`TriggerType`](#triggertype)                 | -      |
| children    | 内容或触发器       | `ContentType \| TriggerType`                  | -      |

### ContentType

```tsx | pure
type ContentType =
  | React.ReactNode
  | (<P extends AnyObj>(props: PropsWithModalEnhanced<P>) => React.ReactNode);
```

### TriggerType

```tsx | pure
type TriggerType = React.ReactNode;
```

### HandleCallback

```tsx | pure
type HandleCallback = (e: React.MouseEvent<HTMLElement>, action: ModalEnhancedAction) => void;
```

### ModalEnhancedAction

```tsx | pure
interface ModalEnhancedAction {
  close: () => void;
  open: () => void;
}
```
