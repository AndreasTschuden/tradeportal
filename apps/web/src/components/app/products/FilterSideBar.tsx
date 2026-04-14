"use client";

import { Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterSideBar = ({
	categories,
	companies,
}: {
	categories: CategoryType[];
	companies: companyType[];
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [showAll, setShowAll] = useState(false);
	const [selected, setSelected] = useState<string[]>([]);
	const [minPrice, setMinPrice] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");
	const visibleCategories = showAll ? categories : categories.slice(0, 5);

	useEffect(() => {
		const companyParam = searchParams.get("company");
		setSelected(companyParam ? [companyParam] : []);
		setMinPrice(searchParams.get("minPrice") || "");
		setMaxPrice(searchParams.get("maxPrice") || "");
	}, [searchParams]);

	const handleClearFilters = () => {
		router.push("?category=0");
		router.refresh();
	};

	const updateFilter = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		router.push(`?${params.toString()}`);
	};

	const selectCompany = (companyId: string) => {
		const params = new URLSearchParams(searchParams.toString());
		setSelected([companyId]);
		params.set("company", companyId);
		router.push(`?${params.toString()}`);
	};

	const handlePriceChange = (key: "minPrice" | "maxPrice", value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		router.push(`?${params.toString()}`);
	};

	return (
		<nav className="w-2/8 flex flex-col gap-2">
			<div className="w-full border-b border-gray-500 flex justify-between items-center">
				<h3 className="text-2xl font-bold">Filters</h3>
				<button
					onClick={handleClearFilters}
					className="text-gray-400 font-light"
				>
					Clear all
				</button>
			</div>

			<div className="border-b border-gray-500 pb-3">
				<h4 className="font-normal text-lg mb-2">Categories</h4>
				<div className="flex flex-col gap-1">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={searchParams.get("category") === "0"}
							onChange={() => updateFilter("category", "0")}
							className="accent-red-600 checked:accent-red-700 scale-150"
						/>
						<span>All Categories</span>
					</label>
					{visibleCategories.map((cat) => {
						const selectedCategory = searchParams.get("category");
						return (
							<label key={cat.id} className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={selectedCategory === String(cat.id)}
									onChange={() => {
										if (selectedCategory === String(cat.id)) {
											updateFilter("category", "");
										} else {
											updateFilter("category", String(cat.id));
										}
									}}
									className="accent-red-600 checked:accent-red-700 scale-150"
								/>
								<span>{cat.name}</span>
							</label>
						);
					})}
				</div>
				{categories.length > 5 && (
					<button
						type="button"
						onClick={() => setShowAll((prev) => !prev)}
						className="text-sm text-gray-500 underline mt-2"
					>
						{showAll ? "View less" : "View more"}
					</button>
				)}
			</div>

			<div className="border-b border-gray-500 pb-3">
				<h4 className="font-normal text-lg">Company</h4>
				{companies.map((comp) => (
					<div
						key={comp.id}
						className={`cursor-pointer p-2 rounded ${
							selected[0] === comp.id ? "bg-red-200 font-semibold" : ""
						}`}
						onClick={() => selectCompany(comp.id)}
					>
						{comp.company_name}
					</div>
				))}
			</div>

			<div className="border-b border-gray-500 pb-3">
				<h4 className="font-normal text-lg">Minimum Rating</h4>
				<div className="flex flex-col gap-1 mt-1">
					{[5, 4, 3, 2, 1].map((rating) => (
						<label
							key={rating}
							className="flex items-center gap-2 cursor-pointer"
						>
							<input
								type="checkbox"
								className="accent-red-600 scale-150"
								checked={Number(searchParams.get("rating")) === rating}
								onChange={() => {
									const params = new URLSearchParams(searchParams.toString());
									if (Number(searchParams.get("rating")) === rating) {
										params.delete("rating");
									} else {
										params.set("rating", String(rating));
									}
									router.push(`?${params.toString()}`);
								}}
							/>
							<div className="flex items-center gap-0.5">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										size={20}
										fill={i < rating ? "orange" : "lightgray"}
										stroke="none"
									/>
								))}
							</div>
						</label>
					))}
				</div>
			</div>

			<div className="">
				<h4 className="font-normal text-lg mb-2">Price Range</h4>
				<div className="flex gap-2">
					<div className="flex-1 flex flex-col gap-1 p-2 border border-gray-300 rounded-sm">
						<label className="text-gray-600 text-sm">Min Price</label>
						<div className="flex items-center gap-1">
							<span className="text-gray-600">$</span>
							<input
								type="number"
								className="w-full rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-red-500"
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
								onBlur={(e) => handlePriceChange("minPrice", e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handlePriceChange("minPrice", e.currentTarget.value);
									}
								}}
							/>
						</div>
					</div>
					<div className="flex-1 flex flex-col gap-1 p-2 border border-gray-300 rounded-sm">
						<label className="text-gray-600 text-sm">Max Price</label>
						<div className="flex items-center gap-1">
							<span className="text-gray-600">$</span>
							<input
								type="number"
								className="w-full rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-red-500"
								value={maxPrice}
								onChange={(e) => setMaxPrice(e.target.value)}
								onBlur={(e) => handlePriceChange("maxPrice", e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handlePriceChange("maxPrice", e.currentTarget.value);
									}
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export { FilterSideBar };
