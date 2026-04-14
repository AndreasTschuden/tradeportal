import Link from "next/link";
import { ProductCard } from "@/components/app/ProductCard";

const ProductsList = ({ products }: { products: productWithStatsType[] }) => {
	return (
		<div>
			<div className="grid xl:grid-cols-4 grid-cols-2 gap-4">
				{products.map((prod) => (
					<ProductCard prod={prod} key={prod.id} />
				))}
			</div>
			<div className="flex items-center justify-center">
				<Link
					href="/home/products"
					className="lg:py-5 py-4 lg:w-80 w-60 bg-red-700 text-white rounded-md mt-4 flex justify-center"
				>
					View all Products
				</Link>
			</div>
		</div>
	);
};

export { ProductsList };
