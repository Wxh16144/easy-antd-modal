import type { DrawerProps as AntdDrawerProps } from 'antd';
import { Drawer as AntdDrawer } from 'antd';
import type { PropsWithModalEnhanced, UseModalEnhancedProps } from '../hooks';
import { useModalEnhanced } from '../hooks';
import useMergeOpen from '../hooks/useMergeOpen';
import usePrefixCls from '../hooks/usePrefixCls';
import type { AnyObj } from '../types';

/** @internal */
type CloseCallback = Pick<AntdDrawerProps, 'onClose'>;

/**
 * @description 方便用户自定义 `Modal` 的 `props`
 * @see [easy-antd-modal/typescript](https://wxh16144.github.io/easy-antd-modal/typescript)
 * @example
 * ```tsx
 * // 这段可以直接添加到你的任何 `.ts` 文件中，例如 `antd-modal.ts`
 * // 也可以添加到一个 `.d.ts` 文件中。确保这个文件包含在项目的 `tsconfig.json` 中的 "file" 字段内。
 * import 'easy-antd-modal'
 *
 * declare module 'easy-antd-modal' {
 *  interface DrawerProps {
 *    // `antd` 的 `Modal` 组件的 `visible` 属性
 *    visible?: boolean
 *  }
 * }
 *
 * // 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
 * export {}
 * ```
 */
export interface DrawerProps
  extends Omit<AntdDrawerProps, 'visible' | 'children' | 'onClick'>,
    UseModalEnhancedProps {}

/**
 * @description 方便用户自定义 `Modal` 的 `props`
 * @since 1.6.0
 */
export type DrawerContentPropsWithEnhanced<P extends AnyObj = AnyObj> = PropsWithModalEnhanced<
  P,
  CloseCallback
>;

/** @see [easy-antd-modal#Drawer](https://github.com/Wxh16144/easy-antd-modal/blob/master/src/drawer/index.tsx) */
const Drawer = (props: DrawerProps) => {
  const prefixCls = usePrefixCls('drawer', props.prefixCls);
  const [visible, { close }, { trigger, content }, restProps] =
    useModalEnhanced<CloseCallback>(props);

  const handleModalCancel: DrawerProps['onClose'] = (event) => {
    close('onClose', event);
  };

  const openProp = useMergeOpen({
    visible,
    ...props,
  });

  return (
    <>
      {trigger}
      <AntdDrawer {...openProp} {...restProps} onClose={handleModalCancel} prefixCls={prefixCls}>
        {content}
      </AntdDrawer>
    </>
  );
};

export default Drawer;
