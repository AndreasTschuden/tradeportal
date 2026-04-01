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
