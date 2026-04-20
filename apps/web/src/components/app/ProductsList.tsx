import Link from "next/link";
import { ProductCard } from "@/components/app/ProductCard";

const ProductsList = ({ products }: { products: productWithStatsType[] }) => {
	return (
		<div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{products.map((prod) => (
					<ProductCard prod={prod} key={prod.id} />
				))}
			</div>
			<div className="flex items-center justify-center">
				<Link
					href="/home/products"
					className="mt-4 flex w-full justify-center rounded-md bg-red-700 py-4 text-white sm:w-72 lg:w-80 lg:py-5"
				>
					View all Products
				</Link>
			</div>
		</div>
	);
};

export { ProductsList };
