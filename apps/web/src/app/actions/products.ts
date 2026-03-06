"use server";

import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.products.findMany({
    where: {
      isactive: true,
    },
    select: {
      id: true,
      name: true,
      currency: true,
      specifications: true,
      reviews: {
        select: {
          id: true,
          stars: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
    take: 8,
  });

  let avg = 0;
  let count = 0;

  let productWithStats: productWithStatsType[] = products;

  productWithStats.forEach((prod) => {
    if (prod._count.reviews != 0) {
      prod.reviews.forEach((review) => {
        avg += review.stars;
        count = count + 1;
      });
      prod.avgStars = Math.round(avg / count);
      avg = 0;
    } else {
      prod.avgStars = 0;
    }
  });

  const finalProducts = productWithStats;

  finalProducts.forEach(prod => {
    prod.specifications = JSON.parse(prod.specifications)
  });

  console.log(finalProducts[0].specifications.attributes)
  return finalProducts;
}

export async function getNewestProducts() {
  const newestProducts = await prisma.products.findMany({
    where: {
      isactive: true,
    },
    select: {
      id: true,
      name: true,
      specifications: true
    },
    orderBy: {
      created_at: "desc",
    },
    take: 4,
  });

  const finalProducts : newestProductsType[] = newestProducts;

  finalProducts.forEach(prod => {
    prod.specifications = JSON.parse(prod.specifications)
  });

  return finalProducts;
}
