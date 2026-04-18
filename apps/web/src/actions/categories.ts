"use server";

import { db } from "@/lib/prisma";

export async function getCategories() {
	const categories = await db.user.categories.findMany();

	if (!categories) {
		throw new Error("No Categories found");
	}

	return categories;
}
