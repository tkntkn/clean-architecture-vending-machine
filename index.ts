import { getTotalInsertedAmount } from "./application/useCase";
import { Dependency } from "./util/dependency";
import { insert } from "./application/useCase";
import { runCui } from "./interface/ui";

import { MemoryMoneyStockStorage } from "./interface/storage";
Dependency.register("MoneyStockStorage", MemoryMoneyStockStorage);

runCui((input) => {
  const result = insert(input);
  if (result) {
    console.log("Inserted.");
  }
  console.log("Amount:", getTotalInsertedAmount());
});
