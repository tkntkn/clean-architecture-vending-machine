import { Money, MoneyType } from "@/domain/entities/money";
import { insertMoney, InsertionState } from "@/domain/flows/insertMoney";
import { expect, test } from "vitest";

test("detect 10yen correctly", () => {
  const stock: [MoneyType, Money][] = [];
  let state: InsertionState | undefined = undefined;

  insertMoney("invalid money", {
    stock: { add: (type, money) => stock.push([type, money]) },
    state: { set: (newState) => (state = newState) },
  });
  expect(state).toBe("invalid");
  expect(stock).toHaveLength(0);

  insertMoney("100円玉: valid money", {
    stock: { add: (type, money) => stock.push([type, money]) },
    state: { set: (newState) => (state = newState) },
  });
  expect(state).toBe("inserted");
  expect(stock).toHaveLength(1);
});
