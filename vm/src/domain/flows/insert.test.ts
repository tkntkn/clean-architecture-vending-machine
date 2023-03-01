import { detectMoneyType, Money, MoneyType } from "@/domain/entities/money";
import { insert, InsertionState, InsertState } from "@/domain/flows/insert";
import exp from "constants";
import { expect, test } from "vitest";

test("detect 10yen correctly", () => {
  const stock: [MoneyType, Money][] = [];
  let state: InsertionState | undefined = undefined;

  insert("invalid money", {
    stock: { add: (type, money) => stock.push([type, money]) },
    state: { set: (newState) => (state = newState) },
  });
  expect(state).toBe("invalid");
  expect(stock).toHaveLength(0);

  insert("100円玉: invalid money", {
    stock: { add: (type, money) => stock.push([type, money]) },
    state: { set: (newState) => (state = newState) },
  });
  expect(state).toBe("inserted");
  expect(stock).toHaveLength(1);
});
