import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "TradePortal | Company Account",
	description: "See Your Companys Profile and edit them",
};

export default function CompanyAccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <section>{children}</section>;
}
