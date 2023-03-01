import { User, validateNewUser } from "../domain/user";
import { State } from "../../common/state";

export type RegistrationState = "none" | "validating" | "invalid" | "registering" | "failed" | "succeeded";

export type RegisterState = {
  registrationState: State<RegistrationState>;
};

export type RegisterAdapter = {
  requestRegister: (user: User) => Promise<boolean>;
  getUserByEmail: (email: string) => Promise<User | undefined>;
};

export async function register(user: User, { registrationState }: RegisterState, { requestRegister, getUserByEmail }: RegisterAdapter) {
  registrationState.set("validating");
  const valid = await validateNewUser(user, { getUserByEmail });
  if (!valid) {
    registrationState.set("invalid");
  } else {
    registrationState.set("registering");
    const success = await requestRegister(user);
    if (!success) {
      registrationState.set("failed");
    } else {
      registrationState.set("succeeded");
    }
  }
}

export function getRegistrationStateFeedback(state: RegistrationState) {
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
