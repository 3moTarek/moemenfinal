import { AppUser } from "@/types/user";

export const users: AppUser[] = [
  {
    email: "moemen.hafez777@gmail.com",
    passwordHash: "$2b$10$/BXNvmiP8bSSrWMZkNDvt.CWjxRBUAGNjf.CQIsriy8U0d3eZzUlK",
    role: "admin",
  },
  {
    email: "moemen.hafez792@gmail.com",
    passwordHash: "$2b$10$/BXNvmiP8bSSrWMZkNDvt.CWjxRBUAGNjf.CQIsriy8U0d3eZzUlK",
    role: "user",
  },
];

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function findUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  return users.find(
    (user) => normalizeEmail(user.email) === normalizedEmail
  );
}