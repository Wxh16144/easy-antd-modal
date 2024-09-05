---
title: 坚持使用 visible
group:
  title: Legacy
  order: 99
order: 2
---

### 受控请使用 `open`

> 该库本意是通过 `trigger` 来控制 Modal, 但是在一些场景下, 我们需要自己受控方式（但其实不推荐使用这个库，直接用 antd 原生即可）

如果需要使用受控方式, 请使用 `open` 属性来控制 Modal 的显示与隐藏。[usage#不推荐使用](./usage#不推荐使用)

### 坚持使用 `visible`

但其实你可以直接用 `visible` 来控制 Modal 的显示与隐藏。 例如:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Button } from 'antd';
import Modal from 'easy-antd-modal';

export default () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={handleOpen} danger>
        Visible (Not Recommended)
      </Button>
      <Modal
        visible={visible} // <-- 这里还是支持 visible 的，请自己补充 TypeScript 类型
        onCancel={handleClose}
      >
        I ❤️ antd
      </Modal>
    </>
  );
};
```

但是这里会有 TypeScript 的类型问题，因为 `visible` 是 antd 的属性，而 `easy-antd-modal` 将 `visible` 类型 Omit 了，所以你需要自己定义类型。

```ts
// 这段可以直接添加到你的任何 `.ts` 文件中，例如 `antd-modal.ts`
// 也可以添加到一个 `.d.ts` 文件中。确保这个文件包含在项目的 `tsconfig.json` 中的 "file" 字段内。
import 'easy-antd-modal';

declare module 'easy-antd-modal' {
  interface ModalProps {
    /**
     * `antd` 的 `Modal` 组件的 `visible` 属性
     */
    visible?: boolean;
  }
  interface DrawerProps {
    /**
     * `antd` 的 `Drawer` 组件的 `visible` 属性
     */
    visible?: boolean;
  }
}

// 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
export {};
```
