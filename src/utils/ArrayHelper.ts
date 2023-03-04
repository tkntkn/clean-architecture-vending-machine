export function removeAt<T>(array: T[], index: number) {
  if (index >= 0) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  } else {
    return [...array];
  }
}

export function isEqual<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export function remove<T>(array: T[], predicate: (item: T) => boolean) {
  return removeAt(array, array.findIndex(predicate));
}

export function* range(size: number) {
  for (let i = 0; i < size; i++) {
    yield i;
  }
}
