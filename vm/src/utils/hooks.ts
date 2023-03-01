import { useCallback, useState } from "react";

export function useArrayRecord<K extends string | number | symbol, T>() {
  const [state, setState] = useState<Record<K, T[]>>({} as Record<K, T[]>);
  const add = useCallback((key: K, item: T) => {
    setState((current) => ({ ...current, [key]: (current[key] ?? []).concat(item) }));
  }, []);
  const clear = useCallback(() => {
    setState({} as Record<K, T[]>);
  }, []);
  return [state, add, clear] as const;
}
