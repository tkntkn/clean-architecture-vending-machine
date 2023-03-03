import { detectMoneyType, Money, MoneyLike, MoneyType } from "@/domain/entities/money";
import { assertNever } from "@/utils/SwitchCaseHelper";

export type InsertionState = "inserted" | "invalid";

export type InsertMoneyState = {
  stock: { add(type: MoneyType, money: Money): void };
  state: { set(message: InsertionState): void };
  returnSlot: { put(money: MoneyLike): void };
};

export function insertMoney(moneyLike: string, { stock, state, returnSlot }: InsertMoneyState) {
  const detected = detectMoneyType(moneyLike);
  if (detected) {
    const { type, money } = detected;
    stock.add(type, money);
    state.set("inserted");
  } else {
    returnSlot.put(moneyLike);
    state.set("invalid");
  }
}

export function getInsertionStatusMessage(state: InsertionState) {
  switch (state) {
    case "inserted":
      return "Inserted.";
    case "invalid":
      return "Invalid Money.";
    default:
      assertNever(state);
  }
}
