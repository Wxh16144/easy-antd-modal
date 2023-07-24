import { Button } from 'antd';
import Modal from 'easy-antd-modal';
import ContentFrom from './ContentForm';

export default () => (
  <Modal
    title="Personal information"
    trigger={<Button type="primary">Open Form Modal</Button>}
    destroyOnClose
    footer={null}
  >
    <ContentFrom />
  </Modal>
);
