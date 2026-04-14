import React from "react";
import { getCategories } from "@/actions/categories";
import { getProductsByCompany } from "@/actions/products";
import { OwnProducts } from "@/components/app/company/OwnProducts";

const CompanyProductsPage = async () => {
	const products = await getProductsByCompany();
	const categories = await getCategories();

	return <OwnProducts products={products} categories={categories} />;
};

export default CompanyProductsPage;
