import { useCallback, useReducer, useState, useRef } from "react";

export function useArrayState<T>(init: T[] | (() => T[]) = []) {
  const [state, setState] = useState(init);
  const push = useCallback((item: T) => setState((state) => state.concat([item])), []);
  const pop = useCallback(() => (setState((state) => state.slice(0, -1)), state.at(-1)), [state]);
  return [state, setState, push, pop] as [state: typeof state, setState: typeof setState, push: typeof push, pop: typeof pop];
}

export function useForceUpdate() {
  const [_, forceUpdate] = useReducer((x) => !x, true);
  return forceUpdate;
}

export function useImmediateState<T>(init: T) {
  const forceUpdate = useForceUpdate();

  const ref = useRef(init);

  const getState = useCallback(() => {
    return ref.current;
  }, []);

  const setState = useCallback((arg: T | ((current: T) => T)) => {
    const value = typeof arg === "function" ? (arg as (current: T) => T)(ref.current) : arg;
    if (value !== ref.current) {
      ref.current = value;
      forceUpdate();
    }
  }, []);

  return [getState, setState] as [typeof getState, typeof setState];
}
