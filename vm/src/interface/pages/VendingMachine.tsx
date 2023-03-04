import { Money, MoneyLike, MoneyType } from "@/domain/entities/money";
import { earnMoney } from "@/domain/flows/earnMoney";
import { insertMoney } from "@/domain/flows/insertMoney";
import { returnMoney } from "@/domain/flows/returnMoney";
import { Wallet } from "@/interface/components/Wallet";
import { useWalletItemDroppable } from "@/interface/components/WalletItem";
import { useArrayState } from "@/utils/hooks";
import { sum } from "@/utils/MathHelper";
import { FormEvent, useCallback, useMemo, useState } from "react";

export function VendingMachine(props: {}) {
  const [inserted, setInserted, pushInserted] = useArrayState<[MoneyType, Money]>();
  const [returnSlot, setReturnSlot] = useArrayState<MoneyLike>([]);
  const [wallet, setWallet, pushWallet] = useArrayState<MoneyLike>([]);

  const insert = useCallback(async (moneyLike: MoneyLike) => {
    if (!moneyLike) return;
    document.body.style.cursor = "progress";
    await insertMoney(moneyLike, {
      stock: { add: (type, money) => pushInserted([type, money]) },
      returnSlot: { put: (money) => setReturnSlot((slot) => slot.concat(money)) },
    });
    document.body.style.cursor = "unset";
  }, []);

  const earn = useCallback((moneyLike: MoneyLike) => {
    if (!moneyLike) return;
    earnMoney(moneyLike, {
      wallet: { add: (money) => pushWallet(money) },
    });
  }, []);

  const [moneyLike, setMoneyLike] = useState("");

  const handleEarn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    earn(moneyLike);
    setMoneyLike("");
  };

  const handleReturn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    returnMoney({
      stock: { takeAll: () => (setInserted([]), inserted) },
      returnSlot: { putAll: (moneys) => setReturnSlot((slot) => slot.concat(...moneys)) },
    });
  };

  const insertDropHandlers = useWalletItemDroppable(insert);

  const totalInsertedAmount = useMemo(() => {
    return sum(inserted.map(([type]) => type.value));
  }, [inserted]);

  return (
    <div className="VendingMachine">
      <h2>Vending Machine</h2>
      <div {...insertDropHandlers}>
        <div
          title="insert"
          style={{
            height: "100px",
            width: "100px",
            margin: "auto",
            border: "solid 1px black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "lightgray",
          }}
        >
          <div
            style={{
              height: "10px",
              width: "100px",
              border: "solid 1px black",
              borderRadius: "3px",
              backgroundColor: "white",
            }}
          ></div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>
          Inserted: <span data-testid="inserted">{totalInsertedAmount}円</span>
        </p>
        <span style={{ display: "inline-block", width: "10px" }} />
        <form onSubmit={handleReturn}>
          <button data-testid="return" type="submit">
            Return
          </button>
        </form>
      </div>
      <h2>Return Slot</h2>
      <div data-testid="returnSlot">
        <Wallet data-testid="returnSlot" moneyLikes={returnSlot} onUpdate={setReturnSlot} />
      </div>
      <div>
        <h2>Wallet</h2>
        <div data-testid="wallet">
          <Wallet moneyLikes={wallet} onUpdate={setWallet} droppable />
        </div>
        <form onSubmit={handleEarn}>
          <input data-testid="earning" type="text" value={moneyLike} onChange={(event) => setMoneyLike(event.target.value)} />
          <button type="submit">Earn</button>
        </form>
      </div>
    </div>
  );
}
