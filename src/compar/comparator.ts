export type Comparator<T> = (a: T, b: T) => number;
export type Comparable = number | string;

type Option = {
  empty: "last" | "first" | "min" | "max";
  order: "asc" | "desc";
};

export function by<T, U extends Comparable>(
  f: (t: T) => U,
  option?: Partial<Option>
): Comparator<T>;
export function by<T, U extends Maybe<Comparable>>(
  f: (t: T) => U,
  option: Partial<Option> & Pick<Option, "empty">
): Comparator<T>;
export function by<T>(
  f: (t: T) => Maybe<Comparable>,
  option?: Partial<Option>
): Comparator<T> {
  const basicComparator = (a: T, b: T) => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const aValue = f(a);
    const bValue = f(b);
    if (aValue! < bValue!) {
      return -1;
    }
    if (bValue! < aValue!) {
      return 1;
    }
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
    return 0;
  };

  const orderedComparator = ((): Comparator<T> => {
    if (option?.order === "desc") {
      return (a, b) => basicComparator(b, a);
    }
    return basicComparator;
  })();

  if (option?.empty === "first")
    return reorderEmpty(orderedComparator, f, true);
  if (option?.empty === "last")
    return reorderEmpty(orderedComparator, f, false);
  if (option?.empty === "min")
    return reorderEmpty(orderedComparator, f, option?.order === "asc");
  if (option?.empty === "max")
    return reorderEmpty(orderedComparator, f, option?.order === "desc");

  return orderedComparator;
}

const reorderEmpty = <T, V extends Comparable>(
  comp: Comparator<T>,
  f: (t: T) => Maybe<V>,
  emptyFirst: boolean
): Comparator<T> => (x: T, y: T) => {
  const xPresents = presents(f(x));
  const yPresents = presents(f(y));
  if (xPresents) {
    if (yPresents) {
      return comp(x, y);
    }
    return emptyFirst ? 1 : -1;
  }
  if (yPresents) {
    return emptyFirst ? -1 : 1;
  }
  return 0;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyKey = keyof any;

export function byKey<
  K extends AnyKey,
  T extends Partial<Record<K, Maybe<Comparable>>>
>(key: K, option: Partial<Option> & Pick<Option, "empty">): Comparator<T>;
export function byKey<K extends AnyKey, T extends Record<K, Comparable>>(
  key: K,
  option?: Partial<Option>
): Comparator<T>;
export function byKey<
  K extends AnyKey,
  T extends Partial<Record<K, Maybe<Comparable>>>
>(key: K, option?: Partial<Option>): Comparator<T> {
  return by((x) => x[key], option as Option);
}

type Maybe<T> = T | null | undefined;

const presents = <T>(value: Maybe<T>): value is T => {
  return value !== null && value !== undefined;
};

export const irregular = <T>(
  predicate: (element: T) => boolean,
  order: "first" | "last"
) => (a: T, b: T): number => {
  const [aIsIrregular, bIsIrregular] = [a, b]
    .map(predicate)
    .map((isIrr) => (isIrr ? 1 : -1));
  if (order === "first") return bIsIrregular - aIsIrregular;
  return aIsIrregular - bIsIrregular;
};
