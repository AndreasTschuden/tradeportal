import { NextResponse } from "next/server";
import { secretStripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const accountId = formData.get("accountId");
    const productsJson = formData.get("products");

    if (!productsJson || !accountId) {
      return NextResponse.json({ error: "Missing accountId or products" }, { status: 400 });
    }

    const products = JSON.parse(productsJson);

    const lineItems = products.map(p => ({
      price_data: {
        currency: p.currency,
        product_data: { name: p.name },
        unit_amount: p.price,
      },
      quantity: p.quantity,
    }));

    const total = lineItems.reduce((sum, item) => sum + item.price_data.unit_amount * item.quantity, 0);
    const applicationFee = Math.round(total * 0.10);

    const session = await secretStripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      payment_intent_data: {
        application_fee_amount: applicationFee,
        transfer_data: {
          destination: accountId,
        },
      },
      success_url: `https://yourdomain.com/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/home/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
