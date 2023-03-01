import { User } from "../business/domain/user";
import { timer } from "../util/PromiseHelper";

export async function getUserByEmail(email: string): Promise<User | undefined> {
  await timer(500);
  if (Math.random() > email.length / 10) {
    return { email, name: "John Smith" };
  } else {
    return undefined;
  }
}
