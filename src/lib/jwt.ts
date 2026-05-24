import { SignJWT, jwtVerify } from "jose";
import type { JwtUserPayload } from "@/types/user";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createJwtToken(payload: JwtUserPayload) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing.");
  }

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);
}

export async function verifyJwtToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing.");
  }

  const verified = await jwtVerify(token, secret);

  return verified.payload as JwtUserPayload;
}