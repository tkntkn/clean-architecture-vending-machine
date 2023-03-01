import { useState } from "react";
import { ref } from "vue";
import { getUserByEmail } from "../../adapter/getUserByEmail";
import { requestRegister } from "../../adapter/requestRegister";
import { validateNewUser } from "../domain/user";
import { RegistrationState } from "./register";

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
  const [registrationState, setRegistrationState] = useState<RegistrationState>("none");

  const register = async (email: string, name: string) => {
    setRegistrationState("validating");
    const user = { email, name };
    const valid = await validateNewUser(user, { getUserByEmail });
    if (!valid) {
      setRegistrationState("invalid");
    } else {
      setRegistrationState("registering");
      const success = await requestRegister(user);
      if (!success) {
        setRegistrationState("failed");
      } else {
        setRegistrationState("succeeded");
      }
    }
  };

  return [registrationState, register] as const;
}

// NG Example in Vue
export function setupRegister() {
  const registrationState = ref<RegistrationState>("none");

  const register = async (email: string, name: string) => {
    registrationState.value = "validating";
    const user = { email, name };
    const valid = await validateNewUser(user, { getUserByEmail });
    if (!valid) {
      registrationState.value = "invalid";
    } else {
      registrationState.value = "registering";
      const success = await requestRegister(user);
      if (!success) {
        registrationState.value = "failed";
      } else {
        registrationState.value = "succeeded";
      }
    }
  };

  return [registrationState, register] as const;
}
