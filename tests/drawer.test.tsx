import { Button } from 'antd';
import { Drawer, PropsWithModalEnhanced } from 'easy-antd-modal';
import React from 'react';
import { fireEvent, render, screen, waitFakeTimer } from './utils';

describe('Drawer', () => {
  it('导出 Drawer', () => {
    expect(Drawer).toBeDefined();
  });

  it('Drawer content 中会被传入 ModalEnhancedAction', async () => {
    const propsEnhancer = vi.fn();
    const onClose = vi.fn();
    const unMount = vi.fn();
    const Content: React.FC<PropsWithModalEnhanced> = (props) => {
      React.useEffect(() => {
        propsEnhancer(props);

        return unMount;
      }, []);
      return <Button onClick={() => props.enhancedAction?.close()}>Close Modal</Button>;
    };

    render(
      <Drawer defaultOpen onClose={onClose} destroyOnClose>
        <Content />
      </Drawer>,
    );

    expect(propsEnhancer).toHaveBeenCalled();
    // props 中包含 enhancedAction
    expect(propsEnhancer.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        enhancedAction: expect.objectContaining({
          open: expect.any(Function),
          close: expect.any(Function),
        }),
      }),
    );

    const content = screen.getByText('Close Modal');
    expect(content).toBeInTheDocument();
    fireEvent.click(content!);
    await waitFakeTimer();

    // 弹窗 content 内调用 enhancedAction.close() 会关闭弹窗，但不会触发 onCancel
    expect(onClose).not.toHaveBeenCalled();
    expect(unMount).toHaveBeenCalled();
  });

  it('通过蒙层可以关闭，并且触发 onClose 方法', async () => {
    const onClose = vi.fn();

    render(
      <Drawer defaultOpen onClose={onClose}>
        I ❤️ antd
      </Drawer>,
    );

    const mask = document.querySelector('.easy-ant-drawer-mask');
    expect(mask).toBeTruthy();
    fireEvent.click(mask!);
    await waitFakeTimer();

    expect(onClose).toHaveBeenCalled();
  });

  describe('props.prefixCls', () => {
    it('默认', () => {
      const { getByRole } = render(<Drawer defaultOpen>I ❤️ antd</Drawer>);

      expect(document.querySelector('.easy-ant-drawer')).toBeTruthy();
      expect(getByRole('dialog')).toMatchSnapshot();
    });

    it('支持自定义', () => {
      const { getByRole } = render(
        <Drawer prefixCls="test-prefix" defaultOpen>
          I ❤️ antd
        </Drawer>,
      );

      expect(document.querySelector('.test-prefix')).toBeTruthy();
      expect(getByRole('dialog')).toMatchSnapshot();
    });
  });
});
