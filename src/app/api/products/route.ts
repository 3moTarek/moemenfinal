import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/lib/products";
import { requireAdmin } from "@/lib/auth";

const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().positive(),
  imageUrl: z.string().url(),
  category: z.string().min(2),
});

export async function GET() {
  return NextResponse.json({
    success: true,
    products: getProducts(),
  });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Admin access required." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const parsedData = productSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { success: false, message: "Invalid product data." },
      { status: 400 }
    );
  }

  const product = createProduct(parsedData.data);

  return NextResponse.json({
    success: true,
    product,
  });
}

export async function PUT(request: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Admin access required." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const parsedData = productSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { success: false, message: "Invalid product data." },
      { status: 400 }
    );
  }

  const updatedProduct = updateProduct(
    parsedData.data.id,
    parsedData.data
  );

  if (!updatedProduct) {
    return NextResponse.json(
      { success: false, message: "Product not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    product: updatedProduct,
  });
}

export async function DELETE(request: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Admin access required." },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Product id is required." },
      { status: 400 }
    );
  }

  const deleted = deleteProduct(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, message: "Product not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Product deleted successfully.",
  });
}