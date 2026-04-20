"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { customerOrders } from "@/actions/customer-account";

type Orders = {
	id: string;
	created_at: Date;
	updated_at: Date;
	orders_products: {
		specifications: Record<string, string>;
		products: {
			name: string;
			currency: string;
		};
		products_id: string;
		orders_id: string;
		product_variant: number;
		unit_price: number;
		quantity: number;
		discount: number;
	}[];
	customers_id: string;
	order_date: Date;
	shipped_date: Date | null;
	shipper: string;
	tracking_number: string;
	status: string;
	shipped_to: string;
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
			} catch (error: unknown) {
				if (error instanceof Error && error.message === "NEXT_REDIRECT") return;
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
				nameFilter !== "" && nameFilter
					? orderArrAfterStatus.map((object) => ({
							...object,
							orders_products: object.orders_products.filter((obj) =>
								obj.products.name.includes(nameFilter),
							),
						}))
					: orderArrAfterStatus;
			console.log(orderArrAfterName);
			setTotalPrice([]);
			orderArrAfterName.forEach((obj) => {
				let price = 0;
				obj.orders_products.forEach((obj) => {
					price += obj.quantity * +obj.unit_price * (1 - +obj.discount);
				});
				setTotalPrice((prev) => [...prev, price]);
			});
			setDisplayArr(orderArrAfterName);
		}
	}, [orderStatusFilter, nameFilter, orders]);

	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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
							<h2 className="text-2xl font-bold sm:text-3xl">Your Orders</h2>
							<p className="text-gray-400">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr
							</p>
						</div>
					</div>
					<div className="mt-2 flex flex-wrap gap-2">
						<button
							type="button"
							className="bg-gray-200 rounded-xl px-4 py-2 hover:bg-gray-300"
							onClick={() => setOrderStatusFilter(["completed"])}
						>
							Completed
						</button>
						<button
							type="button"
							className="bg-gray-200 rounded-xl px-4 py-2 hover:bg-gray-300"
							onClick={() => setOrderStatusFilter(["pending", "shipped"])}
						>
							Pending
						</button>
						<button
							type="button"
							className="bg-gray-200 rounded-xl px-4 py-2 hover:bg-gray-300"
							onClick={() => setOrderStatusFilter(["cancelled"])}
						>
							Cancelled
						</button>
					</div>
				</div>
				<input
					type="text"
					className="h-12 w-full rounded-xl bg-gray-100 p-4 md:mt-10 md:w-72 lg:w-80"
					placeholder="Filter for Item names"
					onChange={(event) => setNameFilter(event.target.value.trim())}
				/>
			</div>
			{displayArr
				?.map((order) => {
					const filteredProducts = order.orders_products.filter((item) =>
						nameFilter && nameFilter !== ""
							? item.products.name.includes(nameFilter)
							: true,
					);

					return {
						...order,
						orders_products: filteredProducts,
						totalPrice: filteredProducts.reduce(
							(sum, item) =>
								sum +
								item.quantity *
									Number(item.unit_price) *
									(1 - Number(item.discount)),
							0,
						),
					};
				})
				.filter((order) => order.orders_products.length > 0)
				.map((order) => (
					<div key={order.id} className="mt-6 rounded-2xl border p-4 sm:p-6">
						{/* TOP BAR */}
						<div className="grid grid-cols-1 items-start gap-4 text-sm md:grid-cols-5 md:items-center md:gap-6">
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
								<p className="font-semibold">$ {order.totalPrice.toFixed(2)}</p>
							</div>

							<div className="md:col-span-2">
								<p className="text-gray-400">Ship to:</p>
								<p className="font-semibold">{order.shipped_to}</p>
							</div>

							<div className="flex items-center justify-between md:justify-end md:gap-4">
								<div>
									<p className="text-gray-400">Tracking Number:</p>
									<p className="font-semibold">#{order.tracking_number}</p>
								</div>

								<span
									className={`rounded-lg px-4 py-1 text-sm font-medium md:ml-4
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
						<div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
							<h2 className="text-xl font-bold sm:text-2xl">
								{order.shipped_date
									? `Shipped ${new Date(order.shipped_date).toLocaleDateString(
											"en-US",
											{ month: "long", day: "numeric", year: "numeric" },
										)}`
									: "Not shipped yet"}
							</h2>

							<p className="text-gray-500">
								<span className="text-gray-400">Shipped by:</span>{" "}
								{order.shipper}
							</p>
						</div>

						{/* PRODUCTS */}
						<div className="flex flex-col gap-6">
							{order.orders_products.map((item) => (
								<div
									key={item.orders_id + item.products_id + item.product_variant}
									className="flex flex-col gap-4 sm:flex-row sm:gap-6"
								>
									<Image
										src={
											`${process.env.NEXT_PUBLIC_MINIO_PICTURE_BASE_URL}/images/products/` +
											item.specifications.image
										}
										alt={item.products.name}
										width={128}
										height={128}
										className="h-28 w-28 rounded-lg bg-gray-200 object-cover sm:h-32 sm:w-32"
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
											Price :{" "}
											{(
												Number(item.unit_price) *
												(1 - Number(item.discount))
											).toFixed(2)}{" "}
											$
										</p>

										<Link
											href={`/home/products/product/${item.products_id}`}
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
