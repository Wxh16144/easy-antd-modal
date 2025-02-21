import { useModalEnhanced, type UseModalEnhancedProps } from '@wuxh/use-modal-enhanced';
import { Dialog as AntdMDialog, type DialogProps as AntdMDialogProps } from 'antd-mobile';

export type DialogProps = Omit<AntdMDialogProps, 'content'> & UseModalEnhancedProps;

function Modal(props: DialogProps) {
  const [visible, { close }, { trigger, content }, restProps] = useModalEnhanced(props);

  const handleClose: AntdMDialogProps['onClose'] = () => {
    props?.onClose?.();
    close();
  };

  return (
    <>
      {trigger}
      <AntdMDialog {...restProps} visible={visible} onClose={handleClose} content={content} />
    </>
  );
}

export default Modal;
