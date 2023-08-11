import fg from 'fast-glob';
import * as path from 'path';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';
import { render } from './utils';

beforeEach(() => {
  vi.useFakeTimers();
  // @ts-ignore
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({}), text: () => Promise.resolve('') }),
  );
});

afterEach(() => {
  vi.useRealTimers();
});

const baseDir = path.join(__dirname, '..');
const examplePath = path.join(baseDir, 'docs/examples');

// 支持 examples 下的所有非_开头的tsx文件
const allExamples = fg.globSync('**/[!_]*.tsx', {
  cwd: examplePath,
});

allExamples.forEach((file) => {
  it(`renders ${file} correctly`, async () => {
    const Demo = await import(path.join(examplePath, file));

    // console.log(`测试组件${dir} DEMO:${demoName}`);
    const wrapper = render(<Demo.default />);
    act(() => {
      vi.runAllTimers();
    });

    expect(wrapper.container).toMatchSnapshot();
    wrapper.unmount();
  });
});
