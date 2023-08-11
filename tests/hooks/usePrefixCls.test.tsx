import { renderHook } from '@testing-library/react';
import usePrefixCls from 'easy-antd-modal/hooks/usePrefixCls';

describe('usePrefixCls', () => {
  it('默认工作 antd5', () => {
    const { result } = renderHook(() => usePrefixCls('test'));
    expect(result.current).toBe('easy-ant-test');
  });

  it('第二个参数', () => {
    const { result } = renderHook(() => usePrefixCls('test', 'test2'));
    expect(result.current).toBe('test2');
  });
});
