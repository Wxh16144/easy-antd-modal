import Modal from 'easy-antd-modal';
import React from 'react';
import { fireEvent, render, screen, waitFakeTimer } from './utils';

vi.mock('antd', () => vi.importActual('antd-legacy'));

afterAll(() => {
  vi.resetAllMocks();
});

describe('Modal with legacy', () => {
  it('minimal example', () => {
    const { getByRole } = render(
      <Modal trigger={<button type="button">Open Modal</button>}>I ❤️ antd</Modal>,
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();
  });

  it('visible controlled', () => {
    render(
      <Modal
        trigger={<button type="button">Open Modal</button>}
        // @ts-ignore
        visible
      >
        I ❤️ antd
      </Modal>,
    );

    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();
  });

  it('defaultOpen works', async () => {
    const onClean = vi.fn();
    render(
      <Modal title="easy-antd-modal" defaultOpen onCancel={onClean}>
        I ❤️ antd
      </Modal>,
    );

    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();

    const mask = document.querySelector('.ant-modal-wrap');

    expect(mask).toBeTruthy();

    fireEvent.click(mask!);

    await waitFakeTimer();

    expect(onClean).toHaveBeenCalled();
  });

  it('open works', async () => {
    const openChange = vi.fn();
    const Demo = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <Modal
          title="easy-antd-modal"
          open={open}
          onCancel={() => {
            openChange();
            setOpen(false);
          }}
        >
          I ❤️ antd
        </Modal>
      );
    };

    render(<Demo />);

    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();

    const mask = document.querySelector('.ant-modal-wrap');

    expect(mask).toBeTruthy();

    fireEvent.click(mask!);

    await waitFakeTimer();

    expect(screen.getByText('I ❤️ antd')).toBeInTheDocument();
    expect(openChange).toHaveBeenCalled();
  });
});
