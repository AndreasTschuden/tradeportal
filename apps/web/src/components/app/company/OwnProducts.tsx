"use client";

import { CalendarArrowDown, CalendarArrowUp, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { ProductCard } from "@/components/app/company/ProductCard";

const OwnProducts = ({
	products,
	categories,
}: {
	products: productsForCompanyType[];
	categories: CategoryType[];
}) => {
	const [currentOrder, setCurrentOrder] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<number>(100);
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 10;

	const filteredProducts = useMemo(() => {
		let filtered = [...products];

		if (selectedCategory !== 100) {
			filtered = filtered.filter(
				(prod) =>
					prod.categories_products[0]?.categories_id === selectedCategory,
			);
		}

		if (search.trim() !== "") {
			filtered = filtered.filter((p) =>
				p.name.toLowerCase().includes(search.toLowerCase()),
			);
		}

		filtered.sort((a, b) => {
			const dateA = new Date(a.created_at ?? 0).getTime();
			const dateB = new Date(b.created_at ?? 0).getTime();
			return currentOrder ? dateA - dateB : dateB - dateA;
		});

		return filtered;
	}, [products, selectedCategory, search, currentOrder]);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory, search, currentOrder]);

	const handleDateFilter = () => {
		setCurrentOrder((prev) => !prev);
	};

	const handleCategoryFilter = (id: number) => {
		setSelectedCategory(id);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentPage(1);
	};

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
	const start = (currentPage - 1) * itemsPerPage;
	const currentProducts = filteredProducts.slice(start, start + itemsPerPage);

	return (
		<div>
			<nav className="flex my-2 mb-6 text-sm">
				<Link href="/home" className="text-gray-400">
					Home
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href="/home/company/account" className="text-gray-400">
					Company - Account
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href="/home/company/products" className="text-red-700 font-bold">
					Company - Products
				</Link>
			</nav>

			<div>
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
					<div>
						<h2 className="text-2xl font-bold sm:text-3xl">Your Products</h2>
						<p className="text-gray-400">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr
						</p>
					</div>

					<div>
						<div className="mt-2 flex flex-wrap gap-1 md:mt-5">
							<button
								type="button"
								onClick={handleDateFilter}
								className="aspect-square h-10 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center"
							>
								{currentOrder ? <CalendarArrowUp /> : <CalendarArrowDown />}
							</button>

							<div className="flex w-full flex-1 sm:w-auto sm:flex-none">
								<div className="flex items-center justify-center rounded-l-sm border border-gray-200 bg-gray-100 px-2">
									<select
										value={selectedCategory}
										onChange={(e) =>
											handleCategoryFilter(Number(e.target.value))
										}
									>
										<option value={100}>All Categories</option>
										{categories.map((cat: CategoryType) => (
											<option key={cat.id} value={cat.id}>
												{cat.name}
											</option>
										))}
									</select>
								</div>

								<form
									className="flex min-w-0 flex-1 sm:flex-none"
									onSubmit={handleSearchSubmit}
								>
									<input
										type="text"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className="h-full min-w-0 flex-1 border-b border-r border-t border-gray-200 pl-2 pr-2 sm:w-64 sm:flex-none"
										placeholder="Search your Products..."
									/>
									<button
										type="submit"
										className="aspect-square h-10 bg-red-700 rounded-r-sm flex items-center justify-center"
									>
										<Search className="text-white" />
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-3 overflow-y-auto">
					{currentProducts.map((prod) => (
						<ProductCard product={prod} key={prod.id} />
					))}
					<div className="flex justify-center">
						<ResponsivePagination
							total={totalPages}
							current={currentPage}
							onPageChange={setCurrentPage}
							containerClassName="flex justify-center gap-2 mt-6"
							pageItemClassName="inline-flex items-center rounded-md border text-sm"
							pageLinkClassName="px-3 py-2"
							activeItemClassName="font-bold text-red-700"
							inactiveItemClassName="border-gray-300 text-gray-700 hover:bg-red-700 hover:border-red-700 hover:text-white"
							disabledItemClassName="pointer-events-none border-gray-200 text-gray-400 opacity-50"
							previousClassName="bg-red-700 border-red-700 text-white"
							nextClassName="bg-red-700 border-red-700 text-white"
							navClassName="text-white"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { OwnProducts };
