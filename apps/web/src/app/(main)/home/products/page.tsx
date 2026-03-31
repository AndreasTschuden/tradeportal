import { getAllProducts } from "@/actions/products";
import Link from "next/link";
import { ProductCard } from "@/components/app/ProductCard"

const ProductsPage = async () => {

  const products = await getAllProducts();

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
        <nav className="w-2/8 flex flex-col gap-2">
          <div className="w-full border-b border-gray-500 flex justify-between items-center">
            <h3 className="text-2xl font-bold">Filters</h3>
            <p className="text-gray-400">Clear</p>
          </div>
          <div className="border-b border-gray-500">
            <h4 className="font-normal text-lg">Categories</h4>
          </div>
          <div className="border-b border-gray-500">
            <h4 className="font-normal text-lg">Minimum Rating</h4>
          </div>
          <div className="border-b border-gray-500">
            <h4 className="font-normal text-lg">Price Range</h4>
          </div>
        </nav>
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl font-bold">Products</h2>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr
              </p>
            </div>
            <div className="mt-8 flex gap-5">
              <div className="flex gap-1 items-center">
                <p className="text-gray-400">Categories:</p>
                <select name="" id="" className="text-red-700">
                  <option value="">Electronic</option>
                </select>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-gray-400">Sort by:</p>
                <select name="" id="" className="text-red-700">
                  <option value="">Newest</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 w-full gap-3">
            {products.map(prod => (
                <ProductCard prod={prod} key={prod.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
