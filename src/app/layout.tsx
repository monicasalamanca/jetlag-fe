import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Roboto } from "next/font/google";
import HeaderWrapper from "@/components/headerWrapper/headerWrapper";
import Footer from "@/components/footer/footer";
import AnalyticsPageView from "./components/analytics-page-view";

import "./globals.css";
import { StorageBanner } from "./components/storage-banner";

const roboto = Roboto({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "The Jet Lag Chronicles",
    template: "%s | The Jet Lag Chronicles",
  },
  description:
    "Discover authentic travel experiences, destination guides, and practical tips from seasoned travelers. Your companion for meaningful travel adventures.",
  keywords: [
    "travel",
    "digital nomad",
    "expat",
    "destination guides",
    "travel tips",
    "authentic travel",
    "travel stories",
  ],
  authors: [{ name: "The Jet Lag Chronicles" }],
  creator: "The Jet Lag Chronicles",
  publisher: "The Jet Lag Chronicles",
  metadataBase: new URL("https://thejetlagchronicles.com"),
  openGraph: {
    title: "The Jet Lag Chronicles",
    description:
      "Discover authentic travel experiences, destination guides, and practical tips from seasoned travelers.",
    url: "https://thejetlagchronicles.com/",
    siteName: "The Jet Lag Chronicles",
    images: [
      {
        url: "https://thejetlagchronicles.com/default-og.jpg",
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
    description:
      "Discover authentic travel experiences, destination guides, and practical tips from seasoned travelers.",
    images: ["https://thejetlagchronicles.com/default-og.jpg"],
    creator: "@the_jetlaggers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your actual Google verification code
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
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_ID || "G-E04G0053EJ"}
        />
        <AnalyticsPageView />
        <HeaderWrapper />
        {children}
        <Footer />
        <StorageBanner />
      </body>
    </html>
  );
}
