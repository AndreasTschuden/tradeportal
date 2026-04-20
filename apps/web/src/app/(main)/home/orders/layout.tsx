import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "TradePortal | Orders",
	description:
		"Track your order history, status, and delivery updates on TradePortal.",
};

export default function OrdersLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <section className="py-4 md:px-30 px-5">{children}</section>;
}
