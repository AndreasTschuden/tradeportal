import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "TradePortal | Terms of Service",
	description:
		"Read the TradePortal terms and conditions that govern use of the platform.",
};

export default function TermsLayout({
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
			<nav className="flex items-center justify-center border-b border-gray-300 border-t-2 bg-white px-4 py-3 sm:px-5 md:px-30">
				<div>
					<Link href="/home" className="text-2xl font-bold">
						TradePortal<strong className="text-red-700">.</strong>
					</Link>
				</div>
			</nav>
			<div className="min-h-screen px-4 py-4 sm:px-5 md:px-30">{children}</div>
			<footer className="flex min-h-[25vh] items-center justify-center bg-gray-200 px-4 py-8 sm:px-5 md:px-30">
				<h1>Footer</h1>
			</footer>
		</>
	);
}
