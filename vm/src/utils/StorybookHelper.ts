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
