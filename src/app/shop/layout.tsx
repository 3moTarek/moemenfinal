import Link from "next/link";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f7f1ea] text-[#3b2416]">
      <header className="border-b border-[#d8c3ad] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5e3c]">
              Brown Shop
            </p>

            <h1 className="mt-1 text-xl font-bold">
              Secure Shopping Platform
            </h1>
          </div>

          <nav className="flex items-center gap-4">
            <Link
              href="/shop"
              className="text-sm font-medium text-[#6f4e37] transition hover:text-[#3b2416]"
            >
              Shop
            </Link>

            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="rounded-xl bg-[#3b2416] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6f4e37]"
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}