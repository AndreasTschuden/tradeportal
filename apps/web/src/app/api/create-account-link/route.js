import { NextResponse } from "next/server";
import { secretStripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: { message: "AccountId ist erforderlich" } },
        { status: 400 }
      );
    }

    // Erstellt den Onboarding-Link
    const accountLink = await secretStripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/home/company/account`, // Falls der Link abläuft
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/home/company/account`,        // Wenn er fertig ist (oder abbricht)
      type: "account_onboarding",
      // Optional: collect: "currently_due" (Standard) oder "eventually_due"
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Error creating account link:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 } // 500 ist hier passender für Server-Fehler
    );
  }
}