"use client";

import { createOrder } from "@/actions/orders";

const ProceedToCheckout = () => {
	const handleOnClick = async () => {
		await createOrder();
	};

	return (
		<button
			type="button"
			onClick={() => handleOnClick()}
			className="inline-block border bg-red-700 text-white px-10 py-3 font-light"
		>
			Proceed To Checkout
		</button>
	);
};

export { ProceedToCheckout };
