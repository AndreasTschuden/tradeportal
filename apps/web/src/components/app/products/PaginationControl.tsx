"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ResponsivePagination from "react-responsive-pagination";

const PaginationControl = ({
	totalPages,
	currentPage,
}: {
	totalPages: number;
	currentPage: number;
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const itemsPerPage = 4;

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());

		if (page) {
			params.set("page", String(page));
		} else {
			params.delete("page");
		}

		router.push(`?${params.toString()}`);
	};

	return (
		<ResponsivePagination
			total={totalPages}
			current={currentPage}
			onPageChange={handlePageChange}
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
	);
};

export { PaginationControl };
