"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { publishProductSchema } from "@/lib/zod";
import { z } from "zod";
import { createUploadImageUrl } from "@/app/actions/bucket";
import { auth } from "@/lib/auth";

type ProductType = z.infer<typeof publishProductSchema>;

export async function publishProduct(formData: ProductType) {
  if (!formData) {
    throw new Error("Something went wrong!");
  }
  const result = publishProductSchema.safeParse(formData);

  if (!result.success) {
    throw new Error("The provided Product does not match the validation");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("auth/signin");
  }

  const company = await prisma.companies.findFirst({
    where: {
      owner_id: session.user.id,
    },
  });

  if (!company) {
    throw new Error("Only Companys can publish a product");
  }

  let imgArr = [];
  let fileArr = [];
  const images = formData.attributes[0].images;

  if (images) {
    for (const [key, value] of Object.entries(images)) {
      if (value instanceof File) {
        const uuid = crypto.randomUUID();
        const name = `${uuid}_${value.name}`;

        imgArr.push({ name: name, folder: "products" });
        fileArr.push(value);

        if (formData.attributes[0].images) {
          formData.attributes[0].images[key] = name;
        }

      }else{
        throw new Error("The uploaded Image is not a Image file")
      }
    }
    await createUploadImageUrl(imgArr, fileArr);
  }

  const productData = {
    attributes: formData.attributes,
    variants: formData.variants,
  };

  const specifications = JSON.stringify(productData);

  const product = await prisma.products.create({
    data: {
      name: formData.title,
      currency: formData.currency,
      specifications: specifications,
      companies_id: company.id,
      isactive: true,
    },
  });

  console.log(product);

  redirect("company/products");
}
