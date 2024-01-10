import type { ModalProps as AntdModalProps } from 'antd';
import { Modal as AntdModal } from 'antd';
import { UseModalEnhancedProps, useModalEnhanced } from '../hooks';
import usePrefixCls from '../hooks/usePrefixCls';

export type ModalProps = Omit<AntdModalProps, 'visible'> & UseModalEnhancedProps;

const Modal = (props: ModalProps) => {
  const prefixCls = usePrefixCls('modal', props.prefixCls);

  const [visible, { close }, { trigger, content }, restProps] = useModalEnhanced(props);

  const handleModalOk: ModalProps['onOk'] = (event) => {
    props.onOk?.(event);
    close();
  };

  const handleModalCancel: ModalProps['onCancel'] = (event) => {
    props.onCancel?.(event);
    close();
  };

  return (
    <>
      {trigger}
      <AntdModal
        open={visible}
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
