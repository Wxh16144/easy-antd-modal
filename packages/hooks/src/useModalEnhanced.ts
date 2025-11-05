import React from 'react';
import { useEasyAntdModal } from './context/configCtx';
import { EasyAntdModalContentContext } from './context/contentCtx';
import type { AnyFunction, AnyObj } from './types';
import useBoolean from './useBoolean';
import useLatestFunc from './useLatestFunc';
import { has, isDOMTypeElement, isElement, omit } from './util';

export type PropsWithModalEnhanced<
  P extends AnyObj = AnyObj,
  CloseCB extends FunctionMap = AnyObj,
> = {
  enhancedAction?: ModalEnhancedAction<CloseCB>;
} & P;

type TriggerType = React.ReactNode;
type ContentType =
  | React.ReactNode
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (<P extends AnyObj = {}>(props: PropsWithModalEnhanced<P>) => React.ReactNode);

export interface UseModalEnhancedProps {
  defaultOpen?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>, action: ModalEnhancedAction) => void;
  actionRef?: React.RefObject<ModalEnhancedAction>;
  content?: ContentType;
  trigger?: TriggerType;
  children?: ContentType | TriggerType;
}

type FunctionMap = Record<string, AnyFunction>;

/** `v1.6.0+` */
type EnhancedClose<CloseCB extends FunctionMap> = {
  <CBN extends keyof CloseCB>(callbackName: CBN, ...restArgs: Parameters<CloseCB[CBN]>): void;
  // 这里的 `callbackName` 是可选的，因为有些场景下，不需要回调， TS 类型太复杂了，所以这里不做强制要求
  <CBN extends keyof CloseCB>(callbackName?: CBN): void;
};

/** `earlier ~ v1.5.x` */
type LegacyClose = () => void;

export interface ModalEnhancedAction<CloseCB extends FunctionMap = any> {
  /**
   * 关闭弹窗。
   * 1. `earlier ~ v1.5.x` 版本中，`close` 类型为 {@link LegacyClose}
   *
   * 2. `v1.6.0+` 版本中，`close` 类型为 {@link EnhancedClose}
   * 它支持传入回调函数名，以及回调函数的参数。可实现更多的功能。 比如：[#18](https://github.com/Wxh16144/easy-antd-modal/issues/18)
   */
  close: EnhancedClose<CloseCB> | LegacyClose;
  open: () => void;
}

function useModalEnhanced<CloseCB extends FunctionMap = any>(props: UseModalEnhancedProps = {}) {
  const { onClick, actionRef: actionRefProp, defaultOpen } = props;
  const [visible, { setTrue: open, setFalse }] = useBoolean(defaultOpen);

  const close = useLatestFunc<EnhancedClose<CloseCB>>((callbackName, ...restArgs) => {
    setFalse();
    if (callbackName && has(props, callbackName)) {
      (props as AnyObj)[callbackName](...restArgs);
    }
  });

  const actionRef = React.useRef<ModalEnhancedAction<CloseCB>>({ open, close });
  const { triggerProps, contentProps } = useEasyAntdModal();

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
  let contentNode: React.ReactNode = mergedContent as React.ReactNode;
  if (isElement<PropsWithModalEnhanced<any>>(contentNode) && !isDOMTypeElement(contentNode)) {
    contentNode = React.cloneElement<PropsWithModalEnhanced<any>>(contentNode, {
      enhancedAction: actionRef.current,
    });
  } else if (typeof mergedContent === 'function') {
    contentNode = (mergedContent as AnyFunction)({
      enhancedAction: actionRef.current,
    });
  }

  const actions = React.useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  // ======================== Context Holder ========================
  contentNode = React.createElement(
    EasyAntdModalContentContext.Provider,
    { value: actions },
    contentNode,
  );

  const contextHolder = React.useMemo(
    () => ({
      trigger,
      content: contentNode,
    }),
    [trigger, contentNode],
  );

  const resetProps = omit(props, [
    'defaultOpen',
    'onClick',
    'actionRef',
    'content',
    'trigger',
    'children',
  ]);

  return [visible, actions, contextHolder, resetProps] as const;
}

export default useModalEnhanced;
