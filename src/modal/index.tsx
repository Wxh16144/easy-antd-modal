import type { ModalProps as AntdModalProps } from 'antd';
import { ConfigProvider as AntdConfigProvider, Modal as AntdModal } from 'antd';
import * as React from 'react';
import { UseModalEnhancedProps, useModalEnhanced } from '../hooks';

export type ModalProps = Omit<AntdModalProps, 'visible'> & UseModalEnhancedProps;

const Modal = (props: ModalProps) => {
  const { getPrefixCls } = React.useContext(AntdConfigProvider.ConfigContext);
  const modalCls = props.prefixCls ? `${props.prefixCls}` : `easy-${getPrefixCls()}-modal`;

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
        prefixCls={modalCls}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {content}
      </AntdModal>
    </>
  );
};

export default Modal;
