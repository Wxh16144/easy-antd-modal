import { fireEvent, render, screen, waitFakeTimer } from '##/tests/utils';
import { Button } from 'antd';
import { Drawer, ModalEnhancedAction, PropsWithModalEnhanced } from 'easy-antd-modal';
import React from 'react';

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

  describe('props.onClose', () => {
    // 根据官方文档 onClose 事件是 点击遮罩层或左上角叉或取消按钮的回调
    describe('官方文档', () => {
      it.each([
        ['点击遮罩层', '[class$="ant-drawer-mask"]'],
        ['点击右上角叉', '[class$="ant-drawer-close"]'],
        // ['点击取消按钮', '.ant-btn.cancel-button'], 貌似没有取消按钮
      ])('%s', async (_, className) => {
        const onClose = vi.fn();

        render(
          <Drawer defaultOpen onClose={onClose}>
            I ❤️ antd
          </Drawer>,
        );

        const node = document.querySelector(className);
        expect(node).toBeTruthy();
        fireEvent.click(node!);
        await waitFakeTimer();
        expect(onClose).toHaveBeenCalled();
      });
    });

    // easy-antd-modal actionRef.close() 也可以可选的触发 onCancel
    describe('easy-antd-modal', () => {
      it('actionRef.close() 不触发', async () => {
        const onClose = vi.fn();
        const ref = React.createRef<ModalEnhancedAction>();

        render(
          <Drawer defaultOpen onClose={onClose} actionRef={ref}>
            I ❤️ antd
          </Drawer>,
        );

        ref.current!.close();
        await waitFakeTimer();

        expect(onClose).not.toHaveBeenCalled();
      });

      // feature: 1.6.0+
      it('actionRef.close(`onCancel`) 触发', async () => {
        const onClose = vi.fn();
        const ref = React.createRef<ModalEnhancedAction>();

        render(
          <Drawer defaultOpen onClose={onClose} actionRef={ref}>
            I ❤️ antd
          </Drawer>,
        );

        ref.current!.close('onClose', 'foo', 'bar');
        await waitFakeTimer();
        expect(onClose).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalledWith('foo', 'bar');
      });
    });
  });
});
