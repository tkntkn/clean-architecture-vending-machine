export function timer(millis: number) {
  return new Promise((resolve) => setTimeout(() => resolve, millis));
}
