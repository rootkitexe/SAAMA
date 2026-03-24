import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
  title: "SAAMA Seattle Festival",
  description: "The Largest Indian Classical Music Festival outside India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black flex flex-col items-center pt-8`}
      >
        <div className="w-full max-w-[1024px] flex flex-col mb-16 rounded-2xl overflow-hidden shadow-2xl border border-[#faf5eb]/10">
          <Navbar />
          <main className="flex-1 w-full bg-transparent">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

