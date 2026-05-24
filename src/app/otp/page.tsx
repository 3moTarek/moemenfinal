"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("otp_email") ?? ""
      : "";

  async function handleVerifyOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      router.push("/login");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "OTP verification failed.");
        return;
      }

      sessionStorage.removeItem("otp_email");

      router.push("/shop");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f1ea] px-6 py-12 text-[#3b2416]">
      <section className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-[#d8c3ad] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5e3c]">
            Brown Shop
          </p>

          <h1 className="mt-4 text-3xl font-bold">Verify OTP</h1>

          <p className="mt-2 text-sm text-[#6f4e37]">
            Enter the 6-digit code sent to:
          </p>

          <p className="mt-2 rounded-xl bg-[#f7f1ea] px-4 py-3 text-sm font-medium">
            {email || "No email found. Go back to login."}
          </p>

          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium">OTP Code</label>
              <input
                type="text"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#d8c3ad] px-4 py-3 text-center text-xl font-semibold tracking-[0.4em] outline-none focus:border-[#8b5e3c]"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 6 || !email}
              className="w-full rounded-xl bg-[#3b2416] px-5 py-3 font-semibold text-white transition hover:bg-[#6f4e37] disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify and Enter Shop"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}