import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "TradePortal | Companies Directory",
	description: "Search and compare TradePortal companies and their offerings.",
};

export default function CompaniesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="py-2 md:px-30 px-5">{children}</div>;
}
