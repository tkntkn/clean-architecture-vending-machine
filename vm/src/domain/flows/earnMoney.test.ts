import { earnMoney, EarnMoneyState } from "@/domain/flows/earnMoney";
import { expect, test, vi } from "vitest";

test("insert works correctly", () => {
  const walletAdd = vi.fn();

  const state: EarnMoneyState = {
    wallet: { add: walletAdd },
  };

  earnMoney("money1", state);
  expect(walletAdd).toBeCalledWith("money1");
  expect(walletAdd).toBeCalledTimes(1);

  earnMoney("money2", state);
  expect(walletAdd).toBeCalledWith("money2");
  expect(walletAdd).toBeCalledTimes(2);
});
