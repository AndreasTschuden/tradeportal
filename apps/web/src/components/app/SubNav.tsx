"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

const SubNav = () => {
	return (
		<nav className="bg-red-700 min-h-[5vh] py-2 h-full w-full md:px-30 px-5 flex items-center justify-between">
			<div className="flex items-center gap-5">
				<div className="flex gap-3 items-center">
					<Menu className="text-white" />
					<h1 className="text-white font-normal text-sm">All Categories</h1>
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
