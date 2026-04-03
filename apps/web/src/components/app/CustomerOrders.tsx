"use client";
import React from "react";
import { useState, useEffect } from "react";
import { customerOrders } from "@/actions/customer-account";
import { toast } from "sonner";
import Link from "next/link";

type Orders = {
  id: string;
  customers_id: string;
  order_date: Date;
  shipped_date: Date | null;
  shipper: string;
  tracking_number: string;
  status: string;
  shipped_to: string;
  created_at: Date;
  updated_at: Date;
  orders_products: {
    products_id: string;
    orders_id: string;
    product_variant: number;
    unit_price: number;
    quantity: number;
    discount: number;
    specifications: any;
    products: {
      name: string;
      currency: string;
    };
  }[];
}[];

const CustomerOrders = () => {
  const [orders, setOrders] = useState<Orders | null>();
  const [totalPrice, setTotalPrice] = useState<number[]>([]);
  const [displayArr, setDisplayArr] = useState<Orders | null>();
  const [orderStatusFilter, setOrderStatusFilter] = useState<string[]>();
  const [nameFilter, setNameFilter] = useState<string>();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await customerOrders();
        const ordersResponse: Orders = JSON.parse(response);
        setOrders(ordersResponse);
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

  useEffect(() => {
    if (orders) {
      console.log(orderStatusFilter);
      const orderArrAfterStatus = orderStatusFilter
        ? orders.filter((obj) =>
            orderStatusFilter.some((str) => obj.status.includes(str)),
          )
        : orders;
      console.log(orderArrAfterStatus);
      const orderArrAfterName =
        nameFilter != "" && nameFilter
          ? orderArrAfterStatus.map((object) => ({
              ...object,
              orders_products: object.orders_products.filter((obj) =>
                obj.products.name.includes(nameFilter),
              ),
            }))
          : orderArrAfterStatus;
      console.log(orderArrAfterName);
      setTotalPrice([])
      orderArrAfterName.map((obj) => {
        let price = 0;
        obj.orders_products.map((obj) => {
          price += obj.quantity * obj.unit_price * (1 - obj.discount);
        });
        setTotalPrice((prev) => [...prev, price]);
      });
      setDisplayArr(orderArrAfterName);
    }
  }, [orderStatusFilter, nameFilter, orders]);

  return (
    <>
      <div className="flex relative">
        <div className="flex flex-col">
          <div className="text-gray-400">
            Home / <span className="text-red-600">Orders</span>
          </div>
          <p className="text-5xl font-bold mt-3 mb-1.5">Your Orders</p>
          <p className="text-gray-400 text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="flex mt-2 gap-2">
            <button
              className="bg-gray-200 rounded-xl px-4 py-2 hover:bg-gray-300"
              onClick={() => setOrderStatusFilter(["completed"])}
            >
              Completed
            </button>
            <button
              className="bg-gray-200 rounded-xl px-4 py-2 hover:bg-gray-300"
              onClick={() => setOrderStatusFilter(["pending", "shipped"])}
            >
              Pending
            </button>
            <button
              className="bg-gray-200 rounded-xl px-4 py-2 hover:bg-gray-300"
              onClick={() => setOrderStatusFilter(["cancelled"])}
            >
              Cancelled
            </button>
          </div>
        </div>
        <input
          type="text"
          className="bg-gray-100 absolute inset-y-0 right-0 rounded-xl h-[25%] self-center p-4"
          placeholder="Filter for Item names"
          onChange={(event) => setNameFilter(event.target.value.trim())}
        />
      </div>
      {typeof displayArr != "string" && displayArr ? (
        displayArr.map((obj, index) => (
          <div className="border rounded-xl mt-6" key={obj.id}>
            <div className="flex mt-2 mx-4 gap-auto gap-[20%]">
              {" "}
              {/*Ka ohnung wie i dos center, des deina Andi*/}
              <div className="flex flex-col">
                <p>Order date</p>
                <p className="text-black font-semibold">
                  {new Date(obj.order_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex flex-col">
                <p>Total amount</p>
                <p className="text-black font-semibold">
                  {totalPrice[index] +
                    ` ${obj.orders_products[index].products.currency}`}
                </p>
              </div>
              <div className="flex flex-col">
                <p>Ship to</p>
                <p className="text-black font-semibold">{obj.shipped_to}</p>
              </div>
              <div className="flex flex-col">
                <p>Tracking number</p>
                <p className="text-black font-semibold">
                  {obj.tracking_number}
                </p>
              </div>
            </div>
            <div className="border border-gray-200 mx-4 my-6"></div>
            <div className="flex ml-4">
              <p className="text-4xl font-bold pr-1">
                {obj.shipped_date
                  ? " shipped " + obj.shipped_date
                  : "Not shipped yet"}
              </p>{" "}
              {/*Dont knw how to put the text to the bottom, your job andi*/}
              <p>
                <span className="text-gray-300 text-xl font-semibold ml-3">
                  shipper:
                </span>{" "}
                {obj.shipper}{" "}
              </p>
            </div>
            <div className="ml-4">
              {obj.orders_products.map((obj) => (
                <div
                  className="flex my-4"
                  key={obj.orders_id + obj.products_id + obj.product_variant}
                >
                  <img
                    src={obj.specifications.image}
                    alt=""
                    className="h-40 w-40"
                  />
                  <div className="flex flex-col ml-4">
                    <p className="font-bold text-xl">{obj.products.name}</p>
                    <p className="text-gray-400">
                      Variant:{" "}
                      {Object.keys(obj.specifications)
                        .filter(
                          (key) =>
                            key != "image" &&
                            key != "available" &&
                            key != "priceModifier",
                        )
                        .map((key) => `${key}: ${obj.specifications[key]} `)}
                    </p>
                    <p className="text-gray-400 mt-auto">
                      Quantity: {obj.quantity}
                    </p>
                    <p className="text-gray-400 mb-auto">
                      Price: {obj.unit_price * (1 - obj.discount)}
                    </p>
                    <Link
                      className="text-red-600 hover:underline"
                      href={"/home/products/product/" + obj.products_id}
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <>loading...</>
      )}
    </>
  );
};

export default CustomerOrders;
