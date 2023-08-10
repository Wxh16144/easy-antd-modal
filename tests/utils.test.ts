import { omit } from 'easy-antd-modal';

describe('src/util', () => {
  // copied from https://github.com/react-component/util/blob/306aff37660b5d48fcb34e34ef12f76711a55c2b/tests/omit.test.ts
  describe('omit', () => {
    it('should work', () => {
      const ret = omit({ keep: 1, ignore: 2, anotherKeep: 3 }, ['ignore']);
      expect(ret).toEqual({ keep: 1, anotherKeep: 3 });
    });

    it('invalidate array', () => {
      const ret = omit({ bamboo: 1 }, null);
      expect(ret).toEqual({ bamboo: 1 });
    });

    it('readonly array', () => {
      const ret = omit({ keep: 1, ignore: 2 }, ['ignore'] as const);
      expect(ret).toEqual({ keep: 1 });
    });
  });
});
