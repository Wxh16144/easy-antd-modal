describe('export', () => {
  it('should work', async () => {
    const all = await import('easy-antd-modal-m');

    expect(Object.keys(all)).toMatchSnapshot();
  });
});
