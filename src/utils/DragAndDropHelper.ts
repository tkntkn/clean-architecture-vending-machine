type Effect = DataTransfer["dropEffect"];
type DataAttr = `data-${string}`;

function createDropEvent(type: "drop") {
  return new DragEvent(type, {
    dataTransfer: new DataTransfer(),
    bubbles: true,
    cancelable: true,
    composed: true,
  });
}

export function getDraggableHandler<V extends string>(
  dataKey: string,
  value: V,
  effect: Effect,
  callback: () => void
) {
  const draggable = true as const;

  const onDragStart = (event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.setData(dataKey, value);
      event.dataTransfer.effectAllowed = effect;
    }
  };

  const onDragEnd = (event: DragEvent) => {
    if (
      event.dataTransfer?.types.includes(dataKey) &&
      event.dataTransfer.dropEffect === effect
    ) {
      event.preventDefault();
      callback();
    }
  };

  return {
    draggable,
    onDragStart,
    onDragEnd,
  };
}

export function getDroppableHandler<V extends string>(
  dataKey: string,
  effect: Effect,
  callback: (value: V) => void
) {
  const onDragEnter = (event: DragEvent) => {
    if (event.dataTransfer?.types.includes(dataKey)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = effect;
    }
  };

  const onDragOver = (event: DragEvent) => {
    if (event.dataTransfer?.types.includes(dataKey)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = effect;
    }
  };

  const onDrop = (event: DragEvent) => {
    if (event.dataTransfer?.types.includes(dataKey)) {
      event.preventDefault();
      callback(event.dataTransfer.getData(dataKey) as V);
    }
  };

  return { onDragEnter, onDragOver, onDrop };
}

export function getPointerDraggableHandler<
  K extends DataAttr,
  V extends string
>(dataKey: string, dataAttr: K, value: V, callback: () => void) {
  const onPointerDown = (event: PointerEvent) => {
    event.preventDefault();
    const original = event.currentTarget;
    if (!(original instanceof HTMLElement)) {
      return;
    }
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

    const findAcceptor = (event: PointerEvent) => {
      const elements = document.elementsFromPoint(
        event.x - clone.clientWidth / 2,
        event.y - clone.clientHeight / 2
      );
      return elements.find((element) => element.hasAttribute(dataAttr));
    };

    target.addEventListener(
      "pointermove",
      (event: PointerEvent) => {
        clone.style.left = `${event.x - clone.clientWidth}px`;
        clone.style.top = `${event.y - clone.clientHeight}px`;

        const acceptor = findAcceptor(event);
        if (acceptor) {
          clone.style.cursor = "grabbing";
        } else {
          clone.style.cursor = "no-drop";
        }
      },
      abort
    );

    target.addEventListener(
      "pointerup",
      (event: PointerEvent) => {
        original.style.opacity = "unset";

        const acceptor = findAcceptor(event);
        if (acceptor) {
          const drop = createDropEvent("drop");
          drop.dataTransfer?.setData(dataKey, value);
          acceptor.dispatchEvent(drop);
          callback();
        }

        clone.remove();
        abort.abort();
      },
      abort
    );
  };

  return {
    onPointerDown,
    style: { touchAction: "none" },
  };
}

export function getPointerDroppableHandler<
  K extends DataAttr,
  V extends string
>(dataKey: string, dataAttr: K, callback: (value: V) => void) {
  const onDrop = (event: DragEvent) => {
    if (event.dataTransfer?.types.includes(dataKey)) {
      event.preventDefault();
      callback(event.dataTransfer.getData(dataKey) as V);
    }
  };

  return { onDrop, [dataAttr]: true };
}
