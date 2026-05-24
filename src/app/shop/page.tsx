import { getCurrentUser } from "@/lib/auth";
import { getProducts } from "@/lib/products";
import ProductsClient from "@/components/products/ProductsClient";

export default async function ShopPage() {
  const user = await getCurrentUser();
  const products = getProducts();

  const isAdmin = user?.role === "admin";

  return (
    <main className="min-h-screen bg-[#f7f1ea] px-6 py-10 text-[#3b2416]">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-[#d8c3ad] bg-white p-6 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5e3c]">
            Brown Shop
          </p>

          <h1 className="mt-2 text-3xl font-bold">Shop Products</h1>

          <p className="mt-2 text-sm text-[#6f4e37]">
            Logged in as {user?.email} — Role: {user?.role}
          </p>

          {!isAdmin && (
            <p className="mt-3 rounded-xl bg-[#f7f1ea] px-4 py-3 text-sm text-[#6f4e37]">
              You can see product management buttons, but only admin can use
              them.
            </p>
          )}
        </div>

        <ProductsClient initialProducts={products} role={user?.role} />
      </section>
    </main>
  );
}