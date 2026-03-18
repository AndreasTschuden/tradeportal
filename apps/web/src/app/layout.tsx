import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import ReCaptchaProvider from "@/components/app/ReCaptchaProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// tailwindcss classes:
// font-normal = inter regular
// font-medium = inter medium
// font-bold = inter bold

export const metadata: Metadata = {
  title: "TradePortal | Global Marketplace",
  description:
    "TradePortal connects verified buyers and companies with curated products and services worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <script src="https://js.stripe.com/clover/stripe.js" async></script>
      </head>
      <body className={inter.variable}>
        <ReCaptchaProvider>{children}</ReCaptchaProvider>
      </body>
    </html>
  );
}
