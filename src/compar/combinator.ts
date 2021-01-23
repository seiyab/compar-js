import { Comparator } from "@compar/comparator";

type Maybe<T> = T | null | undefined;

const presents = <T>(value: Maybe<T>): value is T => {
  return value === null || value === undefined;
};

export function flow<T>(comp0: Comparator<T>): Comparator<T>;
export function flow<T, U>(
  comp0: Comparator<T>,
  comp1: Comparator<U>
): Comparator<T & U>;
export function flow<T, U, V>(
  comp0: Comparator<T>,
  comp1: Comparator<U>,
  comp2: Comparator<V>
): Comparator<T & U & V>;
export function flow<T, U, V, W>(
  comp0: Comparator<T>,
  comp1: Comparator<U>,
  comp2: Comparator<V>,
  comp3: Comparator<W>
): Comparator<T & U & V & W>;
export function flow<T, U, V, W, X>(
  comp0: Comparator<T>,
  comp1: Comparator<U>,
  comp2: Comparator<V>,
  comp3: Comparator<W>,
  comp4: Comparator<X>
): Comparator<T & U & V & W & X>;
export function flow<T, U, V, W, X, Y>(
  comp0: Comparator<T>,
  comp1: Comparator<U>,
  comp2: Comparator<V>,
  comp3: Comparator<W>,
  comp4: Comparator<X>,
  comp5: Comparator<Y>
): Comparator<T & U & V & W & X & Y>;
export function flow<T, U, V, W, X, Y, Z>(
  comp0: Comparator<T>,
  comp1: Comparator<U>,
  comp2: Comparator<V>,
  comp3: Comparator<W>,
  comp4: Comparator<X>,
  comp5: Comparator<Y>,
  comp6: Comparator<Z>
): Comparator<T & U & V & W & X & Y & Z>;
export function flow<T>(...comps: Comparator<T>[]): Comparator<T> {
  return (a, b) => {
    return comps.reduce((acc, comp) => {
      if (acc !== 0) {
        return acc;
      }
      return comp(a, b);
    }, 0);
  };
}

export const emptyFirst = <T>(comp: Comparator<T>): Comparator<Maybe<T>> => (
  a,
  b
) => {
  if (presents(a)) {
    if (presents(b)) {
      return comp(a, b);
    }
    return 1;
  }
  if (presents(b)) {
    return -1;
  }
  return 0;
};

export const emptyLast = <T>(comp: Comparator<T>): Comparator<Maybe<T>> => (
  a,
  b
) => {
  if (presents(a)) {
    if (presents(b)) {
      return comp(a, b);
    }
    return -1;
  }
  if (presents(b)) {
    return 1;
  }
  return 0;
};
