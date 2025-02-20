import * as React from 'react';

export interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export default function useBoolean(defaultValue = false): [boolean, Actions] {
  const [state, setState] = React.useState(!!defaultValue);

  const actions: Actions = React.useMemo(() => {
    const setTrue = () => setState(true);
    const setFalse = () => setState(false);
    const toggle = () => setState((prev) => !prev);

    return {
      toggle,
      setTrue,
      setFalse,
    };
  }, []);

  return [state, actions];
}
