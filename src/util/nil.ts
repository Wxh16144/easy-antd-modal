export const isNil = (value: unknown): value is null | undefined =>
  // eslint-disable-next-line eqeqeq
  value == null;
