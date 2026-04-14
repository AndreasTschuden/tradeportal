// lib/verify-session.ts
import { secretStripe } from "@/lib/stripe";

export async function verifyStripeSession(sessionId: string) {
	try {
		// Rufe die Session direkt bei Stripe ab
		const session = await secretStripe.checkout.sessions.retrieve(sessionId);

		// Prüfe den Bezahlstatus
		if (session.payment_status === "paid") {
			return { success: true, customer: session.customer_details?.email };
		}

		return { success: false, message: "Zahlung ausstehend" };
	} catch (_error) {
		return { success: false, message: "Ungültige Session-ID" };
	}
}
