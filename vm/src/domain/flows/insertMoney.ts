import { detectMoneyType, Money, MoneyLike, MoneyType } from "@/domain/entities/money";
import { assertNever } from "@/utils/SwitchCaseHelper";

export type InsertionState = "inserted" | "invalid";

export type InsertMoneyState = {
  stock: { add(type: MoneyType, money: Money): void };
  returnSlot: { put(money: MoneyLike): void };
};

export function insertMoney(moneyLike: string, { stock, returnSlot }: InsertMoneyState) {
  const detected = detectMoneyType(moneyLike);
  if (detected) {
    const { type, money } = detected;
    stock.add(type, money);
  } else {
    returnSlot.put(moneyLike);
  }
}
