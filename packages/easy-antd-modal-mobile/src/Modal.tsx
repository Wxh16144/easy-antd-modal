import { useModalEnhanced, type UseModalEnhancedProps } from '@wuxh/use-modal-enhanced';
import { Modal as AntdMModal, type ModalProps as AntdMModalProps } from 'antd-mobile';

export type ModalProps = Omit<AntdMModalProps, 'content'> & UseModalEnhancedProps;

function Modal(props: ModalProps) {
  const [visible, { close }, { trigger, content }, restProps] = useModalEnhanced(props);

  const handleClose: AntdMModalProps['onClose'] = () => {
    props?.onClose?.();
    close();
  };

  return (
    <>
      {trigger}
      <AntdMModal visible={visible} {...restProps} onClose={handleClose} content={content} />
    </>
  );
}

export default Modal;
