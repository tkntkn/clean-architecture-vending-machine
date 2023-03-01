import { detectMoneyType, MoneyType } from "@/domain/entities/money";
import { expect, test } from "vitest";

test("detect 10yen correctly", () => {
  expect(detectMoneyType("10円")).toBeUndefined();
  expect(detectMoneyType("10円玉")).toEqual({ type: MoneyType.Ten, money: "10円玉" });
  expect(detectMoneyType("10円玉！")).toEqual({ type: MoneyType.Ten, money: "10円玉！" });
});
