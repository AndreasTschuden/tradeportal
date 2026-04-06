import Image from "next/image";
import { NewArrivalList } from "@/components/app/NewArrivalList";
import { ProductsList } from "@/components/app/ProductsList";
import { getNewestProducts } from "@/actions/products";
import { getProducts } from "@/actions/products";

const HomePage = async () => {
  const newestProducts: newestProductsType[] = await getNewestProducts();
  const products: productWithStatsType[] = await getProducts();

  return (
    <div className="flex justify-between my-5 flex-col">
      <div className="bg-gray-300 w-full aspect-video rounded-md relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Shop product photo"
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-5">
        <div
          className="flex items-center my-5 gap-5"
          id="explore-products-section"
        >
          <div className="w-5 h-10 bg-red-700 rounded-md"></div>
          <p className="text-red-700 font-bold xl:text-2xl text-md">
            Product's
          </p>
        </div>
        <div className="xl:text-4xl text-xl font-bold mb-10">
          Explore Products
        </div>
        <ProductsList products={products} />
        <div className="flex items-center my-5 gap-5" id="new-arrival-section">
          <div className="w-5 h-10 bg-red-700 rounded-md"></div>
          <p className="text-red-700 font-bold xl:text-2xl text-md">Featured</p>
        </div>
        <div className="xl:text-4xl text-xl font-bold mb-10">New Arrival</div>
        <NewArrivalList newestProducts={newestProducts} />
      </div>
    </div>
  );
};

export default HomePage;
