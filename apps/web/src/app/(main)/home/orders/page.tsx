import React from "react";
import { customerOrders } from "@/actions/customer-account";
import { toast } from "sonner";

const page = () => {
  try {
    const orders = customerOrders();
  } catch (error: any) {
    if (error.message == "NEXT_REDIRECT") return;
    if (error instanceof Error) {
      toast.error("Failed to get orders", {
        description: error.message,
      });
    } else {
      toast.error("Failed to get orders", {
        description: "Further info in the console",
      });
      console.error(error);
    }
  }

  return <div>page</div>;
};

export default page;
