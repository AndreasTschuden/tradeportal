import { getAllProducts } from "@/actions/products";
import Link from "next/link";
import { ProductCard } from "@/components/app/ProductCard";
import { SelectFilters } from "@/components/app/products/SelectFilters";
import { FilterSideBar } from "@/components/app/products/FilterSideBar";
import { getCategories } from "@/actions/categories";
import { getCompanies } from "@/actions/company";

const ProductsPage = async () => {
  const products = await getAllProducts();
  const categories = await getCategories();
  const companies = await getCompanies()

  return (
    <div>
      <nav className="flex my-2 mb-6 text-sm">
        <Link href="/home" className="text-gray-400">
          Home
        </Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/products" className="text-red-700 font-bold">
          Products
        </Link>
      </nav>
      <div className="flex gap-5">
        <FilterSideBar categories={categories} companies={companies}/>
        <div className="flex flex-col w-full gap-5">
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl font-bold">Products</h2>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr
              </p>
            </div>
            <SelectFilters categories={categories} />
          </div>
          <div className="grid grid-cols-4 w-full gap-3">
            {products.map((prod) => (
              <ProductCard prod={prod} key={prod.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
