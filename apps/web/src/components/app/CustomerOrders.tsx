"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { customerOrders } from "@/actions/customer-account";

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
			setTotalPrice([]);
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
					<nav className="flex my-2 mb-4 text-sm">
						<Link href="/home" className="text-gray-400">
							Home
						</Link>
						<p className="px-3 text-gray-400">/</p>
						<Link href="/home/orders" className="text-red-700 font-bold">
							Orders
						</Link>
					</nav>
					<div className="flex flex-row justify-between">
						<div>
							<h2 className="text-3xl font-bold">Your Orders</h2>
							<p className="text-gray-400">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr
							</p>
						</div>
					</div>
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
			{displayArr?.map((order, index) => (
				<div key={order.id} className="border rounded-2xl mt-6 p-6 ">
					{/* TOP BAR */}
					<div className="grid grid-cols-5 gap-6 items-center text-sm">
						<div>
							<p className="text-gray-400">Order Date:</p>
							<p className="font-semibold">
								{new Date(order.order_date).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</p>
						</div>

						<div>
							<p className="text-gray-400">Total Amount:</p>
							<p className="font-semibold">$ {totalPrice[index]?.toFixed(2)}</p>
						</div>

						<div className="col-span-2">
							<p className="text-gray-400">Ship to:</p>
							<p className="font-semibold">{order.shipped_to}</p>
						</div>

						<div className="flex justify-between items-center">
							<div>
								<p className="text-gray-400">Tracking Number:</p>
								<p className="font-semibold">#{order.tracking_number}</p>
							</div>

							<span
								className={`ml-4 px-4 py-1 rounded-lg text-sm font-medium
            ${
							order.status === "completed"
								? "bg-green-200 text-green-700"
								: order.status === "cancelled"
									? "bg-red-200 text-red-600"
									: "bg-amber-200 text-amber-600"
						}`}
							>
								{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
							</span>
						</div>
					</div>

					{/* DIVIDER */}
					<div className="border-t my-6"></div>

					{/* SHIPPING LINE */}
					<div className="flex items-center gap-4 mb-6">
						<h2 className="text-2xl font-bold">
							{order.shipped_date
								? `Shipped ${new Date(order.shipped_date).toLocaleDateString(
										"en-US",
										{ month: "long", day: "numeric", year: "numeric" },
									)}`
								: "Not shipped yet"}
						</h2>

						<p className="text-gray-500">
							<span className="text-gray-400">Shipped by:</span> {order.shipper}
						</p>
					</div>

					{/* PRODUCTS */}
					<div className="flex flex-col gap-6">
						{order.orders_products.map((item) => (
							<div
								key={item.orders_id + item.products_id + item.product_variant}
								className="flex gap-6"
							>
								<img
									src={item.specifications.image}
									alt=""
									className="w-32 h-32 bg-gray-200 rounded-lg object-cover"
								/>

								<div className="flex flex-col">
									<p className="font-bold text-lg">{item.products.name}</p>

									<p className="text-gray-500 mt-1">
										Variante:{" "}
										{Object.keys(item.specifications)
											.filter(
												(key) =>
													key !== "image" &&
													key !== "available" &&
													key !== "priceModifier" &&
													key !== "sellerId",
											)
											.map((key) => `${key} - ${item.specifications[key]}`)
											.join(", ")}
									</p>

									<p className="text-gray-500 mt-2">
										Quantity : {item.quantity}
									</p>

									<p className="text-gray-500">
										Price : {item.unit_price * (1 - item.discount)} $
									</p>

									<Link
										href={"/home/products/product/" + item.products_id}
										className="text-red-600 mt-3 hover:underline"
									>
										View Product
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</>
	);
};

export default CustomerOrders;
