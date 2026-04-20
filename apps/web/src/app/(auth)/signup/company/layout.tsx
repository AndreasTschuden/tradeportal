import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "TradePortal | Company Sign Up",
	description:
		"Register your company to publish and manage products on TradePortal.",
};

export default function SignupCompanyLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
