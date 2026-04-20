import type { Metadata } from "next";
import { MainNav } from "@/components/app/navigation/MainNav";
import "@/app/globals.css";
import Footer from "@/components/app/Footer";

export const metadata: Metadata = {
	title: "TradePortal | Marketplace",
	description:
		"Explore TradePortal's featured products, companies, and services.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<header className="flex min-h-[3vh] flex-wrap justify-between gap-2 bg-gray-100 px-4 py-2 sm:px-5 md:px-30">
				<h1>USD | EUR</h1>
				<h2>+43 680 1201010</h2>
			</header>
			<MainNav />
			<main>{children}</main>
			<div className="bg-gray-100 px-4 sm:px-5 md:px-30">
				<Footer />
			</div>
		</>
	);
}
