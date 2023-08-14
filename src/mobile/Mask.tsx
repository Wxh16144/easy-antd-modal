import { Mask as AntdMMask, type MaskProps as AntdMMaskProps } from 'antd-mobile';
import { useModalEnhanced, type UseModalEnhancedProps } from '../hooks';

export type MaskProps = AntdMMaskProps & UseModalEnhancedProps;

function Mask(props: MaskProps) {
  const [visible, { close }, { trigger, content }, restProps] = useModalEnhanced(props);

  const handleMaskClick: AntdMMaskProps['onMaskClick'] = (e) => {
    if (props.onMaskClick) return props.onMaskClick(e);
    close();
  };

  const handleMaskClose: AntdMMaskProps['afterClose'] = () => {
    props.afterClose?.();
    close();
  };

  return (
    <>
      {trigger}
      <AntdMMask
        visible={visible}
        {...restProps}
        afterClose={handleMaskClose}
        onMaskClick={handleMaskClick}
      >
        {content}
      </AntdMMask>
    </>
  );
}

export default Mask;
