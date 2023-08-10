import { Button } from 'antd';
import Modal, { EasyAntdModalProvider, useEasyAntdModal } from 'easy-antd-modal';
import React from 'react';
import { fireEvent, render, screen, waitFakeTimer } from './utils';

describe('Provider', () => {
  it('triggerProps 和 contentProps 冲突会抛出错误', () => {
    expect(() => {
      render(
        <EasyAntdModalProvider
          triggerProps="children"
          contentProps="children"
        ></EasyAntdModalProvider>,
      );
    }).toThrowError();
  });

  it('Provider 可以正常工作', async () => {
    const { getByRole } = render(
      <EasyAntdModalProvider triggerProps="children" contentProps="content">
        <Modal title="easy-antd-modal" content="I ❤️ antd">
          <Button type="primary">Click Me</Button>
        </Modal>
      </EasyAntdModalProvider>,
    );

    const button = getByRole('button');
    expect(button).toHaveTextContent('Click Me');
    fireEvent.click(button);
    await waitFakeTimer();
    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();
  });

  it('嵌套使用默认继承父级', () => {
    const ref1 = React.createRef();
    const ref2 = React.createRef();
    const Demo = React.forwardRef((_, ref) => {
      const context = useEasyAntdModal();
      React.useImperativeHandle(ref, () => context, [context]);
      return null;
    });

    render(
      <EasyAntdModalProvider triggerProps="children" contentProps="content">
        <Demo ref={ref1} />
        <EasyAntdModalProvider triggerProps="trigger">
          <Demo ref={ref2} />
        </EasyAntdModalProvider>
      </EasyAntdModalProvider>,
    );

    expect(ref1.current).toEqual({
      triggerProps: 'children',
      contentProps: 'content',
    });

    expect(ref2.current).toEqual({
      triggerProps: 'trigger',
      contentProps: 'content',
    });
  });
});
