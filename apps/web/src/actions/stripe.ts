"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function startOnboarding(email: string, countryCode: string) {
  console.log("Starting Stripe onboarding process for email:", email);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const company = await db.company.companies.findFirst({
    where: {
      owner_id: session.user.id,
      deleted_at: null,
      is_verified: true,
    },
  });

  if (!company) {
    redirect("/home");
  }

  if (company.stripe_account_id) {
    console.warn(
      "Company already has a Stripe account ID:",
      company.stripe_account_id,
    );
    throw new Error("Company already has a Stripe account ID");
  }

  const accountRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-connect-account`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, countryCode }),
    },
  );

  if (!accountRes.ok) {
    const errorText = await accountRes.text();
    console.error("create-connect-account failed:", errorText);
    throw new Error(errorText || "Failed to create Stripe account");
  }

  const { accountId } = await accountRes.json();

  if (!accountId) {
    throw new Error("No Stripe accountId returned");
  }

  const linkRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-account-link`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId }),
    },
  );

  if (!linkRes.ok) {
    const errorText = await linkRes.text();
    console.error("create-account-link failed:", errorText);
    throw new Error(errorText || "Failed to create account link");
  }

  const { url } = await linkRes.json();

  if (!url) {
    throw new Error("No onboarding URL returned");
  }

  console.log("Stripe Onboarding URL:", url);

  const updatedCompany = await db.company.companies.update({
    where: { id: company.id },
    data: {
      stripe_account_id: accountId,
      onboarding_started_at: new Date().toISOString(),
    },
  });

  if(updatedCompany){
    console.log("Company updated with Stripe account ID:", updatedCompany.stripe_account_id);
    throw new Error("Company already has a Stripe account ID");
  }

  redirect(url);
}

export async function startCheckoutSession(){

}