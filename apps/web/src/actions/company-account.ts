"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { additionalInfoSchema, companySchema } from "@/lib/zod";

export async function getBasicInformation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const infos = await db.company.companies.findFirst({
    where: {
      owner_id: session.user.id,
    },
  });

  if (!infos) {
    redirect("/home");
  }
  console.log(infos)
  return infos;
}

export async function updateInformation(data: {
  name: string;
  email: string;
  phone: string;
  address?: string | undefined;
  head?: string | undefined;
  employees?: string | undefined;
  founded?: string | undefined;
}) {
  const validate = companySchema.safeParse(data);

  if (!validate.success) {
    throw new Error(validate.error.message);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const company = await db.company.companies.findFirst({
    where: {
      owner_id: session.user.id,
    },
  });

  if (!company) {
    redirect("/home");
  }

  const result = await db.company.companies.update({
    where: {
      id: company.id,
    },
    data: {
      company_name: data.name,
      phone_number: data.phone,
      address: data.address,
      head_of_company: data.head ? data.head : null,
      employee_count: data.employees ? Number(data.employees) : null,
      founded_at: data.founded ? new Date(data.founded) : null,
    },
  });

  if(!result){
    throw new Error("Failed updating Data, please try again later!")
  }
}

export async function updateAdditionalInformation(data : { website : string | undefined, linked_in : string | undefined}){
    
    const validate = additionalInfoSchema.safeParse(data);

    if (!validate.success) {
        throw new Error(validate.error.message);
    }

     const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const company = await db.company.companies.findFirst({
    where: {
      owner_id: session.user.id,
    },
  });

  if (!company) {
    redirect("/home");
  }

    const result = await db.company.companies.update({
        where : {
            id : company.id
        },
        data : {
            website : data.website || null,
            linkedin_url : data.linked_in || null
        }
    })

     if(!result){
        throw new Error("Failed updating Data, please try again later!")
    }
}

export async function handleCompanyDeletion(user: {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
}) {

  const company = await db.company.companies.findFirst({
    where: {
      owner_id: user.id,
    },
  });

  if (!company) {
    redirect("/home");
  }

  const result = await db.company.companies.update({
    where: {
      id: company.id,
    },
    data: {
      deleted_at: new Date(),
    },
  });

  await db.company.products.updateMany({
    where: {
      companies_id: company.id,
    },
    data: {
      isActive: false,
    },
  });
}
