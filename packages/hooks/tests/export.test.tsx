describe('export', () => {
  it('should work', async () => {
    const all = await import('@wuxh/use-modal-enhanced');

    expect(Object.keys(all)).toMatchSnapshot();
  });
});
