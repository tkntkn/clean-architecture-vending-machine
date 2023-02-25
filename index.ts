import { Dependency } from "./util/dependency";
import { runCui } from "./interface/ui";

import { MemoryMoneyStockStorage } from "./interface/storage";

Dependency.register("EarningStockStorage", new MemoryMoneyStockStorage());
Dependency.register("PaymentStockStorage", new MemoryMoneyStockStorage());

runCui();
