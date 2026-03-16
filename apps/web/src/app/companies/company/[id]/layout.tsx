import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Company",
  description: "This Page shows one specific Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
