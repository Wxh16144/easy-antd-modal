import Modal from 'easy-antd-modal';
import { render } from './utils';

vi.mock('antd', () => vi.importActual('antd4'));

afterAll(() => {
  vi.resetAllMocks();
});

describe('Modal with antd4', () => {
  describe('props.prefixCls', () => {
    it('默认 atnd@4 不会添加 easy-', () => {
      const { getByRole } = render(<Modal defaultOpen>I ❤️ antd</Modal>);

      expect(document.querySelector('.ant-modal')).toBeTruthy();
      expect(getByRole('dialog')).toMatchSnapshot();
    });

    it('支持自定义', () => {
      const { getByRole } = render(
        <Modal prefixCls="test-prefix" defaultOpen>
          I ❤️ antd
        </Modal>,
      );

      expect(document.querySelector('.test-prefix')).toBeTruthy();
      expect(getByRole('dialog')).toMatchSnapshot();
    });
  });
});
