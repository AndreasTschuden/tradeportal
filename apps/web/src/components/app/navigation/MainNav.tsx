import { ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { handleUserLink } from "@/actions/auth";
import { getCartItemsCount } from "@/actions/cart";
import SearchField from "./SearchField";

const MainNav = async () => {
	const result = await handleUserLink();
	const cartItemsCount = await getCartItemsCount();
	// const cartItemsPriceSum = await getCartItemsPriceSum();

	console.log(cartItemsCount);
	console.log(result);

	return (
		<nav className="border-b border-gray-300 border-t-2 bg-white px-4 py-3 sm:px-5 md:px-30">
			<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
				<Link href="/home" className="text-xl font-bold sm:text-2xl">
					TradePortal<strong className="text-red-700">.</strong>
				</Link>
				<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-10">
					<SearchField />
					<div className="flex items-center justify-between gap-4 sm:justify-start sm:gap-5">
					{result === "/home/account" ? (
						<Link
							href="/home/cart"
							className="flex items-center justify-center gap-2"
						>
							<ShoppingCart className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1} />
							<div className="relative">
								<h2 className="font-light">Cart</h2>
								<p className="font-bold">Items</p>
								{cartItemsCount !== null && (
									<div className="bg-gray-200 font-bold text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs absolute top-0 -left-5.5 ">
										{cartItemsCount}
									</div>
								)}
							</div>
						</Link>
					) : (
						<div className="font-light flex items-center"> No Cart</div>
					)}

						<div className="h-10 w-0.5 bg-gray-300 sm:h-12" />
					<Link
						href={result}
						className="flex items-center justify-center gap-2"
					>
						<UserRound className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1} />
						<div className="">
							<h2 className="font-light">
								{result === "/home/account" ? "User" : "Company"}
							</h2>
							<p className="font-bold">Account</p>
						</div>
					</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export { MainNav };
