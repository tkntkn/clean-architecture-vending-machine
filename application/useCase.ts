import { Dependency } from "../util/dependency";
import { detectMoneyType, MoneyType, allMoneyTypes } from "../domain/money";
import {
  MoneyStock,
  insertIntoStock,
  createMoneyStock,
  calculateStockValue,
} from "../domain/moneyStock";
import { MemoryMoneyStockStorage } from "../interface/storage";

export interface MoneyStockStorage {
  getStock(type: MoneyType): MoneyStock | undefined;
  setStock(type: MoneyType, stock: MoneyStock): void;
}

const MoneyStockStorage =
  Dependency.inject<MoneyStockStorage>("MoneyStockStorage");

export function insert(moneyLike: string) {
  const detected = detectMoneyType(moneyLike);
  if (detected) {
    const { type, money } = detected;
    const stock = MoneyStockStorage.getStock(type) ?? createMoneyStock(type);
    MoneyStockStorage.setStock(type, insertIntoStock(stock, money));
    return true;
  } else {
    return false;
  }
}

export function getTotalInsertedAmount() {
  let totalAmount = 0;
  for (const type of allMoneyTypes) {
    const stock = MemoryMoneyStockStorage.getStock(type);
    if (stock) {
      totalAmount += calculateStockValue(stock);
    }
  }
  return totalAmount;
}
