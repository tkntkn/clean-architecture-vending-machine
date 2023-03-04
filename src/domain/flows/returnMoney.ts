import { Money, MoneyLike, MoneyType } from "@/domain/entities/money";

export type ReturnMoneyState = {
  stock: { takeAll(): [type: MoneyType, money: Money][] };
  returnSlot: { putAll(money: MoneyLike[]): void };
};

export function returnMoney({ stock, returnSlot }: ReturnMoneyState) {
  const popped = stock.takeAll();
  returnSlot.putAll(popped.map(([_, money]) => money));
}
