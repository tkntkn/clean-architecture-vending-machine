import { detectMoneyType, Money, MoneyType } from "@/domain/entities/money";
import { assertNever } from "@/utils/SwitchCaseHelper";

export type InsertionState = "inserted" | "invalid";

export type InsertState = {
  stock: { add(type: MoneyType, money: Money): void };
  state: { set(message: InsertionState): void };
};

export function insertMoney(moneyLike: string, { stock, state }: InsertState) {
  const detected = detectMoneyType(moneyLike);
  if (detected) {
    const { type, money } = detected;
    stock.add(type, money);
    state.set("inserted");
  } else {
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
