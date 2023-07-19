import { Button } from 'antd-mobile';
import { Popup } from 'easy-antd-modal/mobile';

export default () => (
  <Popup closeOnMaskClick trigger={<Button color="danger">Open Popup</Button>}>
    <div style={{ height: '30vh', fontSize: '3em', textAlign: 'center', marginBlock: '1em' }}>
      I ❤️ Ant Design Mobile
    </div>
  </Popup>
);
