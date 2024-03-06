import { useCallback, useEffect, useRef } from 'react';

type Maybe<T> = T | undefined | null;

// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLatestFunc<T extends Maybe<(...args: any[]) => any>>(fn: T): T {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  });

  const callbackFn = useCallback((...args: Parameters<NonNullable<T>>) => {
    ref.current!(...args);
  }, []);

  // @ts-expect-error
  return fn ? callbackFn : fn;
}
