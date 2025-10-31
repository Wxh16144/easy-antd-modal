import { Button } from 'antd';
import { Modal, useEasyModal } from 'easy-antd-modal';
import { useState } from 'react';

function Content() {
  return (
    <div>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <ContentFooter />
    </div>
  );
}

function ContentFooter() {
  const { close } = useEasyModal();
  const [time] = useState(Date.now());

  return (
    <div style={{ textAlign: 'right' }}>
      <Button
        autoFocus
        type="primary"
        onClick={() =>
          close('onOk', {
            time,
            now: Date.now(),
            diff: Date.now() - time,
          })
        }
      >
        Close Modal
      </Button>
    </div>
  );
}

export default () => (
  <Modal
    onOk={(value) => console.log(value)}
    width={480}
    trigger={<Button type="primary">Open Modal</Button>}
    footer={null}
    destroyOnClose
    focusTriggerAfterClose
  >
    <Content />
  </Modal>
);
