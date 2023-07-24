import { Button } from 'antd';
import { Drawer } from 'easy-antd-modal';
import ContentFrom from './ContentForm';

export default () => (
  <Drawer
    width={480}
    title="Personal information"
    trigger={<Button type="primary">Open Form Drawer</Button>}
    destroyOnClose
    bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
    footer={null}
  >
    <ContentFrom />
  </Drawer>
);
