import type { DrawerProps as AntdDrawerProps } from 'antd';
import { Drawer as AntdDrawer } from 'antd';
import { UseModalEnhancedProps, useModalEnhanced } from '../hooks';
import usePrefixCls from '../hooks/usePrefixCls';

export type DrawerProps = Omit<AntdDrawerProps, 'visible' | 'children'> & UseModalEnhancedProps;

const Modal = (props: DrawerProps) => {
  const prefixCls = usePrefixCls('drawer', props.prefixCls);
  const [visible, { close }, { trigger, content }, restProps] =
    useModalEnhanced<Pick<DrawerProps, 'onClose'>>(props);

  const handleModalCancel: DrawerProps['onClose'] = (event) => {
    close('onClose', event);
  };

  return (
    <>
      {trigger}
      <AntdDrawer open={visible} {...restProps} onClose={handleModalCancel} prefixCls={prefixCls}>
        {content}
      </AntdDrawer>
    </>
  );
};

export default Modal;
