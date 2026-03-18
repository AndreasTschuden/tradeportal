import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TradePortal | Cart",
  description: "Review items, adjust quantities, and prepare for checkout on TradePortal.",
};

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="py-4 md:px-30 px-5">{children}</section>
  );
}
