"use client";

import { createOrder } from "@/actions/orders";
import { toast } from "sonner";

const ProceedToCheckout = () => {
  const handleOnClick = async () => {
    try {
      await createOrder();
    } catch (error) {
      if (error instanceof Error) {
        const messages = error.message.split("\n");

        messages.forEach((msg) => {
          toast.error(
           <span>{msg}</span>
          );
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
