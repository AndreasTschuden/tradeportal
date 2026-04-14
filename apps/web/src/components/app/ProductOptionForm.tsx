"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addToCart } from "@/actions/cart";
import { variantOptionSchema } from "@/lib/zod";

const ProductOptionForm = ({ product }: { product: detailedProductType }) => {
	const [cartCounter, setCartCounter] = useState<number>(1);
	const [toggleFavourite, setToggleFavourite] = useState<boolean>(false);

	const initialObj = product.specifications.attributes.reduce(
		(acc: Record<string, string>, attr: any) => {
			acc[attr.name] = attr.values[0];
			return acc;
		},
		{},
	);

	const [selectedAttributes, setSelectedAttributes] =
		useState<Record<string, string>>(initialObj);

	const findVariantIndex = (attributes: Record<string, string>) => {
		return product.specifications.variants.findIndex(
			(v: any) =>
				Object.entries(attributes).every(([key, val]) => v[key] === val) &&
				v.available === true,
		);
	};

	const [currentVariant, setCurrentVariant] = useState<number | null>(null);
	const [variantAvailable, setVariantAvailable] = useState<boolean>(true);

	useEffect(() => {
		const index = findVariantIndex(initialObj);
		setCurrentVariant(index !== -1 ? index : null);
		setVariantAvailable(index !== -1);
	}, [initialObj, findVariantIndex]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(variantOptionSchema),
	});

	const handleSelectChange = (name: string, value: string) => {
		const newAttributes = {
			...selectedAttributes,
			[name]: value,
		};

		setSelectedAttributes(newAttributes);

		const index = findVariantIndex(newAttributes);

		setCurrentVariant(index !== -1 ? index : null);
		setVariantAvailable(index !== -1);
	};

	const onSubmit = async (_data: any) => {
		if (!variantAvailable) return;

		try {
			const result = await addToCart(
				product.id,
				currentVariant ?? 0,
				cartCounter,
			);

			if (result === "updated") {
				toast.success("Cart item updated successfully!");
			} else if (result === "added") {
				toast.success("Item added to cart successfully!");
			} else if (result === "customer_not_found") {
				toast.error("Customer not found. Please sign in again.");
				redirect("/home");
			}
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "NEXT_REDIRECT") {
					redirect("/home");
				} else {
					toast.error(error.message);
				}
			}
		}
	};

	return (
		<div className="flex flex-col gap-3 justify-between h-full mt-10 mb-5">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-between h-full"
			>
				<div className="flex flex-col gap-5">
					{product.specifications.attributes.map((attr: any, index: number) => (
						<div key={attr.name}>
							<div className="flex justify-between mb-1">
								<p>{attr.name}</p>

								<select
									{...register(`options.${index}.value`, {
										onChange: (e) =>
											handleSelectChange(attr.name, e.target.value),
									})}
									defaultValue={attr.values[0]}
								>
									{attr.values.map((option: string) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
							<div className="border border-gray-300"></div>
						</div>
					))}

					{!variantAvailable && (
						<div className="text-red-500">
							Diese Variante ist nicht mehr verfügbar
						</div>
					)}

					{errors.options && (
						<div className="text-red-500">
							{errors.options.message || "Please select valid options."}
						</div>
					)}

					{errors.quantity && (
						<div className="text-red-500">
							{errors.quantity.message || "Please enter a valid quantity."}
						</div>
					)}
				</div>

				<div className="flex flex-col gap-3">
					<p className="font-bold text-4xl">
						{product.currency === "EUR" ? "€" : "$"} {product.base_price}
					</p>

					<div className="flex gap-7 h-15">
						<button
							className="w-full bg-red-700 rounded-xl text-white font-medium flex items-center justify-center gap-2"
							type="submit"
						>
							<ShoppingCart />
							<p>Add to cart</p>
						</button>

						<div className="flex w-2/4 justify-between items-center">
							<button
								type="button"
								className="bg-gray-200 h-full w-full rounded-l-xl text-3xl"
								onClick={() => setCartCounter((prev) => prev + 1)}
							>
								+
							</button>

							<input
								type="text"
								className="w-full text-center border-y-2 border-gray-200 text-3xl h-full outline-none"
								value={cartCounter}
								{...register("quantity", {
									onChange: (e) => {
										const val = e.target.value;

										if (val === "") {
											setCartCounter(0);
											return;
										}

										const num = Number(val);
										if (!Number.isNaN(num) && num >= 1) {
											setCartCounter(num);
										}
									},
								})}
							/>

							<button
								type="button"
								className="bg-gray-200 h-full w-full rounded-r-xl text-3xl"
								onClick={() =>
									setCartCounter((prev) => (prev > 1 ? prev - 1 : 1))
								}
							>
								-
							</button>
						</div>

						<button
							type="button"
							className="bg-gray-200 aspect-square rounded-xl flex justify-center items-center"
							onClick={() => setToggleFavourite((prev) => !prev)}
						>
							{toggleFavourite ? <Heart stroke="0" fill="red" /> : <Heart />}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export { ProductOptionForm };
