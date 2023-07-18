import { Button } from 'antd';
import Modal from 'easy-antd-modal';

export default () => (
  <>
    <Modal title="easy-antd-modal" trigger={<Button type="primary">Click Me</Button>}>
      I ❤️ antd
    </Modal>
  </>
);
