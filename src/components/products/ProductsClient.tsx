"use client";

import Image from "next/image";
import { useState } from "react";

import type { Product } from "@/types/product";
import type { UserRole } from "@/types/user";

type ProductsClientProps = {
  initialProducts: Product[];
  role?: UserRole;
};

const emptyProduct: Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
  category: "",
};

export default function ProductsClient({
  initialProducts,
  role,
}: ProductsClientProps) {
  const isAdmin = role === "admin";

  const [products, setProducts] = useState(initialProducts);
  const [formProduct, setFormProduct] = useState<Product>(emptyProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSaveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAdmin) {
      setMessage("Only admin can manage products.");
      return;
    }

    const method = isEditing ? "PUT" : "POST";

    const productToSave = {
      ...formProduct,
      id: isEditing ? formProduct.id : crypto.randomUUID(),
      price: Number(formProduct.price),
    };

    const response = await fetch("/api/products", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToSave),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Product action failed.");
      return;
    }

    if (isEditing) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === data.product.id ? data.product : product
        )
      );
    } else {
      setProducts((currentProducts) => [...currentProducts, data.product]);
    }

    setFormProduct(emptyProduct);
    setIsEditing(false);
    setMessage("Product saved successfully.");
  }

  async function handleDeleteProduct(id: string) {
    if (!isAdmin) {
      setMessage("Only admin can delete products.");
      return;
    }

    const response = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Delete failed.");
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );

    setMessage("Product deleted successfully.");
  }

  function handleEditProduct(product: Product) {
    if (!isAdmin) {
      setMessage("Only admin can edit products.");
      return;
    }

    setFormProduct(product);
    setIsEditing(true);
    setMessage("");
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSaveProduct}
        className="rounded-3xl border border-[#d8c3ad] bg-white p-6 shadow-lg"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5e3c]">
              Product Management
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>

            {!isAdmin && (
              <p className="mt-2 text-sm text-[#6f4e37]">
                You can see this form, but only admin can use it.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isAdmin}
            className="rounded-xl bg-[#3b2416] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f4e37] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isEditing ? "Save Changes" : "Add Product"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            value={formProduct.name}
            onChange={(event) =>
              setFormProduct({ ...formProduct, name: event.target.value })
            }
            disabled={!isAdmin}
            placeholder="Product name"
            className="rounded-xl border border-[#d8c3ad] px-4 py-3 outline-none focus:border-[#8b5e3c] disabled:cursor-not-allowed disabled:opacity-40"
            required
          />

          <input
            value={formProduct.category}
            onChange={(event) =>
              setFormProduct({
                ...formProduct,
                category: event.target.value,
              })
            }
            disabled={!isAdmin}
            placeholder="Category"
            className="rounded-xl border border-[#d8c3ad] px-4 py-3 outline-none focus:border-[#8b5e3c] disabled:cursor-not-allowed disabled:opacity-40"
            required
          />

          <input
            type="number"
            value={formProduct.price}
            onChange={(event) =>
              setFormProduct({
                ...formProduct,
                price: Number(event.target.value),
              })
            }
            disabled={!isAdmin}
            placeholder="Price"
            className="rounded-xl border border-[#d8c3ad] px-4 py-3 outline-none focus:border-[#8b5e3c] disabled:cursor-not-allowed disabled:opacity-40"
            required
          />

          <input
            value={formProduct.imageUrl}
            onChange={(event) =>
              setFormProduct({
                ...formProduct,
                imageUrl: event.target.value,
              })
            }
            disabled={!isAdmin}
            placeholder="Image URL"
            className="rounded-xl border border-[#d8c3ad] px-4 py-3 outline-none focus:border-[#8b5e3c] disabled:cursor-not-allowed disabled:opacity-40"
            required
          />

          <textarea
            value={formProduct.description}
            onChange={(event) =>
              setFormProduct({
                ...formProduct,
                description: event.target.value,
              })
            }
            disabled={!isAdmin}
            placeholder="Description"
            className="md:col-span-2 rounded-xl border border-[#d8c3ad] px-4 py-3 outline-none focus:border-[#8b5e3c] disabled:cursor-not-allowed disabled:opacity-40"
            required
          />
        </div>

        {message && (
          <p className="mt-4 rounded-xl bg-[#f7f1ea] px-4 py-3 text-sm text-[#6f4e37]">
            {message}
          </p>
        )}
      </form>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
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
                  onClick={() => handleEditProduct(product)}
                  disabled={!isAdmin}
                  className="flex-1 rounded-xl border border-[#8b5e3c] px-4 py-2 text-sm font-semibold transition hover:bg-[#f7f1ea] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
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
    </div>
  );
}