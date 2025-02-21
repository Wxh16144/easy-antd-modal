import type { DOMElement, HTMLAttributes, ReactElement, SVGAttributes } from 'react';
import { isValidElement } from 'react';

export function isElement<P>(element: any): element is ReactElement<P> {
  return isValidElement(element);
}

export function isDOMTypeElement<P extends HTMLAttributes<T> | SVGAttributes<T>, T extends Element>(
  element: any,
): element is DOMElement<P, T> {
  return isElement(element) && typeof element.type === 'string';
}
