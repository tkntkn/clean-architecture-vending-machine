import { MoneyType } from "../domain/money";
import { MoneyStock } from "../domain/moneyStock";
import { MoneyStockStorage } from "../application/useCase";

export const MemoryMoneyStockStorage = new (class MemoryMoneyStockStorage
  implements MoneyStockStorage
{
  private map;

  constructor() {
    this.map = new Map<MoneyType, MoneyStock>();
  }

  getStock(type: MoneyType) {
    return this.map.get(type);
  }

  setStock(type: MoneyType, stock: MoneyStock) {
    this.map.set(type, stock);
  }
})();
