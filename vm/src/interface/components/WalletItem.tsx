import { MoneyLike } from "@/domain/entities/money";
import { DragEvent } from "react";

export const MoneyLikeDragDataType = "text/money-like";

export type WalletItem = [symbol: Symbol, moneyLike: MoneyLike];

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

  return (
    <div
      title={moneyLike}
      style={{
        display: "inline-block",
        margin: 5,
        width: 30,
        height: 30,
        fontSize: "10px",
        borderRadius: "50%",
        overflow: "hidden",
        background: "gray",
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
