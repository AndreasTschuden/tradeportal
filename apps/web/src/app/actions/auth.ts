"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignUpCompanyFormData, SignUpFormData } from "@/lib/zod";
import { prisma } from "@/lib/prisma";

export async function signUpAction(data: SignUpFormData) {
  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    address,
    phone,
    gender,
    city,
    region,
    postal_code,
    country,
  } = data;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const name = `${firstname} ${lastname}`;

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!result?.user?.id) {
      throw new Error("User creation failed");
    }

    await prisma.customers.create({
      data: {
        id: result.user.id,
        name: `${firstname} ${lastname}`,
        email: email,
        address: address || "",
        phone: phone || "",
        gender: gender || "",
        city: city || "",
        region: region || "",
        postal_code: postal_code || "",
        country: country || "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

  redirect("/");
}

export async function signUpCompanyAction(data: SignUpCompanyFormData) {
  const { company_name, email, password, confirmPassword, phone } = data;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: company_name,
      },
    });

    if (!result?.user?.id) {
      throw new Error("User creation failed");
    }

    await prisma.companies.create({
      data: {
        owner_id: result.user.id,
        stripe_account_id: "",
        onboarding_started_at: new Date(),
        is_verified: true, //for now its true but after the the verification functionality this will be false as default
        company_name: company_name,
        email: email,
        phone_number: phone,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

  redirect("/");
}

export async function signInAction(data: { email: string; password: string }) {
  const { email, password } = data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (err: unknown) {
    console.error("Sign-in error:", err);
    // If it's a known auth error → redirect to error page
    const maybeAuthError = err as { code?: string } | undefined;
    if (maybeAuthError?.code === "INVALID_CREDENTIALS") {
      redirect("/error?message=Invalid email or password");
    }
    // Otherwise → let Next.js handle it via error.tsx
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error(String(err));
    }
  }
  redirect("/");
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(), // need headers to sign out the current session
  });
  redirect("/");
}
