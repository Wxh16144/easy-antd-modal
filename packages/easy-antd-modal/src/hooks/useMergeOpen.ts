import { version } from 'antd';
import { isNil } from './nil';

export const INNER_STATE = Symbol('__easy_antd_modal_inner_state__');

interface UseMergeOpenProps {
  [INNER_STATE]?: boolean;
  visible?: boolean;
  open?: boolean;
}

export const CAN_USE_OPEN = function canUseOpen() {
  const [major, minor] = (typeof version === 'string' ? version : '0.0.0')
    .split('.')
    .map((v) => parseInt(v, 10));

  return (
    major >= 5 || // antd v5
    (major === 4 && minor >= 23) // antd v4.23.0+
  );
};

const useMergeOpen = (props: UseMergeOpenProps) => {
  let { visible, open } = props;

  visible ||= props[INNER_STATE] ?? false;

  if (isNil(open)) open = visible;

  const key = CAN_USE_OPEN() ? 'open' : 'visible';

  return {
    [key]: open,
  };
};

export default useMergeOpen;
