import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TradePortal | Sign In",
  description: "Access your TradePortal buyer or seller account securely.",
};

export default function SigninLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
