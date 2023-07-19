import { Button } from 'antd';
import Modal, { EasyAntdModalProvider } from 'easy-antd-modal';

export default () => (
  <EasyAntdModalProvider triggerProps="children" contentProps="content">
    <Modal content="I ❤️ antd">
      <Button type="primary">Open Modal</Button>
    </Modal>
  </EasyAntdModalProvider>
);
