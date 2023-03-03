export function removeAt<T>(array: T[], index: number) {
  if (index >= 0) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  } else {
    return [...array];
  }
}

export function remove<T>(array: T[], predicate: (item: T) => boolean) {
  return removeAt(array, array.findIndex(predicate));
}
