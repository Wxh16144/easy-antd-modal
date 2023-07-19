import { Button } from 'antd';
import Modal, { ModalEnhancedAction } from 'easy-antd-modal';
import * as React from 'react';

export default () => {
  const modalRef = React.useRef<ModalEnhancedAction>(null);

  return (
    <>
      <Button type="primary" onClick={() => modalRef.current?.open()}>
        Open Modal
      </Button>
      <Modal actionRef={modalRef}>I ❤️ antd</Modal>
    </>
  );
};
