"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getCategories } from "@/actions/categories";

type Categories = {
	id: number;
	name: string;
	description: string | null;
}[];

const SubNav = () => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState("All Categories");
	const [categories, setCategories] = useState<Categories>();

	useEffect(() => {
		const getResponse = async () => {
			try {
				const categories = await getCategories();
				setCategories(categories);
			} catch (error: unknown) {
				toast.error("Error while getting categories");
				setCategories([]);
			}
		};

		getResponse();
	}, []);

	const handeClick = (id: number) => {
		setOpen(false);
		router.push(`/home/products/?category=${id}`);
	};

	const router = useRouter();

	return (
		<nav className="flex min-h-[5vh] h-full w-full items-center justify-between gap-4 bg-red-700 px-4 py-2 sm:px-5 md:px-30">
			<div className="flex items-center gap-3 sm:gap-5">
				<div className="relative">
					{/* Trigger */}
					<button
						type="button"
						onClick={() => setOpen((prev) => !prev)}
						className="flex items-center gap-2 text-white"
					>
						<Menu className="text-white" />
						<span className="text-sm font-normal">{selected}</span>
					</button>

					{/* Dropdown */}
					{open && categories !== undefined && (
						<div className="absolute left-0 z-50 mt-2 grid w-[calc(100vw-2.5rem)] max-w-md grid-cols-1 gap-2 overflow-hidden rounded-md bg-white shadow-lg sm:grid-cols-2">
							{categories.map((cat) => (
								<button
									type="button"
									key={cat.id}
									onClick={() => handeClick(cat.id)}
									className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
								>
									{cat.name}
								</button>
							))}
						</div>
					)}
				</div>
				<div className="flex gap-4">
					<Link href="home/products" className="text-white font-normal text-sm">
						Products
					</Link>
				</div>
			</div>
			<div className="lg:block hidden">
				<div className="flex md:gap-4">
					<button
						type="button"
						className="text-white font-normal text-sm"
						onClick={() =>
							document
								.getElementById("new-arrival-section")
								?.scrollIntoView({ behavior: "smooth" })
						}
					>
						New Arrival
					</button>
					<button
						type="button"
						className="text-white font-normal text-sm"
						onClick={() =>
							document
								.getElementById("explore-products-section")
								?.scrollIntoView({ behavior: "smooth" })
						}
					>
						Explore Products
					</button>
					<button
						type="button"
						className="text-white font-normal text-sm"
						onClick={() =>
							document
								.getElementById("gurantees-section")
								?.scrollIntoView({ behavior: "smooth" })
						}
					>
						Guarantees
					</button>
				</div>
			</div>
		</nav>
	);
};

export { SubNav };
