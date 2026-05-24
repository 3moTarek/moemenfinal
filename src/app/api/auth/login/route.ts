import { NextResponse } from "next/server";
import { z } from "zod";

import { findUserByEmail } from "@/lib/users";
import { comparePasswords } from "@/lib/hash";
import { createOtp, saveOtp } from "@/lib/otpStore";
import { sendOtpEmail } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  turnstileToken: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedData = loginSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data.",
        },
        {
          status: 400,
        }
      );
    }

    const { email, password, turnstileToken } = parsedData.data;

    const isHuman = await verifyTurnstileToken(turnstileToken);

    if (!isHuman) {
      return NextResponse.json(
        {
          success: false,
          message: "Human verification failed.",
        },
        {
          status: 400,
        }
      );
    }

    const user = findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const isPasswordCorrect = await comparePasswords(
      password,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const otp = createOtp();

    saveOtp(user.email, otp);

    await sendOtpEmail(user.email, otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
      email: user.email,
    });
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