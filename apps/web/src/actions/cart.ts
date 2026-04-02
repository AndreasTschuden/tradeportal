"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getCartItemsCount() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const customer = await db.user.customers.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!customer) {
    return null;
  }

  const cartItemsCount = await db.user.shopping_cart_products.count({
    where: {
      customers_id: session.user.id,
    },
  });

  return cartItemsCount;
}

export async function addToCart(
  productId: string,
  variant: number,
  quantity: number,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const customer = await db.user.customers.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!customer) {
    redirect("/home");
  }

  const product = await db.user.shopping_cart_products.findFirst({
    where: {
      customers_id: session.user.id,
      products_id: productId,
      product_variant: variant,
    },
  });

  if (product) {
    const updatedQuantity = product.quantity + quantity;

    const result = await db.user.shopping_cart_products.update({
      where: {
        // Composite Primary Key
        customers_id_products_id_product_variant: {
          customers_id: product.customers_id,
          products_id: product.products_id,
          product_variant: product.product_variant,
        },
      },
      data: {
        quantity: updatedQuantity,
        updated_at: new Date(),
      },
    });

    if (!result) {
      throw new Error("Failed to update cart item");
    }

    return "updated";
  }

  const result = await db.user.shopping_cart_products.create({
    data: {
      customers_id: session.user.id,
      products_id: productId,
      product_variant: variant,
      quantity: quantity,
      updated_at: new Date(),
    },
  });

  if (!result) {
    throw new Error("Failed to add item to cart");
  }

  return "added";
}
