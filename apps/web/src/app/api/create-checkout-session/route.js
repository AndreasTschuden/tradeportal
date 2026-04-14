import { NextResponse } from "next/server";
import { secretStripe } from "@/lib/stripe";

export async function POST(request) {
	try {
		const formData = await request.formData();
		const productsJson = formData.get("products");
		const order_id = formData.get("order_id");

		if (!productsJson || !order_id) {
			return NextResponse.json(
				{ error: "Missing accountId or products" },
				{ status: 400 },
			);
		}

		const products = JSON.parse(productsJson);

		const lineItems = products.map((p) => ({
			price_data: {
				currency: "eur",
				product_data: {
					name: p.name,
					metadata: {
						sellerId: p.sellerId,
					},
				},
				unit_amount: p.price,
			},
			quantity: p.quantity,
		}));

		const now = new Date();
		const formatted = now.toISOString().replace(/[:.]/g, "-");

		const session = await secretStripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			payment_intent_data: {
				transfer_group: `ORDER_${formatted}`,
			},
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/home/cart/success?session_id={CHECKOUT_SESSION_ID}&orderId=${order_id}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/home/cart`,
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
