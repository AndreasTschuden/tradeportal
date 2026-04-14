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
			<header className="min-h-[3vh] flex md:px-30 px-5 justify-between py-2 bg-gray-100">
				<h1>USD | EUR</h1>
				<h2>+43 680 1201010</h2>
			</header>
			<nav className="bg-white border-b border-gray-300 border-t-2 h-[10vh] flex items-center justify-center md:px-30 px-5">
				<div>
					<Link href="/home" className="text-2xl font-bold">
						TradePortal<strong className="text-red-700">.</strong>
					</Link>
				</div>
			</nav>
			<div className="py-4 md:px-30 px-5 min-h-screen">{children}</div>
			<footer className="bg-gray-200 h-[40vh] flex items-center justify-center md:px-30 px-5">
				<h1>Footer</h1>
			</footer>
		</>
	);
}
