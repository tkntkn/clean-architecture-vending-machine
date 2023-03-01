import { User, validateNewUser } from "../domain/user";
import { State } from "../../common/state";

export type RegisterState = {
  registeringState: State<RegisteringState>;
};

export type RegisterAdapter = {
  requestRegister: (user: User) => Promise<boolean>;
  getUserByEmail: (email: string) => Promise<User | undefined>;
};

export type RegisteringState = "none" | "validating" | "invalid" | "registering" | "failed" | "succeeded";

export function getRegisteringStateFeedback(state: RegisteringState) {
  switch (state) {
    case "validating":
      return "Validating...";
    case "invalid":
      return "Hmm, something invalid.";
    case "registering":
      return "Registering...";
    case "failed":
      return "Hmm, something wrong.";
    case "succeeded":
      return "Success!";
  }
}

export async function register(user: User, { registeringState }: RegisterState, { requestRegister, getUserByEmail }: RegisterAdapter) {
  registeringState.set("validating");
  const valid = await validateNewUser(user, { getUserByEmail });
  if (!valid) {
    registeringState.set("invalid");
  } else {
    registeringState.set("registering");
    const success = await requestRegister(user);
    if (!success) {
      registeringState.set("failed");
    } else {
      registeringState.set("succeeded");
    }
  }
}
