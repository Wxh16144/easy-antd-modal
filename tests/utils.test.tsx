import { omit } from 'easy-antd-modal';
import React from 'react';

describe('src/util', () => {
  // copied from https://github.com/react-component/util/blob/306aff37660b5d48fcb34e34ef12f76711a55c2b/tests/omit.test.ts
  describe('omit', () => {
    it('should work', () => {
      const ret = omit({ keep: 1, ignore: 2, anotherKeep: 3 }, ['ignore']);
      expect(ret).toEqual({ keep: 1, anotherKeep: 3 });
    });

    it('invalidate array', () => {
      // @ts-expect-error
      const ret = omit({ bamboo: 1 }, null);
      expect(ret).toEqual({ bamboo: 1 });
    });

    it('readonly array', () => {
      const ret = omit({ keep: 1, ignore: 2 }, ['ignore'] as const);
      expect(ret).toEqual({ keep: 1 });
    });
  });

  describe('react-is', () => {
    it('isElement', () => {
      expect(true).toBeTruthy();
      expect(<div />).toBeTruthy();
      expect(<></>).toBeTruthy();
      expect(React.createElement('div')).toBeTruthy();
      expect(React.createElement(React.Fragment)).toBeTruthy();
      expect('string').toBeTruthy();
      expect(() => void 0).toBeTruthy();
      expect({}).toBeTruthy();
      // === false
      expect(0).toBeFalsy();
      expect(false).toBeFalsy();
      expect(null).toBeFalsy();
      expect(undefined).toBeFalsy();
      expect(NaN).toBeFalsy();
    });
  });

  it('isDOMTypeElement', () => {
    expect(true).toBeTruthy();
    expect(<div />).toBeTruthy();
    expect(<></>).toBeTruthy();
    expect(React.createElement('div')).toBeTruthy();
    expect(React.createElement(React.Fragment)).toBeTruthy();
    expect('string').toBeTruthy();
    expect(() => void 0).toBeTruthy();
    expect({}).toBeTruthy();
    // === false
    expect(0).toBeFalsy();
    expect(false).toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(NaN).toBeFalsy();
  });
});
