import { MoneyType, Money, detectMoneyType } from "./money";

export type MoneyStock = {
  type: MoneyType;
  items: Money[];
};

export const createMoneyStock = (type: MoneyType) => ({ type, items: [] });

export function calculateStockValue(stock: MoneyStock) {
  return stock.items.length * stock.type.value;
}

export function insertIntoStock(stock: MoneyStock, money: Money) {
  if (detectMoneyType(money)?.type === stock.type) {
    return {
      type: stock.type,
      items: [...stock.items, money],
    };
  } else {
    throw new Error();
  }
}
