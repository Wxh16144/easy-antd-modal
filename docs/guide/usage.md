---
title: 基础使用
group:
  title: 快速上手
order: 3
---

## 推荐示例

默认情况下, `children` 直接作为 Modal 的内容, 通过 `trigger` 传入触发器, 点击触发器即可打开 Modal

```tsx
/**
 * defaultShowCode: true
 */
import { Button } from 'antd';
import Modal from 'easy-antd-modal';

export default () => <Modal trigger={<Button type="primary">Open Modal</Button>}>I ❤️ antd</Modal>;
```

## 不推荐使用

你依然可以自己手动维护 open 状态, 通过 `open` 控制 Modal 的打开状态, 但是不推荐这样做, 因为这和直接使用 antd 的 modal 没有任何区别.

```tsx
import { Button } from 'antd';
import Modal from 'easy-antd-modal';
import * as React from 'react';

export default () => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button danger type="dashed" onClick={() => setOpen(true)}>
        Open Modal (Not Recommended)
      </Button>
      <Modal open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
        I ❤️ antd
      </Modal>
    </>
  );
};
```

## actionRef

除了使用 state 来维护 open 状态, 你还可以通过 `actionRef` 来控制 Modal 的打开状态

<code src="../examples/modal/action-ref.tsx"></code>

## 劫持触发器点击

当你需要在触发器点击时, 执行一些操作, 例如: 校验表单, 通过 `onClick` 即可劫持触发器点击事件, 但是需要注意的是, 你需要手动调用 `onClick` 第二个回调参数 `action.open()` 来打开 Modal, 否则 Modal 将不会打开.

<code src="../examples/modal/trigger-event.tsx"></code>
