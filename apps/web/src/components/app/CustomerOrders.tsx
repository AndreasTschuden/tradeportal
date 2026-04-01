"use client";
import React from "react";
import { useState, useEffect } from "react";
import { customerOrders } from "@/actions/customer-account";
import { toast } from "sonner";

type Orders = {
  id: string;
  customers_id: string;
  order_date: Date;
  shipped_date: Date | null;
  shipper: string;
  tracking_number: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}[];

const CustomerOrders = () => {
  const [orders, setOrders] = useState<Orders | null>();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await customerOrders();
        setOrders(response);
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
    };
    getResponse();
  }, []);

  return (
  <>
  {orders ? 
  orders.map((obj) => 
  <div key={obj.id}>
  <p>{obj.id}</p>
  </div>
  ) 
  : 
  <>
  loading...
  </>
  }
  </>
  );
};

export default CustomerOrders;
