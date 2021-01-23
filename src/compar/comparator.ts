export type Comparator<T> = (a: T, b: T) => number;

export const by = <T, V extends number | string>(
  f: (t: T) => V
): Comparator<T> => (a, b) => {
  const aValue = f(a);
  const bValue = f(b);
  if (aValue < bValue) {
    return -1;
  }
  if (bValue < aValue) {
    return 1;
  }
  return 0;
};

export const byKey = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends keyof any,
  T extends Record<K, number | string>
>(
  key: K
): Comparator<T> => by((x) => x[key]);
