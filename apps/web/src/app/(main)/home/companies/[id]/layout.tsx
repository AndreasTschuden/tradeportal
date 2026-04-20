import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "TradePortal | Company Profile",
	description:
		"Detailed information about a TradePortal company and its offerings.",
};

export default function CompanyProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <section>{children}</section>;
}
