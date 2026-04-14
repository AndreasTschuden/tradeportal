"use client";

import { SquarePen, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { updateProductAvailability } from "@/actions/products";

const ProductCard = ({ product }: { product: productWithStatsType }) => {
	const [enabled, setEnabled] = useState(product.isactive ? true : false);

	const handleActiveToggle = async () => {
		try {
			await updateProductAvailability(!enabled, product.id);
			setEnabled((prev) => !prev);
			toast.success(`Your product is now ${!enabled ? "active" : "inactive"}`);
		} catch (e) {
			if (e instanceof Error) {
				toast.error(e.message);
			} else {
				console.log(e);
			}
		}
	};

	return (
		<div className="flex justify-between p-3 border-gray-400 border rounded-2xl items-center px-5">
			<div className="relative h-20 aspect-square">
				<Image
					src={`https://minio.tschudea.de:8999/images/products/${Object.values(product.specifications.attributes[0].images)[0]}`}
					alt={product.name}
					fill
					className="object-cover rounded-xl"
				/>
			</div>
			<div>
				<h2 className="font-bold">{product.name}</h2>
				<p className="text-gray-400">Product Name</p>
			</div>
			<div>
				<h2 className="font-bold">
					{product.currency === "EUR" ? "€" : "$"}
					{product.base_price}
				</h2>
				<p className="text-gray-400">Base Price</p>
			</div>
			<div>
				<h2 className="font-bold">
					{product.specifications.attributes.map(
						(attr: Record<string, string>) => (
							<p key={attr.name}>{attr.name}</p>
						),
					)}
				</h2>
				<p className="text-gray-400">Options</p>
			</div>
			<div>
				<h2 className="font-bold">
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
						<span>No Reviews yet</span>
					)}
				</h2>
				<p className="text-gray-400">Reviews</p>
			</div>
			<div>
				<h2 className="font-bold">
					{product.created_at &&
						new Date(product.created_at).toLocaleDateString("de-DE")}
				</h2>
				<p className="text-gray-400">Publish at</p>
			</div>
			<div className="flex gap-2 justify-center items-center">
				{/* <button className="p-1 aspect-square rounded-full bg-gray-100 h-full">
          <SquarePen height={18} color="blue" />
        </button> */}
				<button
					onClick={() => handleActiveToggle()}
					className={`w-16 h-8 flex items-center rounded-full p-1 duration-300 transition-colors ${
						enabled ? "bg-green-500" : "bg-gray-300"
					}`}
				>
					<div
						className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
							enabled ? "translate-x-8" : "translate-x-0"
						}`}
					></div>
				</button>
			</div>
		</div>
	);
};

export { ProductCard };
