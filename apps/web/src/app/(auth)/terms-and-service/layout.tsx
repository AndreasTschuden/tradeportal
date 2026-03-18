import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TradePortal | Terms of Service",
  description:
    "Read the TradePortal terms and conditions that govern use of the platform.",
};

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-4 md:px-30 px-5 min-h-screen">{children}</div>
  );
}
