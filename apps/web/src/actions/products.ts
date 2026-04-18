"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function getProducts() {
	const products = await db.user.products.findMany({
		where: {
			isactive: true,
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

	const productWithStats: productWithStatsType[] = products;

	productWithStats.forEach((prod) => {
		if (prod._count.reviews !== 0) {
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
		prod.specifications =
			typeof prod.specifications === "string"
				? JSON.parse(prod.specifications)
				: prod.specifications;
		prod.base_price = Number(prod.base_price);
	});

	return finalProducts;
}

export async function getNewestProducts() {
	const newestProducts = await db.user.products.findMany({
		where: {
			isactive: true,
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

	if (!finalProducts) {
		throw new Error("there are no products yet");
	}

	console.log(finalProducts);

	finalProducts.forEach((prod) => {
		prod.specifications =
			typeof prod.specifications === "string"
				? JSON.parse(prod.specifications)
				: prod.specifications;
	});

	return finalProducts;
}

export async function getDetailedProduct(id: string) {
	const product = await db.user.products.findUnique({
		where: {
			id: id,
			isactive: true,
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
		return null;
	}
	const safeProduct = {
		...product,
		base_price: product.base_price.toNumber(),
	};

	const prod: detailedProductType = safeProduct;

	let avg = 0;
	let count = 0;

	if (prod._count.reviews !== 0) {
		prod.reviews.forEach((review) => {
			avg += review.stars;
			count = count + 1;
		});
		prod.avgStars = Math.round(avg / count);
		avg = 0;
	} else {
		prod.avgStars = 0;
	}
	prod.specifications =
		typeof prod.specifications === "string"
			? JSON.parse(prod.specifications)
			: prod.specifications;

	return prod;
}

export async function getFourProductsByCategory(
	categoryId: number,
	productId: string,
) {
	const products = await db.user.products.findMany({
		where: {
			isactive: true,
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

	const productWithStats: productWithStatsType[] = products;

	productWithStats.forEach((prod) => {
		if (prod._count.reviews !== 0) {
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
		prod.specifications =
			typeof prod.specifications === "string"
				? JSON.parse(prod.specifications)
				: prod.specifications;
		prod.base_price = Number(prod.base_price);
	});
	return finalProducts;
}

export async function getProductsByCompany() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/signin");
	}

	const company = await db.company.companies.findFirst({
		where: {
			owner_id: session.user.id,
		},
	});

	if (!company) {
		redirect("/home");
	}

	const products = await db.user.products.findMany({
		where: {
			// isactive: true
			companies_id: company.id,
		},
		select: {
			id: true,
			isactive: true,
			name: true,
			base_price: true,
			currency: true,
			specifications: true,
			created_at: true,
			categories_products: {
				select: {
					categories_id: true,
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

	let avg = 0;
	let count = 0;

	const productWithStats: productsForCompanyType[] = products;

	productWithStats.forEach((prod) => {
		if (prod._count.reviews !== 0) {
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
		prod.specifications =
			typeof prod.specifications === "string"
				? JSON.parse(prod.specifications)
				: prod.specifications;
		prod.base_price = Number(prod.base_price);
	});

	console.log(finalProducts);
	return finalProducts;
}

export async function updateProductAvailability(
	value: boolean,
	productId: string,
) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/signin");
	}

	const company = await db.company.companies.findFirst({
		where: {
			owner_id: session.user.id,
		},
	});

	if (!company) {
		redirect("/home");
	}

	const _result = await db.company.products.update({
		where: {
			id: productId,
		},
		data: {
			isactive: value,
		},
	});
}

export async function getAllProducts() {
	const products = await db.user.products.findMany({
		where: {
			isactive: true,
		},
		include: {
			reviews: {},
			_count: {
				select: {
					reviews: true,
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
		},
	});

	let avg = 0;
	let count = 0;

	const productWithStats: allProductsType[] = products;

	productWithStats.forEach((prod) => {
		if (prod._count.reviews !== 0) {
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
		prod.specifications =
			typeof prod.specifications === "string"
				? JSON.parse(prod.specifications)
				: prod.specifications;
		prod.base_price = Number(prod.base_price);
	});

	return finalProducts;
}
