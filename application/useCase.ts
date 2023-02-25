import { Dependency } from "../util/dependency";
import { detectMoneyType, MoneyType, allMoneyTypes, Money } from "../domain/money";
import { MoneyStock, insertIntoStock, createMoneyStock, calculateStockValue } from "../domain/moneyStock";
import { MemoryMoneyStockStorage } from "../interface/storage";

export interface MoneyStockStorage {
  getStock(type: MoneyType): MoneyStock | undefined;
  setStock(type: MoneyType, stock: MoneyStock): void;
}

const EarningStockStorage = Dependency.inject<MoneyStockStorage>("EarningStockStorage");
const PaymentStockStorage = Dependency.inject<MoneyStockStorage>("PaymentStockStorage");

export function insert(moneyLike: string) {
  const detected = detectMoneyType(moneyLike);
  if (detected) {
    const { type, money } = detected;
    const stock = PaymentStockStorage.getStock(type) ?? createMoneyStock(type);
    PaymentStockStorage.setStock(type, insertIntoStock(stock, money));
    return true;
  } else {
    return false;
  }
}

export function getInsertedAmount() {
  let totalAmount = 0;
  for (const type of allMoneyTypes) {
    const stock = PaymentStockStorage.getStock(type);
    if (stock) {
      totalAmount += calculateStockValue(stock);
    }
  }
  return totalAmount;
}

export function refund() {
  const moneys: Money[] = [];
  for (const type of allMoneyTypes) {
    const stock = PaymentStockStorage.getStock(type);
    if (stock) {
      moneys.push(...stock.items);
      PaymentStockStorage.setStock(type, createMoneyStock(type));
    }
  }
  return moneys;
}
