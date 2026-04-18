import type { Metadata } from "next";
import Image from "next/image";
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
	return (
		<div className="flex min-h-screen">
			<div className="w-full px-4 sm:px-8 lg:w-1/2 lg:px-20 xl:px-40">
				{children}
			</div>

			<div className="w-1/2 relative lg:block hidden">
				<Image
					src="https://images.unsplash.com/photo-1773291934086-69f15a425ec4?q=80&w=1287&auto=format&fit=crop"
					alt=""
					fill
					className="object-cover"
				/>
			</div>
		</div>
	);
}
