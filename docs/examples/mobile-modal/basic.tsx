import { Button } from 'antd-mobile';
import { Modal } from 'easy-antd-modal/mobile';

export default () => (
  <Modal closeOnMaskClick trigger={<Button color="success">Open Modal</Button>}>
    I ❤️ Ant Design Mobile
  </Modal>
);
