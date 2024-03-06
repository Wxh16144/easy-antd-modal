import { AnyObj } from '../types';

export const has = (obj: AnyObj, key: PropertyKey): key is keyof typeof obj =>
  Object.prototype.hasOwnProperty.call(obj, key);
