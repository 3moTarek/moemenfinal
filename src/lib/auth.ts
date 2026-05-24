
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/lib/jwt";

export const AUTH_COOKIE_NAME = "brown_shop_token";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyJwtToken(token);
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}