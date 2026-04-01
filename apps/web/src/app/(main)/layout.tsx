import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "TradePortal | Marketplace",
  description: "Explore TradePortal's featured products, companies, and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="min-h-[3vh] flex md:px-30 px-5 justify-between py-2">
        <h1>USD</h1>
        <h2>TEL</h2>
      </header>
      <nav className="bg-gray-200 h-[10vh] flex items-center justify-between md:px-30 px-5">
        <h1>TradePortal</h1>
        <h2>Links / User / Cart</h2>
      </nav>
      <main>{children}</main>
      <footer className="bg-gray-200 h-[40vh] flex items-center justify-center md:px-30 px-5">
        <h1>Footer</h1>
      </footer>
    </>
  );
}
