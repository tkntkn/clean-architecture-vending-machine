import { Money, MoneyLike, MoneyType } from "@/domain/entities/money";
import { insertMoney, InsertionState, InsertMoneyState } from "@/domain/flows/insertMoney";
import { expect, test } from "vitest";

test("insert works correctly", () => {
  const stock: [MoneyType, Money][] = [];
  const returnSlot: MoneyLike[] = [];
  let state: InsertionState | undefined = undefined;

  const InsertState: InsertMoneyState = {
    stock: { add: (type, money) => stock.push([type, money]) },
    state: { set: (newState) => (state = newState) },
    returnSlot: { put: (money) => returnSlot.push(money) },
  };

  insertMoney("invalid money", InsertState);

  expect(state).toBe("invalid");
  expect(stock).toHaveLength(0);
  expect(returnSlot).toEqual(["invalid money"]);

  insertMoney("100円玉: valid money", InsertState);
  expect(state).toBe("inserted");
  expect(stock).toHaveLength(1);
  expect(returnSlot).toEqual(["invalid money"]);
});
