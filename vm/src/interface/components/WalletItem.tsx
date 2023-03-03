import "./WalletItem.css";
import { MoneyLike } from "@/domain/entities/money";
import { DragEvent, useCallback } from "react";

export const MoneyLikeDragDataType = "text/money-like";

export type WalletItem = [Symbol, MoneyLike];

export function WalletItem({ item, onTakeOut }: { item: WalletItem; onTakeOut: (item: WalletItem) => void }) {
  const [_, moneyLike] = item;

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(MoneyLikeDragDataType, moneyLike);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.dropEffect === "move") {
      onTakeOut(item);
    }
  };

  if (moneyLike.includes("玉")) {
    return (
      <div
        title={moneyLike}
        style={{
          display: "inline-block",
          cursor: "pointer",
          margin: 5,
          width: 30,
          height: 30,
          fontSize: "10px",
          borderRadius: "50%",
          overflow: "hidden",
          background: "silver",
          whiteSpace: "nowrap",
          textOverflow: "clip",
          lineHeight: "30px",
        }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <span style={{ visibility: "hidden" }}>{moneyLike}</span>
      </div>
    );
  }

  if (moneyLike.includes("札")) {
    return (
      <div
        title={moneyLike}
        style={{
          display: "inline-block",
          cursor: "pointer",
          margin: 5,
          width: 40,
          height: 25,
          fontSize: "10px",
          overflow: "hidden",
          background: "gold",
          whiteSpace: "nowrap",
          textOverflow: "clip",
          lineHeight: "30px",
        }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <span style={{ visibility: "hidden" }}>{moneyLike}</span>
      </div>
    );
  }

  return (
    <div
      className="WalletItem-unknownItem"
      title={moneyLike}
      style={{
        display: "inline-block",
        margin: 5,
        width: 30,
        height: 30,
        fontSize: "10px",
        borderRadius: "50%",
        outline: "dashed 3px black",
        outlineOffset: "-3px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "clip",
        lineHeight: "30px",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span style={{ visibility: "hidden" }}>{moneyLike}</span>
    </div>
  );
}

export function useWalletItemDropHandlers<E extends Element>(callback: (moneyLike: MoneyLike) => void) {
  const onDragEnter = useCallback((event: DragEvent<E>) => {
    if (event.dataTransfer.types.includes(MoneyLikeDragDataType)) {
      event.dataTransfer.dropEffect = "move";
      event.preventDefault();
    }
  }, []);

  const onDragOver = useCallback((event: DragEvent<E>) => {
    if (event.dataTransfer.types.includes(MoneyLikeDragDataType)) {
      event.dataTransfer.dropEffect = "move";
      event.preventDefault();
    }
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<E>) => {
      if (event.dataTransfer.types.includes(MoneyLikeDragDataType)) {
        event.preventDefault();
        const moneyLike = event.dataTransfer.getData(MoneyLikeDragDataType);
        callback(moneyLike);
      }
    },
    [callback]
  );

  return { onDragEnter, onDragOver, onDrop };
}
