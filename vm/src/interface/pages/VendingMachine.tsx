import { Money, MoneyLike, MoneyType } from "@/domain/entities/money";
import { earnMoney } from "@/domain/flows/earnMoney";
import { insertMoney } from "@/domain/flows/insertMoney";
import { returnMoney } from "@/domain/flows/returnMoney";
import { Wallet } from "@/interface/components/Wallet";
import { useWalletItemDropHandlers } from "@/interface/components/WalletItem";
import { useArrayState } from "@/utils/hooks";
import { sum } from "@/utils/MathHelper";
import { FormEvent, useCallback, useMemo, useState } from "react";

export function VendingMachine(props: {}) {
  const [inserted, setInserted, pushInserted] = useArrayState<[MoneyType, Money]>();
  const [returnSlot, setReturnSlot] = useArrayState<MoneyLike>([]);
  const [wallet, setWallet, pushWallet] = useArrayState<MoneyLike>([]);

  const insert = useCallback((moneyLike: MoneyLike) => {
    if (!moneyLike) return;
    insertMoney(moneyLike, {
      stock: { add: (type, money) => pushInserted([type, money]) },
      returnSlot: { put: (money) => setReturnSlot((slot) => slot.concat(money)) },
    });
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

  const insertDropHandlers = useWalletItemDropHandlers<HTMLDivElement>(insert);
  const walletDropHandlers = useWalletItemDropHandlers<HTMLDivElement>(earn);

  const totalInsertedAmount = useMemo(() => {
    return sum(inserted.map(([type]) => type.value));
  }, [inserted]);

  return (
    <div className="VendingMachine">
      <div {...insertDropHandlers}>
        <h2>Insert</h2>
        <div
          style={{
            height: "50px",
            width: "50px",
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
              width: "50px",
              border: "solid 1px black",
              borderRadius: "5px 5px",
              backgroundColor: "white",
            }}
          ></div>
        </div>
      </div>
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
      <div {...walletDropHandlers}>
        <h2>Wallet</h2>
        <div data-testid="wallet">
          <Wallet moneyLikes={wallet} onUpdate={setWallet} />
        </div>
        <form onSubmit={handleEarn}>
          <input data-testid="earning" type="text" value={moneyLike} onChange={(event) => setMoneyLike(event.target.value)} />
          <button type="submit">Earn</button>
        </form>
      </div>
    </div>
  );
}
