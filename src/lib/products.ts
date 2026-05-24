import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Brown Hoodie",
    description: "Soft premium hoodie with a clean brown streetwear look.",
    price: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
    category: "Clothing",
  },
  {
    id: "2",
    name: "White Minimal Sneakers",
    description: "Comfortable everyday sneakers with a clean white design.",
    price: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
    category: "Shoes",
  },
  {
    id: "3",
    name: "Brown Leather Backpack",
    description: "Elegant leather backpack for daily use and university.",
    price: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
    category: "Bags",
  },
];

export function getProducts() {
  return products;
}

export function createProduct(product: Product) {
  products.push(product);
  return product;
}

export function updateProduct(id: string, updatedProduct: Product) {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = updatedProduct;
  return products[index];
}

export function deleteProduct(id: string) {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  return true;
}