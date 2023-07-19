import { Button, message } from 'antd';
import Modal from 'easy-antd-modal';

export default () => (
  <Modal
    title="Easy-antd-modal"
    onClick={(event, actions) => {
      globalThis.console.log('Modal onClick', { event, actions });
      const needOpen = Math.random() > 0.5;
      if (needOpen) {
        message.success({
          content: '即将打开 Modal',
          duration: 1,
          onClose: actions.open, // 需要手动调用 actions.open() 才能打开 Modal
        });
      } else {
        message.error({
          content: '不打开 Modal',
          duration: 1,
        });
      }
    }}
    trigger={<Button type="primary">Open Modal</Button>}
  >
    I ❤️ antd
  </Modal>
);
