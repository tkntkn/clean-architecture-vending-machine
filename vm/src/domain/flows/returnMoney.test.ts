import { detectMoneyType, Money, MoneyLike, MoneyType } from "@/domain/entities/money";
import { returnMoney, ReturnMoneyState } from "@/domain/flows/returnMoney";
import { expect, test } from "vitest";

test("return works correctly", () => {
  const m1 = detectMoneyType("10円玉！")!;
  const m2 = detectMoneyType("100円玉！！")!;
  const m3 = detectMoneyType("50円玉！！！")!;
  const m4 = detectMoneyType("10円玉！")!;

  const stock: [MoneyType, Money][] = [
    [m1.type, m1.money],
    [m2.type, m2.money],
    [m3.type, m3.money],
    [m4.type, m4.money],
  ];

  const returnSlot: MoneyLike[] = [];

  const state: ReturnMoneyState = {
    stock: { takeAll: () => stock.splice(0, stock.length) },
    returnSlot: { putAll: (moneys: MoneyLike[]) => returnSlot.push(...moneys) },
  };

  returnMoney(state);
  expect(stock).toEqual([]);
  expect(returnSlot.slice().sort()).toEqual([m1.money, m2.money, m3.money, m4.money].slice().sort());
});
