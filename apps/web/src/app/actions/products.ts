"use server";

import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.products.findMany({
    where : {
        isactive : true
    },
    select: {
      id: true,
      name: true,
      currency : true
    },
    take: 8,
  });
  return products;
}

export async function getNewestProducts(){

    const newestProducts = await prisma.products.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take : 4
  })

  return newestProducts
}
