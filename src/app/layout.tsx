export const revalidate = 86400; // 👈 Ensures ISR is enabled for the entire page

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import HeaderWrapper from "@/components/headerWrapper/headerWrapper";
import Footer from "@/components/footer/footer";

import "./globals.css";

const roboto = Roboto({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "The Jet Lag Chronicles",
  description: "A curated collection of travel experiences and tips.",
  openGraph: {
    title: "The Jet Lag Chronicles",
    description: "A curated collection of travel experiences and tips.",
    url: "https://jetlag-fe.vercel.app/",
    siteName: "My Travel Blog",
    images: [
      {
        url: "https://jetlag-fe.vercel.app/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "The Jet Lag Chronicles OG image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Jet Lag Chronicles",
    description: "A curated collection of travel experiences and tips.",
    images: ["https://jetlag-fe.vercel.app/default-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <HeaderWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
