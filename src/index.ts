import { EasyAntdModalProvider, useEasyAntdModal } from './context';
import DragModal from './drag-modal';
import Drawer from './drawer';
import Modal from './modal';

export * from './hooks';
export * from './types';
export * from './util';

export * from './drag-modal';
export * from './drawer';
export * from './modal';

export {
  DragModal,
  Drawer,
  EasyAntdModalProvider,
  Modal,
  // ====== Hooks ======
  useEasyAntdModal,
};

export default Modal;

export * as AntdMobile from './mobile';
export const Antd = {
  Modal,
  Drawer,
};
