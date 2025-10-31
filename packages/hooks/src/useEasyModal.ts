import { useContext } from 'react';
import { EasyAntdModalContentContext } from './context/contentCtx';

export function useEasyModal() {
  return useContext(EasyAntdModalContentContext);
}
