import { DragEvent as ReactDragEvent, PointerEvent as ReactPointerEvent, StyleHTMLAttributes, useCallback } from "react";

type Effect = DataTransfer["dropEffect"];

export function useDraggable<E extends HTMLElement, V extends string>(key: string, value: V, effect: Effect, callback: () => void): StyleHTMLAttributes<E> {
  const draggable = true;

  const onDragStart = useCallback(
    (event: ReactDragEvent<E>) => {
      event.preventDefault();
      event.dataTransfer.setData(key, value);
      event.dataTransfer.effectAllowed = effect;
    },
    [key, value]
  );

  const onDragEnd = useCallback((event: ReactDragEvent<E>) => {
    if (event.dataTransfer.types.includes(key) && event.dataTransfer.dropEffect === effect) {
      event.preventDefault();
      callback();
    }
  }, []);

  return {
    draggable,
    onDragStart,
    onDragEnd,
  };
}

export function useDroppable<E extends Element, V extends string>(key: string, effect: Effect, callback: (value: V) => void) {
  const onDragEnter = useCallback((event: ReactDragEvent<E>) => {
    if (event.dataTransfer.types.includes(key)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = effect;
    }
  }, []);

  const onDragOver = useCallback((event: ReactDragEvent<E>) => {
    if (event.dataTransfer.types.includes(key)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = effect;
    }
  }, []);

  const onDrop = useCallback(
    async (event: ReactDragEvent<E>) => {
      if (event.dataTransfer.types.includes(key)) {
        event.preventDefault();
        callback(event.dataTransfer.getData(key) as V);
      }
    },
    [callback]
  );

  return { onDragEnter, onDragOver, onDrop };
}

export function useDraggableAlt<K extends `data-${string}`, V extends string>(key: string, dataKey: K, value: V, callback: () => void): StyleHTMLAttributes<HTMLElement> {
  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      event.preventDefault();
      const original = event.currentTarget;
      original.style.opacity = "0.25";

      const clone = original.cloneNode() as HTMLElement;
      clone.style.position = "fixed";
      clone.style.zIndex = "1000";
      clone.style.opacity = "0.75";

      original.parentElement?.appendChild(clone);
      clone.setPointerCapture(event.pointerId);

      // const target = clone.hasPointerCapture(event.pointerId) ? clone : document.body;
      const target = document.body;
      const abort = new AbortController();

      target.addEventListener(
        "pointermove",
        (event: PointerEvent) => {
          clone.style.left = `${event.x}px`;
          clone.style.top = `${event.y}px`;
          clone.style.translate = `-${clone.clientWidth}px -${clone.clientHeight}px`;

          const elements = document.elementsFromPoint(event.x - clone.clientWidth / 2, event.y - clone.clientHeight / 2);
          const acceptor = elements.find((element) => element.hasAttribute(dataKey));
          if (acceptor) {
            clone.style.cursor = "grabbing";
          } else {
            ``;
            clone.style.cursor = "no-drop";
          }
        },
        abort
      );

      target.addEventListener(
        "pointerup",
        (event: PointerEvent) => {
          original.style.opacity = "unset";

          const elements = document.elementsFromPoint(event.x - clone.clientWidth / 2, event.y - clone.clientHeight / 2);
          const acceptor = elements.find((element) => element.hasAttribute(dataKey));
          if (acceptor) {
            const dataTransfer = new DataTransfer();
            dataTransfer.setData(key, value);
            const drop = new DragEvent("drop", { dataTransfer, bubbles: true, cancelable: true, composed: true });
            acceptor.dispatchEvent(drop);
            callback();
          }

          clone.remove();
          abort.abort();
        },
        abort
      );
    },
    [callback]
  );

  return {
    onPointerDown,
    style: { touchAction: "none" },
  };
}

export function useDroppableAlt<K extends `data-${string}`, V extends string>(key: string, dataKey: K, callback: (value: V) => void): StyleHTMLAttributes<HTMLElement> {
  const onDrop = useCallback(
    async (event: ReactDragEvent<HTMLElement>) => {
      if (event.dataTransfer.types.includes(key)) {
        event.preventDefault();
        callback(event.dataTransfer.getData(key) as V);
      }
    },
    [callback]
  );

  return { onDrop, [dataKey]: true };
}
