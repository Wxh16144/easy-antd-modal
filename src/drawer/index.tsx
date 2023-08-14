import type { DrawerProps as AntdDrawerProps } from 'antd';
import { Drawer as AntdDrawer } from 'antd';
import { UseModalEnhancedProps, useModalEnhanced } from '../hooks';

export type DrawerProps = Omit<AntdDrawerProps, 'visible'> & UseModalEnhancedProps;

const Modal = (props: DrawerProps) => {
  const [visible, { close }, { trigger, content }, restProps] = useModalEnhanced(props);

  const handleModalCancel: DrawerProps['onClose'] = (event) => {
    props.onClose?.(event);
    close();
  };

  return (
    <>
      {trigger}
      <AntdDrawer open={visible} {...restProps} onClose={handleModalCancel}>
        {content}
      </AntdDrawer>
    </>
  );
};

export default Modal;
