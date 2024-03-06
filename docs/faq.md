---
title: 常见问题
nav:
  title: FAQ
  order: 3
---

## Q: 普通标签控制台报 `enhancedAction` 错误, [#14](https://github.com/Wxh16144/easy-antd-modal/issues/14)

```txt
React does not recognize the `enhancedAction` prop on a DOM element.
```

### A: 已知(边界)问题，因为 `easy-antd-modal` 会给弹窗内容添加一个 `enhancedAction` props

```tsx ｜ pure
import Modal from 'easy-antd-modal';

const Content = (props) => <div {...props}>root 标签是普通标签</div>;

export default () => (
  <Modal defaultOpen>
    <Content />
  </Modal>
);
```

#### 两个解决方法

**方案一**： 临时给 `<Content />` 多包装一个 div。
**方案二**： `<Content >` 组件 omit 掉 enhancedAction。

---

## Q: antd4.x 中，拖拽弹窗关闭后再打开位置没有重置。

### A：预期的 😅

antd4.x 没有提供显隐回调，直到 5.3.0 antd 才为 Modal 提供了 `afterOpenChange`方法， 所以不只是 4.x，在 5.3.0 以下存在同样问题。

---

## Q: 为什么 PC 和 移动端的代码都放在一起，增加依赖体积。[#17](https://github.com/Wxh16144/easy-antd-modal/issues/17)

### A: 这也是规划错误，没有采用 monorepo 的方式，但是问题不是很大，一般构建工具都会对 js 代码 `tree shaking`

---

## Q: 内部通过 `enhancedAction.close()` 关闭不执行 `onClean/onClose` 方法, [#18](https://github.com/Wxh16144/easy-antd-modal/issues/18)

### A: 设计缺陷，起初以为关闭即可，但是使用过程中还是难免会遇到这种需求。[1.6.0](./guide/advanced-close.md) 已经通过另外一种方式解决。可以试试看～
