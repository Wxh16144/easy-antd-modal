import * as React from 'react';

export type EasyAntdModalContextType = {
  /**
   * 触发器的 props
   * @default `trigger`
   */
  triggerProps?: 'children' | 'trigger';
  /**
   * 内容的 props
   * @default `content`
   */
  contentProps?: 'content' | 'children';
};

export const EasyAntdModalContext = React.createContext<EasyAntdModalContextType>({
  triggerProps: 'trigger',
  contentProps: 'children',
});

export const useEasyAntdModal = () => React.useContext(EasyAntdModalContext);

export const EasyAntdModalProvider = (props: React.PropsWithChildren<EasyAntdModalContextType>) => {
  const {
    triggerProps: parentTriggerProps = 'trigger',
    contentProps: parentContentProps = 'children',
  } = useEasyAntdModal();

  const { children, triggerProps = parentTriggerProps, contentProps = parentContentProps } = props;

  if (triggerProps === contentProps) {
    throw new Error(`"triggerProps" and "contentProps" cannot be the same`);
  }

  const memoizedContextValue = React.useMemo(
    () => ({
      triggerProps,
      contentProps,
    }),
    [triggerProps, contentProps],
  );

  return (
    <EasyAntdModalContext.Provider value={memoizedContextValue}>
      {children}
    </EasyAntdModalContext.Provider>
  );
};
