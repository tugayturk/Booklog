"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Header />}
      <main className="grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
