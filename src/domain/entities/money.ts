import { Nominal, ToNominal } from "@/utils/nominal";

export type Money = Nominal<string, "Money">;
export type MoneyLike = string;
const ToMoney = ToNominal<string, "Money">;
export type MoneyValue = 10 | 50 | 100 | 500 | 1000;
export type MoneyType = Nominal<{ value: MoneyValue }, "MoneyType">;
const ToMoneyType = ToNominal<{ value: MoneyValue }, "MoneyType">;

export const MoneyType = {
  Ten: ToMoneyType({ value: 10 }),
  Fifty: ToMoneyType({ value: 50 }),
  OneHundred: ToMoneyType({ value: 100 }),
  FiveHundred: ToMoneyType({ value: 500 }),
  OneThousand: ToMoneyType({ value: 1000 }),
} as const;

export const MoneyTypeMap = new Map(Object.values(MoneyType).map(type => [type.value, type]));

export const allMoneyTypes = Object.values(MoneyType);

export function detectMoneyType(moneyLike: string): { type: MoneyType; money: Money } | undefined {
  if (moneyLike.startsWith("10円玉")) {
    return { type: MoneyType.Ten, money: ToMoney(moneyLike) };
  }
  if (moneyLike.startsWith("50円玉")) {
    return { type: MoneyType.Fifty, money: ToMoney(moneyLike) };
  }
  if (moneyLike.startsWith("100円玉")) {
    return { type: MoneyType.OneHundred, money: ToMoney(moneyLike) };
  }
  if (moneyLike.startsWith("500円玉")) {
    return { type: MoneyType.FiveHundred, money: ToMoney(moneyLike) };
  }
  if (moneyLike.startsWith("1000円札")) {
    return { type: MoneyType.OneThousand, money: ToMoney(moneyLike) };
  }
  return undefined;
}
