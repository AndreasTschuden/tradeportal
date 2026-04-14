import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "TradePortal | Checkout",
	description:
		"Securely complete your purchase and enter payment details on TradePortal.",
};

export default function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="min-h-screen py-4 md:px-30 px-5">{children}</section>
	);
}
