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

export default Modal;
