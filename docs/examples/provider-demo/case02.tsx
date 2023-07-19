import { Button } from 'antd';
import Modal, { EasyAntdModalProvider } from 'easy-antd-modal';

export default () => (
  <EasyAntdModalProvider contentProps="content">
    <Modal trigger={<Button type="primary">Open Modal</Button>} content="I ❤️ antd" />
  </EasyAntdModalProvider>
);
