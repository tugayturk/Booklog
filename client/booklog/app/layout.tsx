import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { LibraryProvider } from "@/context/LibraryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookLog",
  description: "A quiet library for thoughtful readers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LibraryProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            </LibraryProvider>
          </ThemeProvider>
          <ToastProvider />
      </body>
    </html>
  );
}
