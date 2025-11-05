import { createContext } from 'react';
import type { ModalEnhancedAction } from '../useModalEnhanced';

const loop = () => {
  console.warn(
    '[easy-antd-modal]: Can not find ModalContext. Please ensure that your component is used in the proper context.',
  );
};

export interface EasyAntdModalContentContextValue extends ModalEnhancedAction {
  /**
   * @internal
   */
  __any?: any;
}

export const EasyAntdModalContentContext = createContext<EasyAntdModalContentContextValue>({
  open: loop,
  close: loop,
});

EasyAntdModalContentContext.displayName = 'EasyAntdModalContentContext';
