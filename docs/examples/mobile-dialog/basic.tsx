import { Button } from 'antd-mobile';
import { Dialog } from 'easy-antd-modal-m';

export default () => (
  <Dialog closeOnMaskClick trigger={<Button color="warning">Open Dialog</Button>}>
    I ❤️ Ant Design Mobile
  </Dialog>
);
