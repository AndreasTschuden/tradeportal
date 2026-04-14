import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "TradePortal | Authentication",
	description: "Sign in or register to access your TradePortal account.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
