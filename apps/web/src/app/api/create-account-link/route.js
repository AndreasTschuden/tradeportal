import { NextResponse } from "next/server";
import { secretStripe } from "@/lib/stripe";

// for a merchant that just signed up or still needs to verify
// creates a link for the merchant to verify their account

export async function POST(request) {
  try {
    const { accountId } = await request.json();

    const accountLink = await secretStripe.v2.core.accountLinks.create({
      account: accountId,
      use_case: {
        type: "account_onboarding",
        account_onboarding: {
          configurations: "merchant",
          refresh_url: "https://example.com",
          return_url: "https://example.com",
        },
      },
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Error creating account link:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 400 },
    );
  }
}
