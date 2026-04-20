"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { changeCartItemQuantity, deleteCartItem } from "@/actions/cart";

const ProductCard = ({ prod }: { prod: cartItemsWithAvgStars }) => {
	const router = useRouter();
	const [currentQuantity, setCurrentQuantity] = useState(prod.quantity);

	const attrName =
		prod.products.specifications.variants[prod.product_variant][
			prod.products.specifications.attributes[0].name
		];
	const imgName = prod.products.specifications.attributes[0].images[attrName];

	const itemPrice =
		prod.products.base_price *
		prod.products.specifications.variants[prod.product_variant].priceModifier;

	console.log(
		prod.products.specifications.variants[prod.product_variant].priceModifier,
	);

	useEffect(() => {
		const timeout = setTimeout(async () => {
			try {
				await changeCartItemQuantity({
					customerId: prod.customers_id,
					productId: prod.products_id,
					variant: prod.product_variant,
					quantity: currentQuantity,
				});
				router.refresh();
			} catch (error) {
				console.error("Failed to update quantity", error);
				toast.error("Failed to update quantity");
			}
		}, 400);

		return () => clearTimeout(timeout);
	}, [
		currentQuantity,
		router.refresh,
		prod.products_id,
		prod.product_variant,
		prod.customers_id,
	]);

	return (
		<div className="grid w-full grid-cols-1 gap-4 py-3 sm:grid-cols-[2fr_1fr_1fr_1fr_80px] sm:items-center">
			{/* PRODUCT */}
			<div className="flex items-center gap-4 sm:gap-6">
				<div className="relative h-24 w-24 overflow-hidden rounded-md bg-gray-100 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
					<Image
						src={`${process.env.NEXT_PUBLIC_MINIO_PICTURE_BASE_URL}/images/products/${imgName}`}
						alt={prod.products.name}
						fill
						className="object-cover"
					/>
				</div>

				<div className="min-w-0">
					<p className="text-lg font-bold sm:text-xl">{prod.products.name}</p>

					<div className="mt-2 space-y-1 text-sm text-gray-500">
						{prod.products.specifications.attributes.map(
							(attr: Record<string, string>) => (
								<p key={attr.name}>
									{attr.name}:{" "}
									<span className="text-black">
										{
											prod.products.specifications.variants[
												prod.product_variant
											][attr.name]
										}
									</span>
								</p>
							),
						)}
					</div>
				</div>
			</div>

			<p className="font-medium text-lg sm:text-center">
				{prod.products.currency === "EUR" ? "€" : "$"} {itemPrice}
			</p>

			<div className="flex sm:justify-center">
				<div className="flex items-center border rounded-md overflow-hidden">
					<button
						type="button"
						className="px-3 py-1 text-lg border-r hover:bg-gray-100"
						onClick={() => setCurrentQuantity((prev) => Math.max(1, prev - 1))}
					>
						−
					</button>

					<input
						type="number"
						min={1}
						value={currentQuantity}
						onChange={(e) => {
							const val = e.target.value;

							if (val === "") {
								setCurrentQuantity(1);
								return;
							}

							const num = Number(val);

							if (!Number.isNaN(num) && num >= 1) {
								setCurrentQuantity(num);
							}
						}}
						className="w-12 text-center outline-none"
					/>

					<button
						type="button"
						className="px-3 py-1 text-lg border-l hover:bg-gray-100"
						onClick={() => setCurrentQuantity((prev) => prev + 1)}
					>
						+
					</button>
				</div>
			</div>

			<p className="font-semibold text-lg sm:text-center">
				{prod.products.currency === "EUR" ? "€" : "$"}{" "}
				{currentQuantity * itemPrice}
			</p>

			<div className="flex sm:justify-center">
				<button
					type="button"
					className="border w-8 h-8 flex items-center justify-center text-red-500"
					onClick={async () => {
						try {
							await deleteCartItem({
								customerId: prod.customers_id,
								productId: prod.products_id,
								variant: prod.product_variant,
							});
							toast.success("Item removed from cart!");
							router.refresh();
						} catch (error) {
							if (error instanceof Error) {
								console.error("Error removing item from cart:", error.message);
								toast.error("Failed to remove item from cart.");
							}
						}
					}}
				>
					×
				</button>
			</div>
		</div>
	);
};

export { ProductCard };
