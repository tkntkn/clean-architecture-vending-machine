import "./WalletItem.css";
import { Money, MoneyLike } from "@/domain/entities/money";
import { DragEvent as ReactDragEvent, PointerEvent as ReactPointerEvent, StyleHTMLAttributes, useCallback, useState } from "react";
import { timer } from "@/utils/PromiseHelper";
import { useDraggableAlt, useDroppableAlt } from "@/utils/DragAndDropHelper";

const MoneyLikeDragDataType = "text/money-like";
const MoneyLikeAcceptData = "data-accept-money-like";

export type WalletItem = [Symbol, MoneyLike];

export function WalletItem({ item, onTakeOut }: { item: WalletItem; onTakeOut: (item: WalletItem) => void }) {
  const [_, moneyLike] = item;

  const onDragEnd = useCallback(() => onTakeOut(item), [onTakeOut, item]);
  const handlers = useDraggableAlt(MoneyLikeDragDataType, MoneyLikeAcceptData, moneyLike, onDragEnd);

  // prettier-ignore
  const className = 
    moneyLike.includes("玉") ? "WalletItem--coin" :
    moneyLike.includes("札") ? "WalletItem--bill" :
    "WalletItem--unknown";

  return (
    <div className={className} title={moneyLike} {...handlers}>
      <span style={{ visibility: "hidden" }}>{moneyLike}</span>
    </div>
  );
}

export function useWalletItemDroppable(callback: (moneyLike: MoneyLike) => void) {
  return useDroppableAlt(MoneyLikeDragDataType, MoneyLikeAcceptData, callback);
}
