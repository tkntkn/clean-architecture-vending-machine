import { MoneyLike } from "@/domain/entities/money";
import { useWalletItemDroppable, WalletItem } from "@/interface/components/WalletItem";
import { isEqual, remove } from "@/utils/ArrayHelper";
import { useImmediateState } from "@/utils/hooks";
import { useCallback, useEffect } from "react";

export function Wallet({ moneyLikes, onUpdate, droppable }: { moneyLikes: MoneyLike[]; onUpdate: (moneyLikes: MoneyLike[]) => void; droppable?: boolean }) {
  const [getItems, setItems] = useImmediateState<WalletItem[]>([]);

  useEffect(() => {
    const previous = getItems().map((item) => item[1]);
    if (!isEqual(moneyLikes, previous)) {
      setItems(moneyLikes.map((moneyLike) => [Symbol(), moneyLike] as WalletItem));
    }
  }, [moneyLikes]);

  const onDrop = useCallback(
    (moneyLike: MoneyLike) => {
      setItems(getItems().concat([[Symbol(), moneyLike]]));
      onUpdate(getItems().map((item) => item[1]));
    },
    [onUpdate]
  );

  const onRemove = useCallback((target: WalletItem) => {
    setItems(remove(getItems(), (item) => item === target));
    onUpdate(getItems().map((item) => item[1]));
  }, []);

  const walletItemDroppable = useWalletItemDroppable(onDrop);
  const dropHandlers = droppable ? walletItemDroppable : {};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        border: "solid 3px gray",
        height: 100,
      }}
      {...dropHandlers}
    >
      {getItems().map((item, index) => (
        <WalletItem key={index} item={item} onTakeOut={onRemove} />
      ))}
    </div>
  );
}
