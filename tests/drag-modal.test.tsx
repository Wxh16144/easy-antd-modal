import { DragModal } from 'easy-antd-modal';
import { fireEvent, render, waitFakeTimer } from './utils';

describe('DragModal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('导出 DragModal 组件', () => {
    expect(DragModal).toBeDefined();
  });

  it('DragModal 组件可以正常渲染', () => {
    const { getByRole } = render(<DragModal title="test" defaultOpen />);

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  it('afterOpenChange 可以正常工作', async () => {
    const afterOpenChange = vi.fn();
    const { getByRole } = render(
      <DragModal
        title="test"
        trigger={<button type="button">open</button>}
        afterOpenChange={afterOpenChange}
      />,
    );

    const button = getByRole('button');
    expect(button).toHaveTextContent('open');
    fireEvent.click(button);
    await waitFakeTimer();

    expect(afterOpenChange).toHaveBeenCalledWith(true);
    expect(getByRole('dialog')).toBeVisible();
  });

  // TODO: 拖拽操作的用例好难写，有没有大佬救救我
});
