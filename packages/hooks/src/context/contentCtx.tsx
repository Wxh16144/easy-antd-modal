import { createContext } from 'react';
import type { ModalEnhancedAction } from '../useModalEnhanced';

const loop = () => {
  console.warn('This is a placeholder function and does nothing.');
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
