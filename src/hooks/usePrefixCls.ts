import { ConfigProvider as AntdConfigProvider, version } from 'antd';
import * as React from 'react';

/** @@Internal 仅仅用于内部组件开发 */
function usePrefixCls(suffixCls: string, customPrefixCls?: string): string {
  const { getPrefixCls } = React.useContext(AntdConfigProvider.ConfigContext);

  if (customPrefixCls) {
    return customPrefixCls;
  }

  /**
   * 5.x 版本的 antd 会自动加上 easy- 前缀， 可以和 antd 的样式区分开。
   * 4.x 使用的是 less，不是很好处理，直接复用 antd 的样式即可。可以在稳定后直接删除对 4.x 的支持。
   * 二次开发约定 xxx-(antd 的组件 cls 逻辑)， 所以处理 4.x 时可以直接 pop() 获取最后一个即可。
   */
  const _prefixCls = version.startsWith('5') ? 'easy-' : '';
  let _suffixCls = version.startsWith('5') ? suffixCls : suffixCls.split('-').pop() ?? '';

  return `${_prefixCls}${getPrefixCls()}-${_suffixCls}`;
}

export default usePrefixCls;
