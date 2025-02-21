### BREAKING CHANGE

- 将原来的 `easy-antd-modal` 中的 `antd-mobile` 独立出来，单独发布为 `easy-antd-modal-m`, 所以原来的 `easy-antd-modal` 将不再支持 `antd-mobile` 组件。
- 将 `easy-antd-modal` 中的 `useModalEnhanced` 有关 hooks 独立出来，单独发布为 `@wuxh/use-modal-enhanced`, 但是 `easy-antd-modal` 仍然导出了该包的所有导出。

**easy-antd-modal**

- 移除了 `easy-antd-modal/hooks` 导出。变为统一导出了。

```diff
- import { useModalEnhanced } from 'easy-antd-modal/hooks';
+ import { useModalEnhanced } from 'easy-antd-modal';
```

- 移除了 `easy-antd-modal/utils` 导出。变为统一导出了。

```diff
- import { has, omit } from 'easy-antd-modal/util';
+ import { has, omit } from 'easy-antd-modal';
```

- 移除了 `easy-antd-modal/antd-mobile` 导出。改为包 `easy-antd-modal-m` 导入。

```diff
- import { Modal } from 'easy-antd-modal/antd-mobile';
+ import { Modal } from 'easy-antd-modal-m';
```

- 移除具名导出 `Antd` 和 `AntdMobile`

```diff
- import { Antd, AntdMobile } from 'easy-antd-modal';
+ import { Modal, Drawer } from 'easy-antd-modal';
+ import * as AntdMobile from 'easy-antd-modal-m';
+ const Antd = { Modal, Drawer};
```

**easy-antd-modal-m**

> 新的包，用于支持 `antd-mobile` 组件

**@wuxh/use-modal-enhanced**

> 新的包，用于支持 `useModalEnhanced` 相关 hooks
