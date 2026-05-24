import bcrypt from "bcryptjs";

export async function comparePasswords(
  plainPassword: string,
  passwordHash: string
) {
  return bcrypt.compare(plainPassword, passwordHash);
}