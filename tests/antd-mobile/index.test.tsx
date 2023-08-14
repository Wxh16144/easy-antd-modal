import { AntdMobile } from 'easy-antd-modal';

import { Dialog, Mask, Modal, Popup } from 'easy-antd-modal/mobile';

describe('antd Mobile', () => {
  it('导出正常', () => {
    expect(AntdMobile).toBeDefined();
    ['Dialog', 'Mask', 'Modal', 'Popup'].forEach((key) => {
      expect(AntdMobile[key as keyof typeof AntdMobile]).toBeDefined();
    });
  });

  it('./mobile 导出正常', () => {
    expect(Dialog).toBeDefined();
    expect(Mask).toBeDefined();
    expect(Modal).toBeDefined();
    expect(Popup).toBeDefined();
  });
});
