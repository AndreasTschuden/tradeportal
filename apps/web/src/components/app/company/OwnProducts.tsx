"use client";

import { ProductCard } from "@/components/app/company/ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarArrowDown, CalendarArrowUp, Search } from "lucide-react";

const OwnProducts = ({
  products,
  categories,
}: {
  products: productsForCompanyType[];
  categories: CategoryType[];
}) => {
  const [productsState, setProductsState] = useState(products);
  const [allProducts] = useState(products);

  const [currentOrder, setCurrentOrder] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number>(100);


  const applyFilters = () => {
    let filtered = [...allProducts];


    if (selectedCategory !== 100) {
      filtered = filtered.filter(
        (prod) =>
          prod.categories_products[0].categories_id === selectedCategory
      );
    }


    if (search !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }


    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at ?? 0).getTime();
      const dateB = new Date(b.created_at ?? 0).getTime();

      return currentOrder ? dateA - dateB : dateB - dateA;
    });

    setProductsState(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [search, selectedCategory, currentOrder]);

  const handleDateFilter = () => {
    setCurrentOrder((prev) => !prev);
  };

  const handleCategoryFilter = (id: number) => {
    setSelectedCategory(id);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div>
      <nav className="flex my-2 mb-6 text-sm">
        <Link href="/home" className="text-gray-400">
          Home
        </Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/company/account" className="text-gray-400">
          Company - Account
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
                onClick={handleDateFilter}
                className="aspect-square h-10 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center"
              >
                {currentOrder ? <CalendarArrowUp /> : <CalendarArrowDown />}
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

                <form className="flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-full border-gray-200 border-t border-b border-r pl-2 pr-30"
                    placeholder="Search your Products..."
                  />
                  <button
                    type="submit"
                    className="aspect-square h-10 bg-red-700 rounded-r-sm flex items-center justify-center"
                  >
                    <Search className="text-white" />
                  </button>
                </form>
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