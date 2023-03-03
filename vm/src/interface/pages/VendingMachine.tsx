import { DragEvent, FormEvent, useMemo, useState } from "react";
import { Money, MoneyLike, MoneyType } from "@/domain/entities/money";
import { getInsertionStatusMessage, insertMoney, InsertionState } from "@/domain/flows/insertMoney";
import { useArrayState } from "@/utils/hooks";
import { returnMoney } from "@/domain/flows/returnMoney";
import { sum } from "@/utils/MathHelper";
import { MoneyLikeDragDataType } from "@/interface/components/WalletItem";
import { Wallet } from "@/interface/components/Wallet";

export function VendingMachine(props: {}) {
  const [insertionState, setInsertionState] = useState<InsertionState>();
  const [inserted, setInserted, pushInserted] = useArrayState<[MoneyType, Money]>();
  const [returnSlot, setReturnSlot] = useArrayState<MoneyLike>([]);

  const [moneyLike, setMoneyLike] = useState("");

  const handleInsert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    insertMoney(moneyLike, {
      stock: { add: (type, money) => pushInserted([type, money]) },
      state: { set: setInsertionState },
      returnSlot: { put: (money) => setReturnSlot((slot) => slot.concat(money)) },
    });
    setMoneyLike("");
  };

  const handleReturn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    returnMoney({
      stock: { takeAll: () => (setInserted([]), inserted) },
      returnSlot: { putAll: (moneys) => setReturnSlot((slot) => slot.concat(...moneys)) },
    });
  };

  const totalInsertedAmount = useMemo(() => {
    return sum(inserted.map(([type]) => type.value));
  }, [inserted]);

  const handleInsertDragEnter = (event: DragEvent<HTMLFormElement>) => {
    if (event.dataTransfer.types.includes(MoneyLikeDragDataType)) {
      event.dataTransfer.dropEffect = "move";
      event.preventDefault();
    }
  };

  const handleInsertDragOver = (event: DragEvent<HTMLFormElement>) => {
    if (event.dataTransfer.types.includes(MoneyLikeDragDataType)) {
      event.dataTransfer.dropEffect = "move";
      event.preventDefault();
    }
  };

  const handleInsertDrop = (event: DragEvent<HTMLFormElement>) => {
    if (event.dataTransfer.types.includes(MoneyLikeDragDataType)) {
      event.preventDefault();
      const moneyLike = event.dataTransfer.getData(MoneyLikeDragDataType);
      insertMoney(moneyLike, {
        stock: { add: (type, money) => pushInserted([type, money]) },
        state: { set: setInsertionState },
        returnSlot: { put: (money) => setReturnSlot((slot) => slot.concat(money)) },
      });
    }
  };

  return (
    <div className="VendingMachine">
      <h2>Message</h2>
      <p>{(insertionState && getInsertionStatusMessage(insertionState)) ?? "Hello."}</p>
      <form onSubmit={handleInsert} onDragEnter={handleInsertDragEnter} onDragOver={handleInsertDragOver} onDrop={handleInsertDrop}>
        <input data-testid="money" type="text" value={moneyLike} onChange={(event) => setMoneyLike(event.target.value)} />
        <button data-testid="insert" type="submit">
          Insert
        </button>
      </form>
      <h2>Inserted</h2>
      <p data-testid="inserted">{totalInsertedAmount}円</p>
      <form onSubmit={handleReturn}>
        <button data-testid="return" type="submit">
          Return
        </button>
      </form>
      <h2>Return Slot</h2>
      <div data-testid="returnSlot">
        <Wallet moneyLikes={returnSlot} onUpdate={setReturnSlot} />
      </div>
    </div>
  );
}
