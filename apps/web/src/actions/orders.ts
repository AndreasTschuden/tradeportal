"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

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
		const specs = prod.products.specifications as any;
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

	redirect(`/home/cart/checkout/${newOrder.id}`);
}

export async function checkOrder(id: string) {
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

	const order = await db.user.orders.findFirst({
		where: {
			id: id,
			customers_id: customer.id,
		},
	});

	if (!order) {
		redirect("/home/cart");
	}
}

export async function getOrderById(orderId: string) {
	const order = await db.user.orders.findUnique({
		where: {
			id: orderId,
		},
		include: {
			orders_products: {
				include: {
					products: {
						select: {
							name: true,
						},
					},
				},
			},
		},
	});

	if (!order) {
		redirect("/home/cart");
	}

	return order;
}

export async function updateOrderStatus(id: string) {
	const updatedOrder = await db.user.orders.update({
		where: {
			id: id,
		},
		data: {
			status: "shipped",
		},
	});

	if (!updatedOrder) {
		throw new Error("failed updating OrderStatus");
	}
}
