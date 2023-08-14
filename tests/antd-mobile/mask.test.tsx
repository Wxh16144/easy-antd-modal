import { Mask } from 'easy-antd-modal/mobile';
import { fireEvent, render, waitFakeTimer, waitFor } from '../utils';

describe('Mobile Mask', () => {
  it('默认正常工作', async () => {
    const { getByRole } = render(
      <Mask trigger={<button type="button">open</button>}>mask content</Mask>,
    );
    const button = getByRole('button');
    expect(button).toHaveTextContent('open');
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(document.querySelector('.adm-mask-content')).toBeVisible();
      },
      { timeout: 1000 },
    );
  });

  it('defaultOpen 正常工作', async () => {
    render(
      <Mask defaultOpen trigger={<button type="button">open</button>}>
        mask content
      </Mask>,
    );
    await waitFakeTimer();
    expect(document.querySelector('.adm-mask-content')).toMatchSnapshot();
  });

  it('mobile onMaskClick 正常工作', async () => {
    const onMaskClick = vi.fn();
    render(
      <Mask defaultOpen trigger={<button type="button">open</button>} onMaskClick={onMaskClick}>
        mask content
      </Mask>,
    );
    const mask = document.querySelector('.adm-mask');
    expect(mask).toBeVisible();
    fireEvent.click(mask!);

    expect(onMaskClick).toBeCalledTimes(1);
    // event 参数
    expect(onMaskClick.mock.calls[0][0]).toBeDefined();

    // 不会关闭 mask
    expect(document.querySelector('.adm-mask-content')).toBeVisible();
  });

  it('mobile afterClose 正常工作', async () => {
    const afterClose = vi.fn();
    const { getByRole } = render(
      <Mask trigger={<button type="button">open</button>} afterClose={afterClose}>
        mask content
      </Mask>,
    );

    const button = getByRole('button');
    expect(button).toHaveTextContent('open');
    fireEvent.click(button);
    await waitFakeTimer();

    const mask = document.querySelector('.adm-mask');
    expect(mask).toBeVisible();
    fireEvent.click(mask!);
    await waitFakeTimer();

    expect(afterClose).toBeCalledTimes(1);
    expect(document.querySelector('.adm-mask-content')).not.toBeVisible();
  });
});
