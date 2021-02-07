import { Comparator } from "@compar/comparator";

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
