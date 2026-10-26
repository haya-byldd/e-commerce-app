import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // connects to globals.css
});

export const metadata: Metadata = {
  title: "Shop",
  description: "A simple e-commerce store",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children} <Toaster richColors position="top-center" /></body>
    </html>
  );
}