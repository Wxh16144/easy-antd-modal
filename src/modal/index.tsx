import type { ModalProps as AntdModalProps } from 'antd';
import { Modal as AntdModal } from 'antd';
import type { PropsWithModalEnhanced, UseModalEnhancedProps } from '../hooks';
import { useModalEnhanced } from '../hooks';
import useMergeOpen, { INNER_STATE } from '../hooks/useMergeOpen';
import usePrefixCls from '../hooks/usePrefixCls';
import type { AnyObj } from '../types';

/** @internal */
type CloseCallback = Pick<ModalProps, 'onCancel'>;

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
 *  interface ModalProps {
 *    // `antd` 的 `Modal` 组件的 `visible` 属性
 *    visible?: boolean
 *  }
 * }
 *
 * // 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
 * export {}
 * ```
 */
export interface ModalProps
  extends Omit<AntdModalProps, 'visible' | 'children' | 'open'>,
    UseModalEnhancedProps {
  open?: boolean; // 为了老版本也有 TS 类型提示
}

/**
 * @description 方便用户自定义 `Modal` 的 `props`
 * @since 1.6.0
 */
export type ModalContentPropsWithEnhanced<P extends AnyObj = AnyObj> = PropsWithModalEnhanced<
  P,
  CloseCallback
>;

/** @see [easy-antd-modal#Modal](https://github.com/Wxh16144/easy-antd-modal/blob/master/src/modal/index.tsx) */
const Modal = (props: ModalProps) => {
  const prefixCls = usePrefixCls('modal', props.prefixCls);

  const [visible, { close }, { trigger, content }, restProps] =
    useModalEnhanced<CloseCallback>(props);

  const handleModalOk: ModalProps['onOk'] = (event) => {
    props.onOk?.(event);
    close();
  };

  const handleModalCancel: ModalProps['onCancel'] = (event) => {
    close('onCancel', event);
  };

  const openProp = useMergeOpen({
    [INNER_STATE]: visible,
    ...props,
  });

  return (
    <>
      {trigger}
      <AntdModal
        {...restProps}
        {...openProp}
        prefixCls={prefixCls}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {content}
      </AntdModal>
    </>
  );
};

/**
 * Antd 的一些静态方法（不推荐使用，为什么：https://ant.design/docs/blog/why-not-static-cn)
 */
type _InternalModalType = typeof AntdModal;
let initialized: boolean = false;

if (!initialized) {
  for (const key in AntdModal) {
    if (Object.prototype.hasOwnProperty.call(AntdModal, key)) {
      (Modal as any)[key] = (AntdModal as any)[key];
    }
  }
  initialized = true;
}

// fixme: 类型体操太累了
export default Modal as typeof Modal & Omit<_InternalModalType, keyof AntdModalProps>;
