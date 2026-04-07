import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/prisma";

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
            process.env.STRIPE_CONNECT_WEBHOOK_SECRET,
        );
    } catch (err) {
        console.error("Webhook error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    if (event.type === "account.updated") {
        const account = event.data.object;
        const isFinished = account.details_submitted && account.charges_enabled;
        const internalCompanyId = account.metadata.companyId;

        if (!internalCompanyId) {
            console.error("Missing companyId in metadata");
            return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
        }

        if (isFinished) {
            await db.company.companies.update({
                where: { id: internalCompanyId },
                data: {
                    stripe_account_id: account.id,
                    onboarding_completed_at: new Date().toISOString()
                },
            });
        }
    }

    return NextResponse.json({ received: true });
}
