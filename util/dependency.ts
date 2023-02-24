export const Dependency = {
  register<T>(key: string, instance: T) {
    (this as any)[key] = instance;
  },
  inject<T>(key: string): T {
    return new Proxy(this as any, {
      get(target, p, receiver) {
        return target[key][p];
      },
    }) as T;
  },
};
