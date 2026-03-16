import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Product Detail Page",
  description: "This Page shows the details of an picked product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
  {children}
  </>);
}
