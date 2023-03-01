import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { Ref } from "vue";

export type State<T> = { get(): T; set(state: T): void };

// React
export function useBusinessState<T>([state, setState]: [T, Dispatch<SetStateAction<T>>]): State<T> {
  const ref = useRef(state);
  ref.current = state;
  return useMemo(
    () => ({
      get() {
        return ref.current;
      },
      set(newState: T) {
        setState(newState);
      },
    }),
    []
  );
}

// Vue
export function toBusinessState<T>(state: Ref<T>): State<T> {
  return {
    get() {
      return state.value;
    },
    set(newState: T) {
      state.value = newState;
    },
  };
}
