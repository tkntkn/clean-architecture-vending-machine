import { User } from "../business/domain/user";
import { timer } from "../util/PromiseHelper";

export async function requestRegister(user: User) {
  await timer(500);
  return Math.random() > user.name.length / 10;
}
