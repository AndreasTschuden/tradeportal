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
			<header className="min-h-[3vh] flex md:px-30 px-5 justify-between py-2 bg-gray-100">
				<h1>USD | EUR</h1>
				<h2>+43 680 1201010</h2>
			</header>
			<MainNav />
			<main>{children}</main>
			<div className="md:px-30 px-5 bg-gray-100">
				<Footer />
			</div>
		</>
	);
}
