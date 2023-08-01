import { Button, Typography, version } from 'antd';
import Modal from 'easy-antd-modal';

export default () => (
  <>
    <Typography.Title level={2}>antd version: {version}</Typography.Title>
    <Modal title="easy-antd-modal" trigger={<Button type="primary">Click Me</Button>}>
      I ❤️ antd
    </Modal>
  </>
);
