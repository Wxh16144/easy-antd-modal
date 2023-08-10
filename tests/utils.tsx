import { RenderOptions, RenderResult, act, render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import * as React from 'react';
import { vi } from 'vitest';

/**
 * Wait for a time delay. Will wait `advanceTime * times` ms.
 *
 * @param advanceTime Default 1000
 * @param times Default 20
 */
export async function waitFakeTimer(advanceTime = 1000, times = 20) {
  for (let i = 0; i < times; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await Promise.resolve();

      if (advanceTime > 0) {
        vi.useFakeTimers();
        vi.advanceTimersByTime(advanceTime);
      } else {
        vi.runAllTimers();
      }
    });
  }
}

const AllTheProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          hashed: false,
        }}
      >
        {children}
      </ConfigProvider>
    </React.StrictMode>
  );
};

// re-export everything
export * from '@testing-library/react';

const pureRender = render;
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// override render method
export { pureRender, customRender as render };
