import { ProductCard } from "@/components/app/ProductCard";

const YouMayAlsoLike = ({ products }: { products: productWithStatsType[] }) => {
	return (
		<div className="flex flex-col gap-5">
			<h2 className="text-2xl font-bold sm:text-3xl">You may also like</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{products.map((prod) => (
					<ProductCard prod={prod} key={prod.id} />
				))}
			</div>
		</div>
	);
};

export { YouMayAlsoLike };
