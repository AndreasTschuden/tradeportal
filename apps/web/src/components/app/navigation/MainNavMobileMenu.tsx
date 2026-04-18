"use client";

import { Menu, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import SearchField from "./SearchField";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type MainNavMobileMenuProps = {
	userLink: string;
	cartItemsCount: number | null;
};

const MainNavMobileMenu = ({
	userLink,
	cartItemsCount,
}: MainNavMobileMenuProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					type="button"
					aria-label="Open navigation menu"
					className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2"
				>
					<Menu className="h-6 w-6" />
				</button>
			</DialogTrigger>

			<DialogContent className="!left-auto !right-0 !top-0 !h-screen !w-[85vw] !max-w-sm !translate-x-0 !translate-y-0 !rounded-none">
				<DialogHeader>
					<DialogTitle>Navigation</DialogTitle>
				</DialogHeader>

				<div className="mt-2 flex flex-col gap-4">
					<SearchField />

					{userLink === "/home/account" ? (
						<Link
							href="/home/cart"
							className="flex items-center gap-3 rounded-md border border-gray-200 p-3"
						>
							<ShoppingCart className="h-7 w-7" strokeWidth={1} />
							<div className="relative">
								<h2 className="font-light">Cart</h2>
								<p className="font-bold">Items</p>
								{cartItemsCount !== null && (
									<div className="absolute -left-5.5 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-red-700">
										{cartItemsCount}
									</div>
								)}
							</div>
						</Link>
					) : (
						<div className="rounded-md border border-gray-200 p-3 font-light">
							No Cart
						</div>
					)}

					<Link
						href={userLink}
						className="flex items-center gap-3 rounded-md border border-gray-200 p-3"
					>
						<UserRound className="h-7 w-7" strokeWidth={1} />
						<div>
							<h2 className="font-light">
								{userLink === "/home/account" ? "User" : "Company"}
							</h2>
							<p className="font-bold">Account</p>
						</div>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default MainNavMobileMenu;
