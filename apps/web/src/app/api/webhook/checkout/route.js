import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2024-04-10",
});

export async function POST(req) {
	const body = await req.text();
	const sig = req.headers.get("stripe-signature");

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (err) {
		console.error("Webhook error:", err.message);
		return NextResponse.json({ error: err.message }, { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const sessionId = event.data.object.id;

		// Vollständige Session mit PaymentIntent und Line Items abrufen
		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ["line_items.data.price.product", "payment_intent"],
		});

		for (const item of session.line_items.data) {
			const sellerId = item.price.product.metadata.sellerId;
			const amount = item.price.unit_amount * item.quantity;

			const tradePortalFee = Math.round(
				amount * parseFloat(process.env.STRIPE_TRADE_PORTAL_FEE),
			);

			const sellerAmount = amount - tradePortalFee;

			if (sellerId && amount > 0) {
				try {
					const transfer = await stripe.transfers.create({
						amount: sellerAmount,
						currency: "eur",
						destination: sellerId,
						transfer_group: session.payment_intent.transfer_group,
					});

					console.log(transfer);
				} catch (err) {
					console.error(
						`Failed to transfer to seller ${sellerId}:`,
						err.message,
					);
				}
			}
		}
	}

	return NextResponse.json({ received: true });
}
