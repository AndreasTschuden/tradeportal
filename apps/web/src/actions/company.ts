"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod";
import { createUploadImageUrl } from "@/actions/bucket";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { publishProductSchema } from "@/lib/zod";

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
		redirect("/signin");
	}

	const company = await db.company.companies.findFirst({
		where: {
			owner_id: session.user.id,
			is_verified: true,
			stripe_account_id: {
				not: "",
			},
		},
	});

	if (!company) {
		throw new Error("Only Companys can publish a product");
	}

	const imgArr = [];
	const fileArr = [];
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
			} else {
				throw new Error("The uploaded Image is not a Image file");
			}
		}
		await createUploadImageUrl(imgArr, fileArr);
	}
	const cleanAttributes = formData.attributes.map((attr) => ({
		name: attr.name,
		values: attr.values,
		images: attr.images
			? Object.fromEntries(
					Object.entries(attr.images).map(([k, v]) => [
						k,
						typeof v === "string" ? v : null,
					]),
				)
			: null,
	}));

	const specifications = {
		attributes: cleanAttributes,
		variants: formData.variants,
	};

	const product = await db.company.products.create({
		data: {
			name: formData.title,
			currency: formData.currency,
			base_price: formData.basePrice,
			short_description: formData.shortDescription,
			long_description: formData.longDescription,
			specifications: specifications,
			companies_id: company.id,
			isactive: true,
		},
	});

	if (!product) {
		throw new Error("Something went wrong!");
	}

	const resultCat = await db.company.categories_products.create({
		data: {
			categories_id: formData.category,
			products_id: product.id,
		},
	});

	if (!resultCat) {
		throw new Error("Something went wrong!");
	}

	redirect("company/products");
}

export async function getCompanies() {
	const companies = await db.user.companies.findMany({
		where: {
			deleted_at: null,
			is_verified: true,
			products: {
				some: {
					isactive: true,
				},
			},
		},
		orderBy: {
			products: {
				_count: "desc",
			},
		},
		include: {
			_count: {
				select: {
					products: true,
				},
			},
		},
	});

	console.log(companies);
	return companies;
}

export async function getCompanyById(id: string) {
	const company = await db.user.companies.findFirst({
		where: {
			id: id,
			deleted_at: null,
			is_verified: true,
			products: {
				some: {
					isactive: true,
				},
			},
		},
	});

	return company;
}
