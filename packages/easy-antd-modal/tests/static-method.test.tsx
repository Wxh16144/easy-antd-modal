import { Modal as OriginModal } from 'antd';
import { Modal } from 'easy-antd-modal';

describe('Static Methods', () => {
  [
    'info',
    'success',
    'error',
    'warning',
    'confirm',
    // 'warn' // deprecated
    'config',
    'useModal',
    'destroyAll',
  ].forEach((method) => {
    it(`Modal.${method} 被定义`, async () => {
      expect((Modal as any)[method]).toBeDefined();

      // 和原始的 antd Modal 一致
      expect((Modal as any)[method]).toBe((OriginModal as any)[method]);
    });
  });
});
