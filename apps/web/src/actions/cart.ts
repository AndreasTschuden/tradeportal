"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Select } from "radix-ui";

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

export async function addToCart(productId: string, product_variant: number, quantity: number) {
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

  const result =await db.user.shopping_cart_products.create({
    data: {
      customers_id: session.user.id,
      products_id: productId,
      product_variant: product_variant,
      quantity : quantity,
      updated_at: new Date(),
    },
  });

  if(!result) {
    throw new Error("Failed to add item to cart");
  }

  return result;
}
