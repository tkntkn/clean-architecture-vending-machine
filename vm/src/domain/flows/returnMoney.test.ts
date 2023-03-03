import { detectMoneyType } from "@/domain/entities/money";
import { returnMoney, ReturnMoneyState } from "@/domain/flows/returnMoney";
import { expect, test, vi } from "vitest";

test("return works correctly", () => {
  const m1 = detectMoneyType("10円玉！")!;
  const m2 = detectMoneyType("100円玉！！")!;
  const m3 = detectMoneyType("50円玉！！！")!;
  const m4 = detectMoneyType("10円玉！")!;

  const stockTakeAll = vi.fn(
    () =>
      [
        [m1.type, m1.money],
        [m2.type, m2.money],
        [m3.type, m3.money],
        [m4.type, m4.money],
      ] as ReturnType<ReturnMoneyState["stock"]["takeAll"]>
  );

  const returnSlotPutAll = vi.fn();

  const state: ReturnMoneyState = {
    stock: { takeAll: stockTakeAll },
    returnSlot: { putAll: returnSlotPutAll },
  };

  returnMoney(state);
  expect(stockTakeAll).toBeCalledWith();
  expect(returnSlotPutAll).toBeCalledWith([m1.money, m2.money, m3.money, m4.money]);
  expect(stockTakeAll).toBeCalledTimes(1);
  expect(returnSlotPutAll).toBeCalledTimes(1);
});
