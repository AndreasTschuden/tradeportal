// app/(main)/home/layout.tsx
import { SubNav } from "@/components/app/SubNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-[5vh]">
        <SubNav />
      </div>
      <div className="py-2 md:px-30 px-5">
  {children}
  </div>;
    </>
  );
}