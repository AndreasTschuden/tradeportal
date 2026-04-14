import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "TradePortal | Account",
	description: "View and update your TradePortal account settings and profile.",
};

export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <section className="py-4 md:px-30 px-5">{children}</section>;
}
