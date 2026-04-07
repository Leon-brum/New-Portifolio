import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leonardo Moreno | Full Stack Developer",
  description: "Full Stack Developer com quase 2 anos de experiência, especializado em React, Next.js, Node.js e cloud com AWS.",
  keywords: ["developer", "portfolio", "full stack", "react", "next.js", "typescript", "node.js"],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="noise animated-gradient min-h-screen w-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
