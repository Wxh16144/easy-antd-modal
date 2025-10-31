---
title: 内部关闭 (hooks)
group:
  title: 进阶使用
  order: 1
order: 6
---

### Content 内部关闭 (使用 hooks)

在一些场景下, 我们需要在 Modal 内部关闭 Modal, 例如: 表单提交成功后, 需要关闭 Modal, 这时候我们可以通过 `Content` 组件来实现, `Content` 组件会将 `children` 作为 Modal 的内容, 并且会自动添加关闭按钮, 例如:

<code src="../examples/advanced-content/hooks.tsx"></code>
