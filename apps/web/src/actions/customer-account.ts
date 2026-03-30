"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { personalInformationSchema, billingAddressSchema } from "@/lib/zod";

export async function getCustomerInformation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const infos = await db.user.customers.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!infos) {
    redirect("/home");
  }
  console.log(infos);
  return infos;
}

export async function updatePersonalInformation(formData: {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  phone?: string | undefined;
}) {
  const validate = personalInformationSchema.safeParse(formData);

  if (!validate.success) {
    throw new Error(validate.error.message);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const customer = await db.user.customers.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!customer) {
    redirect("/home");
  }

  const name = `${formData.firstname} ${formData.lastname}`;

  const result = await db.user.customers.update({
    where: {
      id: customer.id,
    },
    data: {
      name: name,
      phone: formData.phone || "",
      gender: formData.gender,
    },
  });

  if (!result) {
    throw new Error("Failed updating Data, please try again later!");
  }
}

export async function updateBillingAddress(formData: {
  city?: string | undefined;
  postal_code?: string | undefined;
  region?: string | undefined;
  country?: string | undefined;
}) {
  const validate = billingAddressSchema.safeParse(formData);

  if (!validate.success) {
    throw new Error(validate.error.message);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const customer = await db.user.customers.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!customer) {
    redirect("/home");
  }

  const result = await db.user.customers.update({
    where: {
      id: customer.id,
    },
    data: {
      city: formData.city || null,
      postal_code: formData.postal_code || null,
      region: formData.region || null,
      country: formData.country || null,
    },
  });

  if (!result) {
    throw new Error("Failed updating Data, please try again later!");
  }
}

export async function handleUserDeletion() {}
