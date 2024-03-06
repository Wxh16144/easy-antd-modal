---
title: 内部关闭(回调)
group:
  title: 进阶使用
  order: 1
order: 5
---

## 快速了解 <Badge>1.6.0+</Badge>

在 [issue#18](https://github.com/Wxh16144/easy-antd-modal/issues/18) 中，遇到需求是内部关闭操作无法执行`onClean/onClose` 方法。想了几个方案都不太满意。最终绕了一圈解决：

内部调用的地方传入一个需要触发的回调函数名即可。后面参数则是该函数的执行参数。

```tsx | pure
import { Button } from 'antd';
import type { ModalContentPropsWithEnhanced } from 'easy-antd-modal';
import React from 'react';

const ContentForm: React.FC<ModalContentPropsWithEnhanced> = ({ enhancedAction }) => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    enhancedAction?.close('onCancel', event); // <=== 关键改动
  }

  return <Button onClick={handleClick}>Close</Button>;
};

export default ContentForm;
```

:::warning
**请注意 `<Modal />` 的关闭回调是 <span style="color:red">onCancel</span>, 而 `<Drawer />` 是 <span style="color:red">onClose</span>.**
:::

```tsx | pure
import { Button } from 'antd';
import type { DrawerContentPropsWithEnhanced } from 'easy-antd-modal';
import React from 'react';

const ContentForm: React.FC<DrawerContentPropsWithEnhanced> = ({ enhancedAction }) => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    enhancedAction?.close('onClose', event); // Drawer 的回调是 onClose
  }

  return <Button onClick={handleClick}>Close</Button>;
};

export default ContentForm;
```

### FAQ

#### Q：为什么我不直接受控，然后将关闭方法传递下去了 🤣？

条条大路通罗马, 确实直接 props 传递下去更直观（前提是你已经用了受控模式）， 但是具体情况需要具体分析 🧐
