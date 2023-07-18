import { EasyAntdModalProvider } from './context'; // 只导出 Provider!!!
import DragModal from './drag-modal';
import Modal from './modal';

export * from './hooks';
export * from './types';
export * from './util';

export * from './drag-modal';
export * from './modal';

export { DragModal, EasyAntdModalProvider, Modal };

export default Modal;
