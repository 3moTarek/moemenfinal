export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f1ea] text-[#3b2416]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5e3c]">
          Brown Shop
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Secure shopping platform with authentication and roles
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[#6f4e37]">
          Login with Cloudflare verification, email OTP, JWT session, and
          admin-only product management.
        </p>
      </section>
    </main>
  );
}