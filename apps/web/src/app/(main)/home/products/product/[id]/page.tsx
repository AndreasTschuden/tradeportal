import { Star, Truck } from "lucide-react";
import Link from "next/link";
import {
	getDetailedProduct,
	getFourProductsByCategory,
} from "@/actions/products";
import { getReviews } from "@/actions/reviews";
import { CompanyCard } from "@/components/app/CompanyCard";
import { DescriptionReviewsSwitch } from "@/components/app/DescriptionReviewsSwitch";
import { PictureList } from "@/components/app/PictureList";
import { ProductOptionForm } from "@/components/app/ProductOptionForm";
import { YouMayAlsoLike } from "@/components/app/YouMayAlsoLike";

interface PageProps {
	params: { id: string };
}

const ProductDetailPage = async ({ params }: PageProps) => {
	const { id } = await params;

	const product: detailedProductType | null = await getDetailedProduct(id);
	if (product === null) {
		return <div>Product not Found</div>;
	}
	const reviews: ReviewType[] = await getReviews(product.id);
	const products: productWithStatsType[] = await getFourProductsByCategory(
		product.categories_products[0].categories.id,
		product.id,
	);

	return (
		<div>
			<nav className="flex my-2 mb-4 text-sm">
				<Link href="/home" className="text-gray-400">
					Home
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href="/home/products" className="text-gray-400">
					Products
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href="/home/products" className="text-red-700 font-bold">
					{product.name}
				</Link>
			</nav>

			<div className="flex gap-15 lg:flex-row flex-col">
				{/* <PictureList product={product}/> */}
				<div className="lg:w-1/2 w-full">
					<PictureList images={product.specifications.attributes[0].images} />
					<CompanyCard
						id={product.companies.id}
						company_name={product.companies.company_name}
						address={product.companies.address || ""}
					/>
				</div>

				<div className="lg:w-1/2 w-full flex flex-col justify-between">
					<div className="flex flex-col justify-between h-full">
						<div className="flex flex-col gap-3">
							<h1 className="text-4xl font-medium">{product.name}</h1>
							{product._count.reviews !== 0 ? (
								<p className="flex gap-1 items-center">
									{[1, 2, 3, 4, 5].map(
										(i) =>
											product.avgStars && (
												<Star
													key={i}
													fill={i <= product.avgStars ? "orange" : "lightgray"}
													stroke="0"
													size={20}
												/>
											),
									)}
									<span className="text-gray-500 text-lg">
										{product._count.reviews}{" "}
										{product._count.reviews === 1 ? "Review" : "Reviews"}
									</span>
								</p>
							) : (
								<span className="text-gray-500 text-sm">No Reviews yet</span>
							)}
							<div className="w-full wrap-break-word overflow-y-auto max-h-40">
								{product.short_description}
							</div>
						</div>
						<ProductOptionForm product={product} />
					</div>
					<div className="flex flex-col gap-5">
						<p className="text-sm flex items-center gap-2">
							<Truck strokeWidth={1} />
							Free delivery on orders over $40.0
						</p>
					</div>
				</div>
			</div>

			<div className="mt-20 mb-20">
				<DescriptionReviewsSwitch
					reviews={reviews}
					reviewCount={product._count.reviews}
					longDescription={product.long_description}
					productId={product.id}
				/>
			</div>

			<div>
				<YouMayAlsoLike products={products} />
			</div>
		</div>
	);
};

export default ProductDetailPage;
