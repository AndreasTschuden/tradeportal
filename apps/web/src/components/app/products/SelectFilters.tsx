"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SelectFilters = ({ categories }: { categories: CategoryType[] }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateFilter = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		router.push(`?${params.toString()}`);
	};

	return (
		<div className="mt-8 flex gap-5">
			<div className="flex gap-1 items-center">
				<p className="text-gray-400">Categories:</p>
				<select
					name=""
					id=""
					className="text-red-700"
					onChange={(e) => updateFilter("category", e.target.value)}
					defaultValue={searchParams.get("category") || ""}
				>
					<option value={0}>All Categories</option>
					{categories.map((cat) => (
						<option value={cat.id} key={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>
			<div className="flex gap-1 items-center">
				<p className="text-gray-400">Sort by:</p>
				<select
					name=""
					id=""
					className="text-red-700"
					onChange={(e) => updateFilter("sort", e.target.value)}
					defaultValue={searchParams.get("sort") || ""}
				>
					<option value="newest">Newest</option>
					<option value="latest">Latest</option>
				</select>
			</div>
		</div>
	);
};

export { SelectFilters };
