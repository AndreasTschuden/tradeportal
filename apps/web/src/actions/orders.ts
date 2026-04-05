"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function createOrder() {
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

  const newOrder = await db.user.orders.create({
    data: {
      customers_id: customer.id,
      order_date: new Date().toISOString(),
      shipper: "Österreichische Post AG",
      tracking_number: "#1239479494932",
      status: "pending",
      shipped_to: "empty",
    },
  });

  if (!newOrder) {
    throw new Error("Your order could not be created, please try again later!");
  }

  const cartItems = await db.user.shopping_cart_products.findMany({
    where: {
      customers_id: customer.id,
    },
    include: {
      products: {
        include: {
          companies: {
            select: {
              stripe_account_id: true,
            },
          },
        },
      },
    },
  });

  type orderProductsType = {
    products_id: string;
    orders_id: string;
    product_variant: number;
    unit_price: number;
    quantity: number;
    discount: number;
    specificationen: {
      image: string;
      available: boolean;
      priceModifier: number;
      sellerId: string;
    };
  };

  const orderProducts = cartItems.reduce((acc: orderProductsType[], prod) => {
    const specs = JSON.parse(prod.products.specifications as string);
    const variant = specs.variants[prod.product_variant];
    const imgVariant = Object.values(variant)[0] as string;

    const price = Number(prod.products.base_price) * variant.priceModifier;

    acc.push({
      products_id: prod.products_id,
      orders_id: newOrder.id,
      product_variant: prod.product_variant,
      unit_price: price,
      quantity: prod.quantity,
      discount: 0,
      specificationen: {
        ...variant,
        image: specs.attributes[0].images[imgVariant],
        sellerId: prod.products.companies.stripe_account_id,
      },
    });

    return acc;
  }, []);

  console.log(orderProducts);

  const newOrderProducts = await db.user.orders_products.createMany({
    data: orderProducts.map((order) => ({
      products_id: order.products_id,
      orders_id: order.orders_id,
      product_variant: order.product_variant,
      unit_price: order.unit_price,
      quantity: order.quantity,
      discount: order.discount,
      specifications: order.specificationen,
    })),
  });

  if (!newOrderProducts) {
    throw new Error("Your order could not be created, please try again later!");
  }

  redirect(`/home/cart/checkout/${newOrder.id}`)
}

export async function getOrder(){

}
