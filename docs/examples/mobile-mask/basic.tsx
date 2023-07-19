import { Button } from 'antd-mobile';
import { Mask } from 'easy-antd-modal/mobile';

export default () => (
  <Mask trigger={<Button color="primary">Open Mask</Button>}>
    <h1 style={{ color: 'white', textAlign: 'center', marginBlockStart: '6em' }}>
      I ❤️ Ant Design Mobile
    </h1>
  </Mask>
);
