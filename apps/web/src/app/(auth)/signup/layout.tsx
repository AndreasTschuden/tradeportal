import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "TradePortal | Sign Up",
	description:
		"Create a buyer account to explore TradePortal offers and suppliers.",
};

export default function SignupLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
