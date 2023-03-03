import { MoneyLike } from "@/domain/entities/money";

export type InsertionState = "inserted" | "invalid";

export type EarnMoneyState = {
  wallet: { add(moneyLike: MoneyLike): void };
};

export function earnMoney(moneyLike: string, { wallet }: EarnMoneyState) {
  wallet.add(moneyLike);
}
