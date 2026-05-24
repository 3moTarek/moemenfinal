import { AppUser } from "@/types/user";

export const users: AppUser[] = [
  {
    email: "moemen.hafez777@gmail.com",
    passwordHash:
      "$2b$10$8mWqPqJx1Y9KQm8z7n4Q2u9nY6X2y6M0fK8dQvYvD3Yk7fX1L5M8G",
    role: "admin",
  },
  {
    email: "moemen.hafez792@gmail.com",
    passwordHash:
      "$2b$10$8mWqPqJx1Y9KQm8z7n4Q2u9nY6X2y6M0fK8dQvYvD3Yk7fX1L5M8G",
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