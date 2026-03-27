"use server";

import { db } from "@/lib/prisma";

export async function getProducts() {
  const products = await db.user.products.findMany({
    where: {
      // isactive: true 
    },
    select: {
      id: true,
      name: true,
      base_price: true,
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

  finalProducts.forEach((prod) => {
    prod.specifications = JSON.parse(prod.specifications);
    prod.base_price = Number(prod.base_price);
  });

  return finalProducts;
}

export async function getNewestProducts() {
  const newestProducts = await db.user.products.findMany({
    where: {
      // isactive: true 
    },
    select: {
      id: true,
      name: true,
      specifications: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 4,
  });

  const finalProducts: newestProductsType[] = newestProducts;

  finalProducts.forEach((prod) => {
    prod.specifications = JSON.parse(prod.specifications);
  });

  return finalProducts;
}

export async function getDetailedProduct(id: string) {
  const product = await db.user.products.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      currency: true,
      specifications: true,
      base_price: true,
      short_description: true,
      long_description: true,
      companies: {
        select: {
          id: true,
          company_name: true,
          address: true,
        },
      },
      categories_products: {
        select: {
          categories: {
            select: {
              id: true,
            },
          },
        },
      },
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
  });

  if (!product) {
    throw new Error("No Product found");
  }

  product.base_price = product.base_price.toNumber() as any;

  const prod: detailedProductType = product as any;

  let avg = 0;
  let count = 0;

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
  prod.specifications = JSON.parse(prod.specifications);

  return prod;
}

export async function getFourProductsByCategory(
  categoryId: number,
  productId: string,
) {
  const products = await db.user.products.findMany({
    where: {
      AND: [
        {
          id: {
            not: productId,
          },
        },
        {
          categories_products: {
            some: {
              categories_id: categoryId,
            },
          },
        },
      ],
    },
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },
    take: 4,
    include: {
      _count: {
        select: {
          reviews: true,
        },
      },
      reviews: {
        select: {
          id: true,
          stars: true,
        },
      },
    },
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

  finalProducts.forEach((prod) => {
    prod.specifications = JSON.parse(prod.specifications);
    prod.base_price = Number(prod.base_price);
  });

  return finalProducts;
}
