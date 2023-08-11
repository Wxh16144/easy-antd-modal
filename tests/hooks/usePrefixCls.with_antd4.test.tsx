import { renderHook } from '@testing-library/react';
import usePrefixCls from 'easy-antd-modal/hooks/usePrefixCls';
import { afterAll } from 'vitest';

vi.mock('antd', () => vi.importActual('antd4'));

afterAll(() => {
  vi.resetAllMocks();
});

describe('usePrefixCls', () => {
  it('antd4-默认也不会添加前缀', async () => {
    const { result } = renderHook(() => usePrefixCls('test'));
    expect(result.current).toBe('ant-test');
  });

  it('antd4-第二个参数', async () => {
    const { result } = renderHook(() => usePrefixCls('test', 'test2'));
    expect(result.current).toBe('test2');
  });
});
