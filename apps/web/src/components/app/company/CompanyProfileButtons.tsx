"use client";

import { PackagePlus } from "lucide-react";
import Link from "next/link";

const CompanyProfileButtons = () => {
	return (
		<div className="mt-5 flex flex-wrap gap-3">
			<Link
				href="/home/company/products"
				className="rounded-xl px-5 py-2 font-medium text-red-700 ring-1 ring-red-700 sm:px-7"
			>
				View Products
			</Link>
			<Link
				href="/home/company/publish-product"
				className="flex gap-2 rounded-xl bg-red-700 px-5 py-2 font-medium text-white sm:px-7"
			>
				<PackagePlus strokeWidth={1} />
				Publish new product
			</Link>
		</div>
	);
};

export { CompanyProfileButtons };
