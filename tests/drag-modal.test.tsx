import { DragModal } from 'easy-antd-modal';
import { render } from './utils';

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

  // TODO: 拖拽操作的用例好难写，有没有大佬救救我
});
