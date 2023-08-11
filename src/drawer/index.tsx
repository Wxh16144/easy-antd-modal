import type { DrawerProps as AntdDrawerProps } from 'antd';
import { ConfigProvider as AntdConfigProvider, Drawer as AntdDrawer } from 'antd';
import * as React from 'react';
import { UseModalEnhancedProps, useModalEnhanced } from '../hooks';

export type DrawerProps = Omit<AntdDrawerProps, 'visible'> & UseModalEnhancedProps;

const Modal = (props: DrawerProps) => {
  const { getPrefixCls } = React.useContext(AntdConfigProvider.ConfigContext);
  const drawerCls = props.prefixCls ? `${props.prefixCls}` : `easy-${getPrefixCls()}-drawer`;

  const [visible, { close }, { trigger, content }, restProps] = useModalEnhanced(props);

  const handleModalCancel: DrawerProps['onClose'] = (event) => {
    props.onClose?.(event);
    close();
  };

  return (
    <>
      {trigger}
      <AntdDrawer open={visible} {...restProps} onClose={handleModalCancel} prefixCls={drawerCls}>
        {content}
      </AntdDrawer>
    </>
  );
};

export default Modal;
