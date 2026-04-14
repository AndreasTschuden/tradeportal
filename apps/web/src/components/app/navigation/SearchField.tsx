"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchField = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!searchQuery.trim()) return;

		const params = new URLSearchParams(searchParams.toString());
		const trimmed = searchQuery.toString().trim();
		params.set("search", trimmed);

		router.push(`/home/products?${params.toString()}`);
	};

	return (
		<form
			className="flex p-2 border border-[#808080] rounded-sm px-4"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				placeholder="Search Products..."
				className="font-light outline-none"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<button type="submit">
				<Search strokeWidth={1} color="#808080" />
			</button>
		</form>
	);
};

export default SearchField;
