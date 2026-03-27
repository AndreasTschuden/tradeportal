"use client";

import { PackagePlus } from "lucide-react";
import Link from "next/link";

const CompanyProfileButtons = () => {
  return (
    <div className="flex gap-3 mt-5">
      <Link href="/home/company/products" className="ring-1 ring-red-700 py-2 px-7 text-red-700 rounded-xl font-medium">
        View Products
      </Link>
      <Link
        href="/home/company/publish-product"
        className="flex gap-2 py-2 px-7 bg-red-700 text-white rounded-xl font-medium"
      >
        <PackagePlus strokeWidth={1}/>
        Publish new product
      </Link>
    </div>
  );
};

export { CompanyProfileButtons };
