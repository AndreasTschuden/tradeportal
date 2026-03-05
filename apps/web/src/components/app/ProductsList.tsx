import React from "react";
import { getProducts } from "@/app/actions/products";
import { ShoppingCart } from "lucide-react"

const ProductsList = async () => {
  const products = await getProducts();
  console.log(products);

  return (
    <div>
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-4">
        {products.map((prod) => (
          <div key={prod.id} className="">
            <div className="relative group bg-gray-100 w-full aspect-square rounded-md overflow-hidden">
              <button
                className="absolute bottom-0 left-0 w-full h-13 bg-red-700 
                  flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  rounded-b-md"
              >
                <p className="text-white font-medium flex gap-3"><ShoppingCart />Add to Cart</p>
              </button>
            </div>
            <h2 className="font-bold mt-1">{prod.name}</h2>
            <p className="text-red-700 font-bold">
              {prod.currency === "EUR" ? "€" : "$"} 130
            </p>
            <p>no reviews yet</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="lg:py-5 py-4 lg:w-80 w-60 bg-red-700 text-white rounded-md mt-4">
          View all Products
        </button>
      </div>
    </div>
  );
};

export { ProductsList };
