import { Button } from 'antd';
import { DragModal } from 'easy-antd-modal';

export default () => (
  <DragModal title="Easy-antd-modal" trigger={<Button type="primary">Open Drag Modal</Button>}>
    I ❤️ antd
  </DragModal>
);
