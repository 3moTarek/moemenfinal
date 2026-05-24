"use client";

import Image from "next/image";
import type { Product } from "@/types/product";
import type { UserRole } from "@/types/user";

type ProductsClientProps = {
  initialProducts: Product[];
  role?: UserRole;
};

export default function ProductsClient({
  initialProducts,
  role,
}: ProductsClientProps) {
  const isAdmin = role === "admin";

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {initialProducts.map((product) => (
        <article
          key={product.id}
          className="overflow-hidden rounded-3xl border border-[#d8c3ad] bg-white shadow-lg"
        >
          <div className="relative h-56 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              {product.category}
            </p>

            <h2 className="mt-2 text-xl font-bold">{product.name}</h2>

            <p className="mt-2 text-sm text-[#6f4e37]">
              {product.description}
            </p>

            <p className="mt-4 text-lg font-bold">${product.price}</p>

            <div className="mt-5 flex gap-3">
              <button
                disabled={!isAdmin}
                className="flex-1 rounded-xl border border-[#8b5e3c] px-4 py-2 text-sm font-semibold transition hover:bg-[#f7f1ea] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Edit
              </button>

              <button
                disabled={!isAdmin}
                className="flex-1 rounded-xl bg-[#3b2416] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6f4e37] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}