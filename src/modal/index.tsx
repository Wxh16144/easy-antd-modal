import type { ModalProps as AntdModalProps } from 'antd';
import { Modal as AntdModal } from 'antd';
import type { PropsWithModalEnhanced, UseModalEnhancedProps } from '../hooks';
import { useModalEnhanced } from '../hooks';
import useMergeOpen from '../hooks/useMergeOpen';
import usePrefixCls from '../hooks/usePrefixCls';
import type { AnyObj } from '../types';

/** @internal */
type CloseCallback = Pick<ModalProps, 'onCancel'>;

export type ModalProps = Omit<AntdModalProps, 'visible' | 'children'> & UseModalEnhancedProps;

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
    visible,
    ...props,
  });

  return (
    <>
      {trigger}
      <AntdModal
        {...openProp}
        {...restProps}
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
