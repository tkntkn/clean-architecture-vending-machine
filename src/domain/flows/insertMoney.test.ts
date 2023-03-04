import { MoneyType } from "@/domain/entities/money";
import { insertMoney, InsertMoneyState } from "@/domain/flows/insertMoney";
import { expect, test, vi } from "vitest";

test("insert works correctly", async () => {
  const stockAdd = vi.fn();
  const returnSlotPut = vi.fn();

  const state: InsertMoneyState = {
    stock: { add: stockAdd },
    returnSlot: { put: returnSlotPut },
  };

  await insertMoney("invalid money", state);
  expect(returnSlotPut).toBeCalledWith("invalid money");
  expect(stockAdd).toBeCalledTimes(0);
  expect(returnSlotPut).toBeCalledTimes(1);

  await insertMoney("100円玉: valid money", state);
  expect(stockAdd).toBeCalledWith(MoneyType.OneHundred, "100円玉: valid money");
  expect(stockAdd).toBeCalledTimes(1);
  expect(returnSlotPut).toBeCalledTimes(1);
});
