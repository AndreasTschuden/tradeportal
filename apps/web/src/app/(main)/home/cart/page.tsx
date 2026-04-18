import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCartItems } from "@/actions/cart";
import { ProceedToCheckout } from "@/components/app/cart/ProceedToCheckout";
import { ProductCard } from "@/components/app/cart/ProductCard";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

const ShoppingCartPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/signin");
	}

	const customer = await db.user.customers.findFirst({
		where: {
			id: session.user.id,
		},
	});

	if (!customer) {
		redirect("/home");
	}

	const products = await getCartItems(session.user.id);

	const totalPrice = products.reduce((total, prod) => {
		const price =
			prod.products.base_price *
			prod.products.specifications.variants[prod.product_variant].priceModifier;
		const quantity = prod.quantity;
		return total + price * quantity;
	}, 0);

	return (
		<div>
			<nav className="flex my-2 mb-4 text-sm">
				<Link href="/home" className="text-gray-400">
					Home
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href="/home/cart" className="text-red-700 font-bold">
					Cart
				</Link>
			</nav>
			<div>
				<div className="flex flex-col gap-10">
					<div className="h-px bg-gray-300 w-full"></div>
					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 lg:gap-20">
						<div className="flex items-center justify-center gap-3 sm:gap-5">
							<div className="bg-red-700 text-white font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
								1
							</div>
							<h1 className="text-base font-bold sm:text-xl">CART ITEMS</h1>
						</div>
						<div className="flex items-center justify-center gap-3 sm:gap-5">
							<div className="bg-gray-200 text-black font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
								2
							</div>
							<h1 className="text-base font-bold sm:text-xl">CHECKOUT</h1>
						</div>
						<div className="flex items-center justify-center gap-3 sm:gap-5">
							<div className="bg-gray-200 text-black font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
								3
							</div>
							<h1 className="text-base font-bold sm:text-xl">ORDER COMPLETE</h1>
						</div>
					</div>
					<div className="h-px bg-gray-300 w-full"></div>
				</div>
				<div>
					<div className="w-full mt-15">
						<div className="hidden items-center grid-cols-[2fr_1fr_1fr_1fr_80px] sm:grid">
							<p>Product</p>
							<p className="text-center">Price</p>
							<p className="text-center">Quantity</p>
							<p className="text-center">Total</p>
							<p className="text-center">Delete</p>
						</div>
						<div className="h-px bg-gray-300 w-full mt-2"></div>
					</div>
					<main className="min-w-0">
						<div className="mt-5 mb-5">
							{products.length > 0 ? (
								products.map((prod) => (
									<div
										key={`${prod.customers_id}-${prod.products_id}-${prod.product_variant}`}
									>
										<ProductCard prod={prod} />
										<div className="h-px bg-gray-300 w-full mt-1"></div>
									</div>
								))
							) : (
								<div>
									<p className="text-center text-gray-500">
										Your cart is empty.
									</p>
								</div>
							)}
						</div>
						{products.length > 0 && (
							<div className="flex flex-col items-start justify-end gap-2 sm:items-end">
								<p className="text-xl font-medium flex gap-5 items-baseline-last justify-center">
									<span>TOTAL:</span>
									<strong className="text-3xl font-medium">
										${totalPrice.toFixed(2)}
									</strong>
								</p>
								<ProceedToCheckout />
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCartPage;
