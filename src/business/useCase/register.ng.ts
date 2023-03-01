import { useState } from "react";
import { ref } from "vue";
import { getUserByEmail } from "../../adapter/getUserByEmail";
import { requestRegister } from "../../adapter/requestRegister";
import { validateNewUser } from "../domain/user";
import { RegisteringState } from "./register";

/**
 * Why No Good?
 * - Bad Testability
 *   - It requires rendering-library to test
 *   - It depends adapters directly which make it harder to stub
 * - Bad Portability
 *   - Business logic does not work without rendering-library
 */

// NG Example in React
export function useRegister() {
  const [registeringState, setRegisteringState] = useState<RegisteringState>("none");

  const register = async (email: string, name: string) => {
    setRegisteringState("validating");
    const user = { email, name };
    const valid = await validateNewUser(user, { getUserByEmail });
    if (!valid) {
      setRegisteringState("invalid");
    } else {
      setRegisteringState("registering");
      const success = await requestRegister(user);
      if (!success) {
        setRegisteringState("failed");
      } else {
        setRegisteringState("succeeded");
      }
    }
  };

  return [registeringState, register] as const;
}

// NG Example in Vue
export function setupRegister() {
  const registeringState = ref<RegisteringState>("none");

  const register = async (email: string, name: string) => {
    registeringState.value = "validating";
    const user = { email, name };
    const valid = await validateNewUser(user, { getUserByEmail });
    if (!valid) {
      registeringState.value = "invalid";
    } else {
      registeringState.value = "registering";
      const success = await requestRegister(user);
      if (!success) {
        registeringState.value = "failed";
      } else {
        registeringState.value = "succeeded";
      }
    }
  };

  return [registeringState, register] as const;
}
