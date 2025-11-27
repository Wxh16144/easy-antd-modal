import { renderHook } from '@testing-library/react';
import { usePrefixCls } from 'easy-antd-modal';
import { afterAll } from 'vitest';

vi.mock('antd', () => vi.importActual('antd5'));

afterAll(() => {
  vi.resetAllMocks();
});

describe('usePrefixCls', () => {
  it('antd5 正常工作', () => {
    const { result } = renderHook(() => usePrefixCls('test'));
    expect(result.current).toBe('easy-ant-test');
  });

  it('第二个参数', () => {
    const { result } = renderHook(() => usePrefixCls('test', 'test2'));
    expect(result.current).toBe('test2');
  });
});
