import { range } from "@/utils/ArrayHelper";
import { getElementClientCenter } from "@/utils/ElementHelper";
import { timer } from "@/utils/PromiseHelper";
import { Vector } from "@/utils/Vector";
import { fireEvent } from "@storybook/testing-library";

export function dragAndDrop(element: Element, destination: Element) {
  // Ref. For those who also want to emulate mouse position and mouse events
  // https://github.com/testing-library/user-event/issues/440
  // https://github.com/testing-library/testing-library-docs/blob/96380af26420bf1941d5ebfaf6253882c0b764a1/docs/example-drag.mdx#code

  // Disable official DataTransfer support which undesirably clones DataTransfer on each event
  // https://github.com/testing-library/dom-testing-library/blob/d1ff4954992d5270f8f8899d4faa6047b7e6f43f/src/events.js#L72
  // Related PR: https://github.com/testing-library/dom-testing-library/pull/858
  const _DataTransfer = window.DataTransfer;
  window.DataTransfer = undefined as any;

  try {
    const dataTransfer = new _DataTransfer();

    Object.defineProperty(dataTransfer, "effectAllowed", { writable: true });
    fireEvent.dragStart(element, { dataTransfer });
    Object.defineProperty(dataTransfer, "effectAllowed", { writable: false });

    fireEvent.drag(element, { dataTransfer });

    Object.defineProperty(dataTransfer, "dropEffect", { writable: true });
    fireEvent.dragEnter(destination, { dataTransfer });
    fireEvent.dragOver(destination, { dataTransfer });
    Object.defineProperty(dataTransfer, "dropEffect", { writable: false });

    fireEvent.drop(destination, { dataTransfer });
    fireEvent.dragEnd(element, { dataTransfer });
    return Promise.resolve();
  } finally {
    window.DataTransfer = _DataTransfer;
  }
}

const client = (v: Vector) => ({ clientX: v.x, clientY: v.y });

export async function dragAndDropPointer(element: Element, destination: Element) {
  const pointerId = 1;
  const pointerType = "touch";

  const { width, height } = element.getBoundingClientRect();
  const size = new Vector(width, height);
  const from = Vector.from(getElementClientCenter(element)).add(size.div(2));
  const to = Vector.from(getElementClientCenter(destination)).add(size.div(2));

  let capturing: Element | undefined = undefined;
  const handlePointerCapture = (event: PointerEvent) => {
    if (event.pointerId === pointerId) {
      capturing = event.target as Element;
    }
  };
  const eventTarget = (defaults: Element) => capturing ?? defaults;

  fireEvent.pointerMove(eventTarget(element), { ...client(from), pointerType, pointerId, isPrimary: true });
  fireEvent.pointerDown(eventTarget(element), { ...client(from), pointerType, pointerId, isPrimary: true });
  fireEvent.pointerLeave(eventTarget(element), { ...client(from), pointerId });
  await timer(50);
  const count = 5;
  for (const i of range(count)) {
    const point = from.mul((count - i) / count).add(to.mul(i / count));
    fireEvent.pointerMove(eventTarget(element), { ...client(point), pointerId, isPrimary: true });
    await timer(50);
  }
  fireEvent.pointerMove(eventTarget(element), { ...client(to), pointerId, isPrimary: true });
  fireEvent.pointerEnter(eventTarget(destination), { ...client(to), pointerId });
  fireEvent.pointerOver(eventTarget(destination), { ...client(to), pointerId });
  await timer(50);
  fireEvent.pointerUp(eventTarget(destination), { ...client(to), pointerId });
  await timer(50);
  element.getRootNode().removeEventListener("gotpointercapture", handlePointerCapture as any);

  return Promise.resolve();
}
