"use client";

import { ProductCard } from "@/components/app/company/ProductCard";
import Link from "next/link";
import { use, useState } from "react";
import { CalendarArrowDown, CalendarArrowUp, Search } from "lucide-react";

const OwnProducts = ({
  products,
  categories,
}: {
  products: productsForCompanyType[];
  categories: CategoryType[];
}) => {
  const [productsState, setProductsState] = useState(products);
  const [allProducts, setAllProducts] = useState(products);
  const [currentOrder, setCurrentOrder] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const handleDateFilter = () => {
    setProductsState((prev) => {
      const sorted = [...prev].sort((a, b) => {
        const dateA = new Date(a.created_at ?? 0).getTime();
        const dateB = new Date(b.created_at ?? 0).getTime();

        return currentOrder ? dateA - dateB : dateB - dateA;
      });
      return sorted;
    });

    setCurrentOrder((prev) => !prev);
  };

  const handleCategoryFilter = (id: number) => {
    if (id == 100) {
      setProductsState(allProducts);
      return;
    }

    const newProducts = allProducts.filter(
      (prod) => prod.categories_products[0].categories_id === id,
    );
    setProductsState(newProducts);
  };

  return (
    <div>
      <nav className="flex my-2 mb-6 text-sm">
        <Link href="/home" className="text-gray-400">
          Home
        </Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/company/products" className="text-red-700 font-bold">
          Company - Products
        </Link>
      </nav>
      <div>
        <div className="flex flex-row justify-between">
          <div>
            <h2 className="text-3xl font-bold">Your Products</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
            </p>
          </div>
          <div>
            <div className="flex gap-1 mt-5">
              <button
                onClick={() => handleDateFilter()}
                className="aspect-square h-10 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center"
              >
                {currentOrder === true ? (
                  <CalendarArrowUp />
                ) : (
                  <CalendarArrowDown />
                )}
              </button>
              <div className="flex">
                <div className="flex items-center justify-center rounded-l-sm px-2 bg-gray-100 border border-gray-200">
                  <select
                    onChange={(e) =>
                      handleCategoryFilter(Number(e.target.value))
                    }
                  >
                    <option value={100}>All Categories</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="h-full border-gray-200 border-t border-b border-r pl-2 pr-30 "
                    placeholder="Search your Products..."
                  />
                  <button className="aspect-square h-10 bg-red-700 rounded-r-sm flex items-center justify-center">
                    <Search className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          {productsState.map((prod) => (
            <ProductCard product={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { OwnProducts };
