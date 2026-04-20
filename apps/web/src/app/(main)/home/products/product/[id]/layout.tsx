import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "TradePortal | Product Detail",
	description:
		"Detailed information, reviews, and recommendations for a single product.",
};

export default function ProductDetailLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="">{children}</div>;
}
