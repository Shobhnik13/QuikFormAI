import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuikFormAI",
  description: "The only form builder you need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <SessionProvider> */}
      <Providers>
      <body className={inter.className}>{children}</body>
      </Providers>
      {/* </SessionProvider> */}
    </html>
  );
}
