---
title: 静态方法
group:
  title: Legacy
order: 5
---

## 静态方法

自 antd 发布 5.0 版本后, Modal 的静态方法已经不推荐使用，[为什么?](https://ant.design/docs/blog/why-not-static-cn), 但二次封装不应该阉割先前的功能, 所以需要将 Modal 的静态方法保留了下来, 不推荐使用。

```tsx
import { Button, Space } from 'antd';
import Modal from 'easy-antd-modal';

export default () => (
  <Button
    danger
    onClick={() => {
      Modal.success({
        title: 'success',
        content: (
          <Space>
            不推荐使用!!!
            <Button type="link" href="https://ant.design/docs/blog/why-not-static-cn">
              为什么?
            </Button>
          </Space>
        ),
        onOk: () => console.log('success'),
      });
    }}
  >
    Static Methods (Not Recommended)
  </Button>
);
```
