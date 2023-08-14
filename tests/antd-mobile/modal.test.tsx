import { Modal } from 'easy-antd-modal/mobile';
import { fireEvent, render, screen, waitFakeTimer } from '../utils';

describe('Mobile Modal', () => {
  it('默认正常工作', async () => {
    const { getByRole } = render(
      <Modal trigger={<button type="button">open</button>}>content</Modal>,
    );
    const button = getByRole('button');
    expect(button).toHaveTextContent('open');
    fireEvent.click(button);
    await waitFakeTimer();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('defaultOpen 正常工作', async () => {
    const onClean = vi.fn();
    const { rerender } = render(
      <Modal defaultOpen destroyOnClose onClose={onClean}>
        content
      </Modal>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
    const mask = document.querySelector('.adm-center-popup-mask');
    expect(mask).toBeTruthy();
    fireEvent.click(mask!); // 默认点击不会关闭
    await waitFakeTimer();
    expect(onClean).not.toHaveBeenCalled();
    expect(screen.queryByText('content')).toBeInTheDocument();

    rerender(
      <Modal defaultOpen destroyOnClose closeOnMaskClick onClose={onClean}>
        content
      </Modal>,
    );
    fireEvent.click(mask!); // 点击关闭
    await waitFakeTimer();
    expect(onClean).toHaveBeenCalled();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });
});
