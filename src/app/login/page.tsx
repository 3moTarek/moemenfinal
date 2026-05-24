"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [turnstileToken, setTurnstileToken] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!turnstileToken) {
      setError("Please complete human verification.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      sessionStorage.setItem("otp_email", data.email);

      router.push("/otp");
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

          <h1 className="mt-4 text-3xl font-bold">Login</h1>

          <p className="mt-2 text-sm text-[#6f4e37]">
            Sign in with email, password, Cloudflare verification, and OTP.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#d8c3ad] px-4 py-3 outline-none focus:border-[#8b5e3c]"
                placeholder="moemen.hafez777@gmail.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#d8c3ad] px-4 py-3 outline-none focus:border-[#8b5e3c]"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="rounded-2xl border border-[#d8c3ad] bg-[#f7f1ea] p-4">
              <p className="text-sm font-semibold">Human verification</p>

              <div className="mt-4">
                {siteKey ? (
                  <Turnstile
                    siteKey={siteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => {
                      setTurnstileToken("");
                      setError("Human verification failed.");
                    }}
                    options={{
                      theme: "light",
                      size: "flexible",
                    }}
                  />
                ) : (
                  <p className="text-sm text-red-600">
                    Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY.
                  </p>
                )}
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !turnstileToken}
              className="w-full rounded-xl bg-[#3b2416] px-5 py-3 font-semibold text-white transition hover:bg-[#6f4e37] disabled:opacity-50"
            >
              {loading ? "Checking..." : "Continue"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}