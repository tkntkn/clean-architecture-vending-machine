// Domain
export type User = { email: string; name: string };

export type ValidateNewUserAdapter = {
  getUserByEmail: (email: string) => Promise<User | undefined>;
};

export async function validateNewUser(user: User, { getUserByEmail }: ValidateNewUserAdapter) {
  return user.email.includes("@") && user.name.length > 0 && (await getUserByEmail(user.email)) == undefined;
}
