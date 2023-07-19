import { Popup as AntdMPopup, type PopupProps as AntdMPopupProps } from 'antd-mobile';
import { useModalEnhanced, type UseModalEnhancedProps } from '../hooks';

export type PopupProps = Omit<AntdMPopupProps, 'onClick'> &
  UseModalEnhancedProps & {
    popupClick?: AntdMPopupProps['onClick']; // antd-mobile Popup onClick
  };

function Popup(props: PopupProps) {
  const { popupClick, ...rawProps } = props;
  const [visible, { close }, { trigger, content }, restProps] = useModalEnhanced(rawProps);

  const handleClose: AntdMPopupProps['onClose'] = () => {
    props?.onClose?.();
    close();
  };

  return (
    <>
      {trigger}
      <AntdMPopup visible={visible} {...restProps} onClose={handleClose} onClick={popupClick}>
        {content}
      </AntdMPopup>
    </>
  );
}

export default Popup;
