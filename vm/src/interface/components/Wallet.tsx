import { MoneyLike } from "@/domain/entities/money";
import { WalletItem } from "@/interface/components/WalletItem";
import { remove } from "@/utils/ArrayHelper";
import { useCallback, useMemo } from "react";

export const MoneyLikeDragDataType = "text/money-like";

export function Wallet({ moneyLikes, onUpdate }: { moneyLikes: MoneyLike[]; onUpdate: (moneyLikes: MoneyLike[]) => void }) {
  const items = useMemo(() => moneyLikes.map((moneyLike) => [Symbol(), moneyLike] as WalletItem), [moneyLikes]);
  const handleTakeOut = useCallback(([targetSymbol]: WalletItem) => onUpdate(remove(items, ([symbol]) => symbol === targetSymbol).map(([_, moneyLike]) => moneyLike)), [items]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {items.map((item, index) => (
        <WalletItem key={index} item={item} onTakeOut={handleTakeOut} />
      ))}
    </div>
  );
}
