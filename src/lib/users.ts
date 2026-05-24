import { AppUser } from "@/types/user";

export const users: AppUser[] = [
  {
    email: "moemen.hafez777@gmail.com",
    passwordHash: "$2b$10$i6uUPJF9QUkeA.sCEpLxVu5qhtisEOU/ybvONLO.zzndFOy5JWAfy",
    role: "admin",
  },
  {
    email: "moemen.hafez792@gmail.com",
    passwordHash: "$2b$10$i6uUPJF9QUkeA.sCEpLxVu5qhtisEOU/ybvONLO.zzndFOy5JWAfy",
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