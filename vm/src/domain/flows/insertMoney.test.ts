import { MoneyType } from "@/domain/entities/money";
import { insertMoney, InsertMoneyState } from "@/domain/flows/insertMoney";
import { expect, test, vi } from "vitest";

test("insert works correctly", () => {
  const stockAdd = vi.fn();
  const stateSet = vi.fn();
  const returnSlotPut = vi.fn();

  const InsertState: InsertMoneyState = {
    stock: { add: stockAdd },
    state: { set: stateSet },
    returnSlot: { put: returnSlotPut },
  };

  insertMoney("invalid money", InsertState);
  expect(stateSet).toBeCalledWith("invalid");
  expect(returnSlotPut).toBeCalledWith("invalid money");
  expect(stateSet).toBeCalledTimes(1);
  expect(stockAdd).toBeCalledTimes(0);
  expect(returnSlotPut).toBeCalledTimes(1);

  insertMoney("100円玉: valid money", InsertState);
  expect(stateSet).toBeCalledWith("inserted");
  expect(stockAdd).toBeCalledWith(MoneyType.OneHundred, "100円玉: valid money");
  expect(stateSet).toBeCalledTimes(2);
  expect(stockAdd).toBeCalledTimes(1);
  expect(returnSlotPut).toBeCalledTimes(1);
});
