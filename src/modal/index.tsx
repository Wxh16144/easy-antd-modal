import type { ModalProps as AntdModalProps } from 'antd';
import { Modal as AntdModal } from 'antd';
import * as React from 'react';
import { UseModalEnhancedProps, useModalEnhanced } from '../hooks';

export type ModalProps = Omit<AntdModalProps, 'visible'> & UseModalEnhancedProps;

const Modal = (props: ModalProps) => {
  const { onOk, onCancel, ...restProps } = props;
  const [visible, { close }, { trigger, content }] = useModalEnhanced(props);

  const handleModalOk = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOk?.(event);
    close();
  };

  const handleModalCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    onCancel?.(event);
    close();
  };

  return (
    <>
      {trigger}
      <AntdModal open={visible} onOk={handleModalOk} onCancel={handleModalCancel} {...restProps}>
        {content}
      </AntdModal>
    </>
  );
};

export default Modal;
