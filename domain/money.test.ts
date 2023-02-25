import { expect, test } from "vitest";
import { detectMoneyType, MoneyType } from "./money";

test("detectMoneyType", () => {
  expect(detectMoneyType("10円")).toBe(undefined);
  expect(detectMoneyType("10円玉")).toEqual({type: MoneyType.Ten, money: "10円玉"});
});
