import React from 'react';
import { useEasyAntdModalContext } from '../context';
import type { AnyFunction, AnyObj } from '../types';
import { isDOMTypeElement, isElement, omit } from '../util';
import useBoolean from './useBoolean';

export type PropsWithModalEnhanced<T extends AnyObj> = {
  enhancedAction?: ModalEnhancedAction;
} & T;

type TriggerType = React.ReactNode;
type ContentType =
  | React.ReactNode
  | (<P extends AnyObj>(props: PropsWithModalEnhanced<P>) => React.ReactNode);
type HandleCallback = (e: React.MouseEvent<HTMLElement>, action: ModalEnhancedAction) => void;

export interface UseModalEnhancedProps {
  defaultOpen?: boolean;
  onClick?: HandleCallback;
  actionRef?: React.RefObject<ModalEnhancedAction>;
  content?: ContentType;
  trigger?: TriggerType;
  children?: ContentType | TriggerType;
}

export interface ModalEnhancedAction {
  close: () => void;
  open: () => void;
}

function useModalEnhanced(props: UseModalEnhancedProps = {}) {
  const { onClick, actionRef: actionRefProp, defaultOpen } = props;

  const [visible, { setTrue: open, setFalse: close }] = useBoolean(defaultOpen);
  const actionRef = React.useRef<ModalEnhancedAction>({ open, close });
  const { triggerProps, contentProps } = useEasyAntdModalContext();

  const mergedTrigger = props[triggerProps!] as TriggerType;
  const mergedContent = props[contentProps!] as ContentType;

  React.useImperativeHandle(actionRefProp, () => actionRef.current);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick) return onClick(event, actionRef.current);
    return open();
  };

  // ======================== Trigger ========================
  let trigger = mergedTrigger;
  if (React.isValidElement(mergedTrigger))
    trigger = React.cloneElement<any>(mergedTrigger, { onClick: handleClick });

  // ======================== Content ========================
  let contentNode: React.ReactNode = null;
  if (isElement<PropsWithModalEnhanced<any>>(contentNode) && !isDOMTypeElement(contentNode)) {
    contentNode = React.cloneElement<PropsWithModalEnhanced<any>>(contentNode, {
      enhancedAction: actionRef.current,
    });
  } else if (typeof mergedContent === 'function') {
    contentNode = (mergedContent as AnyFunction)({
      enhancedAction: actionRef.current,
    });
  } else {
    contentNode = mergedContent as any;
  }

  const contextHolder = { trigger, content: contentNode };
  const action = { open, close };
  const resetProps = omit(props, [
    'defaultOpen',
    'onClick',
    'actionRef',
    'content',
    'trigger',
    'children',
  ]);

  return [visible, action, contextHolder, resetProps] as const;
}

export default useModalEnhanced;
