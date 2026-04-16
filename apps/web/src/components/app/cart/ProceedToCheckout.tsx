"use client";

import { toast } from "sonner";
import { createOrder } from "@/actions/orders";

const ProceedToCheckout = () => {
	const handleOnClick = async () => {
		try {
			await createOrder();
		} catch (error) {
			if (error instanceof Error) {
				const messages = error.message.split("\n");
				if (error.message === "NEXT_REDIRECT") {
					return;
				}
				messages.forEach((msg) => {
					toast.error(<span className="text-red-500">{msg}</span>);
				});
			}
		}
	};

	return (
		<button
			type="button"
			onClick={handleOnClick}
			className="inline-block border bg-red-700 text-white px-10 py-3 font-light"
		>
			Proceed To Checkout
		</button>
	);
};

export { ProceedToCheckout };
