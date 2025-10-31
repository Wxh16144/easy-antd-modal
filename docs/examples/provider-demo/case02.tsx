import { Button } from 'antd';
import { EasyAntdModalProvider, Modal } from 'easy-antd-modal';

export default () => (
  <EasyAntdModalProvider contentProps="content">
    <Modal trigger={<Button type="primary">Open Modal</Button>} content="I ❤️ antd" />
  </EasyAntdModalProvider>
);
