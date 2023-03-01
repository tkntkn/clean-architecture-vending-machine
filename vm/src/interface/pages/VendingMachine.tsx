import { FormEvent, useMemo, useState } from "react";
import "@/interface/pages/Root.css";
import { Money, MoneyType } from "@/domain/entities/money";
import { getInsertionStatusMessage, insertMoney, InsertionState } from "@/domain/flows/insertMoney";
import { useArrayRecord } from "@/utils/hooks";

export function VendingMachine(props: {}) {
  const [insertionState, setInsertionState] = useState<InsertionState>();
  const [insertedMoneyStock, addToInsertedMoneyStock, clearInsertedMoneyStock] = useArrayRecord<MoneyType["value"], Money>();

  const [money, setMoney] = useState("");
  const handleInsert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    insertMoney(money, {
      stock: { add: (type, money) => addToInsertedMoneyStock(type.value, money) },
      state: { set: setInsertionState },
    });
  };

  const totalInsertedAmount = useMemo(() => {
    let total = 0;
    for (const [value, moneys] of Object.entries(insertedMoneyStock)) {
      total += parseInt(value) * moneys.length;
    }
    return total;
  }, [insertedMoneyStock]);

  return (
    <div className="VendingMachine">
      {insertionState && <p>{getInsertionStatusMessage(insertionState)}</p>}
      <form onSubmit={handleInsert}>
        <input type="text" value={money} onChange={(event) => setMoney(event.target.value)} />
        <button type="submit">Insert</button>
      </form>
      <p>Inserted: {totalInsertedAmount}yen</p>
    </div>
  );
}
