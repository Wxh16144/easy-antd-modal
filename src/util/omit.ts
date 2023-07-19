// copied from https://github.com/react-component/util/blob/306aff37660b5d48fcb34e34ef12f76711a55c2b/src/omit.ts
export function omit<T extends object, K extends keyof T>(
  obj: T,
  fields: K[] | readonly K[],
): Omit<T, K> {
  const clone = { ...obj };

  if (Array.isArray(fields)) {
    fields.forEach((key) => {
      delete clone[key];
    });
  }

  return clone;
}
