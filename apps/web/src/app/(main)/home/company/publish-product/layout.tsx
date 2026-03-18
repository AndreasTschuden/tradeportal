import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Publish Product - Company",
  description: "Publish a product others can buy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
