"use client";

import { startCheckoutSession } from "@/actions/stripe"

const CheckoutButton = () => {
    
  const handleCheckout = async () => {
    await startCheckoutSession()
  };

  return (
    <button
      className="px-10 py-3 bg-red-700 text-white"
      onClick={() => handleCheckout()}
    >
      Proceed to Checkout
    </button>
  );
};

export { CheckoutButton };
