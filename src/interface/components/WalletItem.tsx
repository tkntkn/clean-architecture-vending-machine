import { MoneyLike } from "@/domain/entities/money";
import {
  getPointerDraggableHandler,
  getPointerDroppableHandler,
} from "@/utils/DragAndDropHelper";
import { StyleHTMLAttributes, useCallback, useMemo } from "react";
import "./WalletItem.css";

const DataType = "text/money-like";
const DataAttr = "data-accept-money-like";

export type WalletItem = [Symbol, MoneyLike];

export function WalletItem({
  item,
  onTakeOut,
}: {
  item: WalletItem;
  onTakeOut: (item: WalletItem) => void;
}) {
  const [_, moneyLike] = item;

  const onDragEnd = useCallback(() => onTakeOut(item), [onTakeOut, item]);
  const handlers = useMemo(
    () => getPointerDraggableHandler(DataType, DataAttr, moneyLike, onDragEnd),
    [moneyLike, onDragEnd]
  ) as unknown as StyleHTMLAttributes<HTMLDivElement>;

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

export function useWalletItemDroppable(
  callback: (moneyLike: MoneyLike) => void
) {
  return useMemo(
    () => getPointerDroppableHandler(DataType, DataAttr, callback),
    [callback]
  ) as unknown as StyleHTMLAttributes<HTMLDivElement>;
}
