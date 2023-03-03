import { remove as removeFromArray } from "@/utils/ArrayHelper";
import { useCallback, useState } from "react";

export function useArrayState<T>(init: T[] | (() => T[]) = []) {
  const [state, setState] = useState(init);
  const push = useCallback((item: T) => setState((state) => state.concat([item])), []);
  const pop = useCallback(() => (setState((state) => state.slice(0, -1)), state.at(-1)), [state]);
  const remove = useCallback((target: T) => setState((state) => removeFromArray(state, target)), []);
  return [state, setState, push, pop, remove] as [state: typeof state, setState: typeof setState, push: typeof push, pop: typeof pop, remove: typeof remove];
}
