import DragModal from './drag-modal';
export * from './drag-modal';
export * from './drawer';
export * from './modal';

import Drawer from './drawer';

import Modal from './modal';

export { DragModal, Drawer, Modal };

export * from '@wuxh/use-modal-enhanced';

export * from './hooks';
/**
 * @deprecated  Please use named imports instead,
 * next version will remove default export.
 * ```diff
 * - import Modal from 'easy-antd-modal';
 * + import { Modal } from 'easy-antd-modal';
 * ```
 */
export default Modal;
