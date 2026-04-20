import type { Metadata } from "next";
import { Guarantees } from "@/components/app/Guarantees";
import { SubNav } from "@/components/app/SubNav";

export const metadata: Metadata = {
	title: "TradePortal | Home Navigation",
	description: "Quick links to TradePortal sections and featured categories.",
};

export default function HomeSubnavLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="min-h-[5vh]">
				<SubNav />
			</div>
			<div className="py-2 md:px-30 px-5">{children}</div>
			<div className="h-full">
				<Guarantees />
			</div>
		</>
	);
}
