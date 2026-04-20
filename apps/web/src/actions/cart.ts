"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

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

export async function getCartItems(userId: string) {
	const cartItems = await db.user.shopping_cart_products.findMany({
		where: {
			customers_id: userId,
		},
		include: {
			products: {
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
			},
		},
		orderBy: {
			products: {
				created_at: "asc",
			},
		},
	});

	let avg = 0;
	let count = 0;

	const productWithStats: cartItemsWithAvgStars[] = cartItems;

	productWithStats.forEach((prod) => {
		if (prod.products._count.reviews !== 0) {
			prod.products.reviews.forEach((review) => {
				avg += review.stars;
				count = count + 1;
			});
			prod.products.avgStars = Math.round(avg / count);
			avg = 0;
		} else {
			prod.products.avgStars = 0;
		}
	});

	const finalProducts = productWithStats;

	finalProducts.forEach((prod) => {
		prod.products.specifications =
			typeof prod.products.specifications === "string"
				? JSON.parse(prod.products.specifications)
				: prod.products.specifications;
		prod.products.base_price = Number(prod.products.base_price);
	});

	console.log(finalProducts);
	return finalProducts;
}

export async function deleteCartItem(params: {
	customerId: string;
	productId: string;
	variant: number;
}) {
	const { customerId, productId, variant } = params;

	const result = await db.user.shopping_cart_products.delete({
		where: {
			customers_id_products_id_product_variant: {
				customers_id: customerId,
				products_id: productId,
				product_variant: variant,
			},
		},
	});

	if (!result) {
		throw new Error("Failed to delete cart item");
	}

	return "deleted";
}

export async function changeCartItemQuantity(params: {
	customerId: string;
	productId: string;
	variant: number;
	quantity: number;
}) {
	const { customerId, productId, variant, quantity } = params;

	const result = await db.user.shopping_cart_products.update({
		where: {
			customers_id_products_id_product_variant: {
				customers_id: customerId,
				products_id: productId,
				product_variant: variant,
			},
		},
		data: {
			quantity: quantity,
			updated_at: new Date(),
		},
	});

	if (!result) {
		throw new Error("Failed to update cart item quantity");
	}

	return "updated";
}

export async function clearCart() {
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

	const _clearedCart = await db.user.shopping_cart_products.deleteMany({
		where: {
			customers_id: customer.id,
		},
	});
}
