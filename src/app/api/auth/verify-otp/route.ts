import { NextResponse } from "next/server";
import { z } from "zod";

import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { createJwtToken } from "@/lib/jwt";
import { verifyOtp } from "@/lib/otpStore";
import { findUserByEmail } from "@/lib/users";

const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedData = verifyOtpSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP data.",
        },
        {
          status: 400,
        }
      );
    }

    const { email, otp } = parsedData.data;

    const user = findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const isOtpValid = verifyOtp(user.email, otp);

    if (!isOtpValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired OTP.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await createJwtToken({
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login completed successfully.",
      role: user.role,
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}