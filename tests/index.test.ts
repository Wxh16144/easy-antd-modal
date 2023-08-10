import DefaultExportModal, { Modal } from 'easy-antd-modal';

describe('Modal', () => {
  it('默认导出为 Modal', () => {
    expect(DefaultExportModal).toBeDefined();
    expect(Modal).toBeDefined();
    expect(DefaultExportModal).toBe(Modal);
  });
});
