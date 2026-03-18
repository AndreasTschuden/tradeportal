import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "TradePortal | Company Overview",
  description: "Overview and tools for company-specific interactions on TradePortal.",
};

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-2 md:px-30 px-5">
      {children}
    </div>
  );
}
