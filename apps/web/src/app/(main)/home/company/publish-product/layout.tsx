import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "TradePortal | Publish Product",
  description: "Verified companies can add new products to their TradePortal catalog.",
};

export default function PublishProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
