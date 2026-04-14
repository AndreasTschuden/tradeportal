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
		<nav className="bg-white border-b border-gray-300 border-t-2 h-[10vh] flex items-center justify-between md:px-30 px-5">
			<div className="">
				<Link href="/home" className="text-2xl font-bold">
					TradePortal<strong className="text-red-700">.</strong>
				</Link>
			</div>
			<div className="flex items-center gap-15">
				<SearchField />
				<div className="flex gap-5">
					{result === "/home/account" ? (
						<Link
							href="/home/cart"
							className="flex gap-2 items-center justify-center"
						>
							<ShoppingCart size={40} strokeWidth={1} />
							<div className="relative">
								<h2 className="font-light">Cart</h2>
								<p className="font-bold">$ --,--</p>
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

					<div className="h-12 bg-gray-300 w-0.5"></div>
					<Link
						href={result}
						className="flex gap-2 items-center justify-center"
					>
						<UserRound size={40} strokeWidth={1} />
						<div className="">
							<h2 className="font-light">
								{result === "/home/account" ? "User" : "Company"}
							</h2>
							<p className="font-bold">Account</p>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export { MainNav };
