import { detectMoneyType, Money, MoneyLike, MoneyType } from "@/domain/entities/money";
import { timer } from "@/utils/PromiseHelper";
import { assertNever } from "@/utils/SwitchCaseHelper";

export type InsertionState = "inserted" | "invalid";

export type InsertMoneyState = {
  stock: { add(type: MoneyType, money: Money): void };
  returnSlot: { put(money: MoneyLike): void };
};

export async function insertMoney(moneyLike: string, { stock, returnSlot }: InsertMoneyState) {
  const detected = detectMoneyType(moneyLike);
  await timer(500);
  if (detected) {
    const { type, money } = detected;
    stock.add(type, money);
  } else {
    returnSlot.put(moneyLike);
  }
}
