import { Button } from 'antd';
import DefaultExportModal, {
  Antd,
  Drawer,
  Modal,
  ModalEnhancedAction,
  PropsWithModalEnhanced,
} from 'easy-antd-modal';
import React from 'react';
import { fireEvent, render, screen, waitFakeTimer } from './utils';

describe('Modal', () => {
  it('默认导出为 Modal', () => {
    expect(DefaultExportModal).toBeDefined();
    expect(Modal).toBeDefined();
    expect(DefaultExportModal).toBe(Modal);
  });

  it('导出了 antd namespace', () => {
    expect(Antd).toBeDefined();
    expect(Antd).toEqual({
      Modal,
      Drawer,
      // DragModal, // DragModal 不属于 antd，需要导出吗？
    });
  });

  it('README.md 中的基础示例正常工作', async () => {
    const { getByRole } = render(
      <Modal title="easy-antd-modal" trigger={<Button type="primary">Click Me</Button>}>
        I ❤️ antd
      </Modal>,
    );

    const button = getByRole('button');
    expect(button).toHaveTextContent('Click Me');
    fireEvent.click(button);
    await waitFakeTimer();
    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();
  });

  it('defaultOpen 正常工作', async () => {
    const onClean = vi.fn();
    render(
      <Modal title="easy-antd-modal" defaultOpen onCancel={onClean}>
        I ❤️ antd
      </Modal>,
    );

    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();
    const mask = document.querySelector('.easy-ant-modal-wrap');
    expect(mask).toBeTruthy();
    fireEvent.click(mask!);
    await waitFakeTimer();
    expect(onClean).toHaveBeenCalled();
  });

  it('trigger 传入任意可添加 onClick 事件的组件都可以正常工作', async () => {
    const { container } = render(
      <Modal title="easy-antd-modal" trigger={<div id="trigger"></div>}>
        I ❤️ antd
      </Modal>,
    );

    const triggerNode = container.querySelector('#trigger');
    expect(triggerNode).toBeTruthy();
    fireEvent.click(triggerNode!);
    await waitFakeTimer();
    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();
  });

  it('触发器的 onClick 事件会被劫持', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Modal title="easy-antd-modal" trigger={<Button onClick={onClick}>Click Me</Button>}>
        I ❤️ antd
      </Modal>,
    );

    const button = getByRole('button');
    expect(button).toBeTruthy();
    fireEvent.click(button!);
    await waitFakeTimer();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('触发器的 onClick 事件被 Model.onClick 代替, 并且需要手动调用打开', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Modal title="easy-antd-modal" onClick={onClick} trigger={<Button>Click Me</Button>}>
        I ❤️ antd
      </Modal>,
    );

    const button = getByRole('button');
    expect(button).toBeTruthy();
    fireEvent.click(button!);
    await waitFakeTimer();
    expect(onClick).toHaveBeenCalled();

    // 弹窗不会自动打开
    expect(screen.queryByText('I ❤️ antd')).not.toBeInTheDocument();

    // onClick 第二个参数为 modalAction， 包含 open 和 close 方法
    expect(onClick.mock.calls[0][1]).toEqual({
      open: expect.any(Function),
      close: expect.any(Function),
    });

    // 通过 modalAction.open() 打开弹窗
    onClick.mockImplementation((_, modalAction) => {
      modalAction.open();
    });

    fireEvent.click(button!);
    expect(onClick).toHaveBeenCalledTimes(2);
    await waitFakeTimer();
    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument(); // 弹窗已经打开
  });

  it('可以通过 actionRef 打开弹窗', async () => {
    const ref = React.createRef<ModalEnhancedAction>();

    render(
      <Modal title="easy-antd-modal" actionRef={ref} trigger={<Button>Click Me</Button>}>
        I ❤️ antd
      </Modal>,
    );

    expect(ref.current?.open).toBeDefined();
    expect(ref.current?.close).toBeDefined();
    ref.current!.open();
    await waitFakeTimer();
    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();
  });

  it('Modal content 中会被传入 ModalEnhancedAction', async () => {
    const propsEnhancer = vi.fn();
    const onClean = vi.fn();
    const unMount = vi.fn();
    const Content: React.FC<PropsWithModalEnhanced> = (props) => {
      React.useEffect(() => {
        propsEnhancer(props);

        return unMount;
      }, []);
      return <Button onClick={() => props.enhancedAction?.close()}>Close Modal</Button>;
    };

    render(
      <Modal defaultOpen onCancel={onClean} destroyOnClose>
        <Content />
      </Modal>,
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
    expect(onClean).not.toHaveBeenCalled();
    expect(unMount).toHaveBeenCalled();
  });

  it('点击弹窗 footer 的 ok 按钮会触发 onOk， 并且关闭弹窗', async () => {
    const onOk = vi.fn();
    const { getByRole } = render(
      <Modal title="easy-antd-modal" defaultOpen onOk={onOk} destroyOnClose>
        I ❤️ antd
      </Modal>,
    );

    const okButton = getByRole('button', { name: 'OK' });
    expect(okButton).toBeTruthy();
    fireEvent.click(okButton!);
    await waitFakeTimer();
    expect(onOk).toHaveBeenCalled();
    expect(screen.queryByText('I ❤️ antd')).not.toBeInTheDocument();
  });

  it('Modal content 支持回调函数，回调函数的第一个参数为 ModalEnhancedAction', async () => {
    const propsEnhancer = vi.fn();

    render(
      <Modal defaultOpen destroyOnClose>
        {
          ((props: PropsWithModalEnhanced) => {
            propsEnhancer(props);
            return <Button onClick={() => props.enhancedAction?.close()}>Close Modal</Button>;
          }) as any
        }
      </Modal>,
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

    const closeModalButton = screen.getByText('Close Modal');
    expect(closeModalButton).toBeTruthy();
    fireEvent.click(closeModalButton!);
    await waitFakeTimer();
    expect(closeModalButton).not.toBeInTheDocument();
  });

  describe('props.prefixCls', () => {
    it('默认', () => {
      const { getByRole } = render(<Modal defaultOpen>I ❤️ antd</Modal>);

      expect(document.querySelector('.easy-ant-modal')).toBeTruthy();
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
