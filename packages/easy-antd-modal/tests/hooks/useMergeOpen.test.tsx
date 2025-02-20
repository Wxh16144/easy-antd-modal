import origin_useMergeOpen from 'easy-antd-modal';
import { beforeAll } from 'vitest';

let useMergeOpen: typeof origin_useMergeOpen;

const caseMap = [
  [{}, { open: false }],
  [{ visible: false }, { open: false }],
  [{ open: false }, { open: false }],
  [{ visible: false, open: true }, { open: true }],
  [{ visible: true, open: false }, { open: false }],
  [{ visible: true, open: void 0 }, { open: true }],
] as const;

describe('default', () => {
  beforeAll(async () => {
    vi.resetModules();
    useMergeOpen = await import('easy-antd-modal').then((m) => m.useMergeOpen);
  });

  it.each(caseMap)(`test "useMergeOpen(%j)"`, (props, expected) => {
    const result = useMergeOpen(props);
    expect(result).toEqual(expected);
    expect(result).not.toHaveProperty('visible');
  });
});

describe('v4.23.0', () => {
  beforeAll(async () => {
    vi.resetModules();
    vi.doMock('antd', () => ({
      version: '4.23.0',
    }));

    useMergeOpen = await import('easy-antd-modal').then((m) => m.useMergeOpen);

    return function cleanup() {
      vi.doUnmock('antd');
    };
  });

  it.each(caseMap)(`test "useMergeOpen(%j)" for v4.23.0`, (props, expected) => {
    const result = useMergeOpen(props);
    expect(result).toEqual(expected);
    expect(result).not.toHaveProperty('visible');
  });
});

describe('v4.10.2', () => {
  beforeAll(async () => {
    vi.resetModules();
    vi.doMock('antd', () => ({
      version: '4.10.2',
    }));

    useMergeOpen = await import('easy-antd-modal/hooks/useMergeOpen').then((m) => m.default);

    return function cleanup() {
      vi.doUnmock('antd');
    };
  });

  it.each([
    [{}, { visible: false }],
    [{ visible: false }, { visible: false }],
    [{ open: false }, { visible: false }],
    [{ visible: false, open: true }, { visible: true }],
    [{ visible: true, open: false }, { visible: false }],
    [{ visible: true, open: void 0 }, { visible: true }],
  ])(`test 'useMergeOpen(%j)' for v4.10.2`, (props, expected) => {
    const result = useMergeOpen(props);
    expect(result).toEqual(expected);
    expect(result).not.toHaveProperty('open');
  });
});
