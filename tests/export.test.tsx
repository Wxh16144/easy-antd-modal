describe('export', () => {
  it('should work', async () => {
    const all = await import('easy-antd-modal');

    expect(Object.keys(all)).toMatchSnapshot();
  });

  it('should export all hooks', async () => {
    const hooks = await import('easy-antd-modal/hooks');

    expect(Object.keys(hooks)).toMatchInlineSnapshot(`
      [
        "useBoolean",
        "useLatestFunc",
        "useModalEnhanced",
      ]
    `);
  });

  it('should export all utils', async () => {
    const types = await import('easy-antd-modal/util');

    expect(Object.keys(types)).toMatchInlineSnapshot(`
      [
        "has",
        "omit",
        "isElement",
        "isDOMTypeElement",
      ]
    `);
  });
});
