import { App } from 'antd';
import * as React from 'react';

export function rootContainer(container: React.ReactNode) {
  return React.createElement(App, null, container);
}
