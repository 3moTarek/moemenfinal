export type UserRole = "admin" | "user";

export type AppUser = {
  email: string;
  passwordHash: string;
  role: UserRole;
};

export type JwtUserPayload = {
  email: string;
  role: UserRole;
};