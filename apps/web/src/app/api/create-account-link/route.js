import { NextResponse } from "next/server";
import { secretStripe } from "@/lib/stripe"; //pnpm install stripe --save

// steps for stripe:
// creat-connect-account: create stripe account (save stripe_account_id and onboarding_started_at into db)
// create-account-link: verify company with stripe, also to send them to verify if they stopped in the middle (need to create a new link every time)
// account status: check if company has the rights to receive money before every money movement, if not => create-account-link (save onboarding_completed_at into db when ok for the first time)

export async function POST(request) {
  try {
    const { email, countryCode /*input: where is the company based at*/ } =
      await request.json();

    // Create a Connect account with the specified controller properties
    const account = await secretStripe.accounts.create({
      country: countryCode,
      email: email,
      controller: {
        // Platform controls fee collection - connected account pays fees
        fees: {
          payer: "account",
        },
        // Stripe handles payment disputes and losses
        losses: {
          payments: "stripe",
        },
        // Connected account gets full access to Stripe dashboard
        stripe_dashboard: {
          type: "full",
        },
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    return NextResponse.json({ accountId: account.id });
  } catch (error) {
    console.error("Error creating Stripe account:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 400 },
    );
  }
}

