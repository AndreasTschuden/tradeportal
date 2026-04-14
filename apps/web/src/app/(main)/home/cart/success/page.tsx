import Link from "next/link";
import { redirect } from "next/navigation";
import { clearCart } from "@/actions/cart";
import { updateOrderStatus } from "@/actions/orders";
import { verifyStripeSession } from "@/lib/verify-session";

interface Props {
	searchParams: Promise<{ session_id?: string; orderId?: string }>;
}

const SuccessPage = async ({ searchParams }: Props) => {
	const { session_id, orderId } = await searchParams;

	if (!session_id || !orderId) {
		redirect("/home/cart");
	}

	await updateOrderStatus(orderId);

	const result = await verifyStripeSession(session_id);

	if (!result.success) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-2xl font-bold text-red-600">
					Zahlung fehlgeschlagen
				</h1>
				<p>{result.message}</p>
				<Link href="/home/cart" className="mt-4 text-blue-500 underline">
					Zurück zum Warenkorb
				</Link>
			</div>
		);
	}

	await clearCart();

	return (
		<div className="max-w-7xl mx-auto px-4">
			<nav className="flex my-4 text-sm">
				<Link href="/home" className="text-gray-400">
					Home
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href="/home/cart" className="text-red-700 font-bold">
					Cart
				</Link>
			</nav>

			<div className="flex flex-col gap-10">
				<div className="flex flex-col gap-10">
					<div className="h-px bg-gray-300 w-full"></div>
					<div className="flex gap-20 items-center justify-center">
						<div className="flex gap-5 items-center justify-center">
							<div className="bg-gray-200 text-black font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
								1
							</div>
							<h1 className="text-xl font-bold">CART ITEMS</h1>
						</div>
						<div className="flex gap-5 items-center justify-center">
							<div className="bg-gray-200 text-black font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
								2
							</div>
							<h1 className="text-xl font-bold">CHECKOUT</h1>
						</div>
						<div className="flex gap-5 items-center justify-center">
							<div className="bg-red-700 text-white font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
								3
							</div>
							<h1 className="text-xl font-bold">ORDER COMPLETE</h1>
						</div>
					</div>
					<div className="h-px bg-gray-300 w-full"></div>
				</div>

				<div className="text-center py-10">
					<h2 className="text-3xl font-bold mb-4">
						Vielen Dank für deine Bestellung!
					</h2>
					<p className="text-gray-600">
						Die Bestellung ist erfolgreich abgeschlossen.
					</p>
					<div className="flex gap-3 items-center justify-center">
						<Link
							href="/home"
							className="mt-8 inline-block bg-red-700 text-white px-8 py-3 rounded-md font-medium"
						>
							Weiter einkaufen
						</Link>
						<Link
							href="/home/orders"
							className="mt-8 inline-block border border-red-700 text-red-700 px-8 py-3 rounded-md font-medium"
						>
							Bestellung ansehen
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessPage;
