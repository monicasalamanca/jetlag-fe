import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  Roboto,
  Poppins,
  Source_Sans_3,
  Barlow,
  Barlow_Condensed,
  Space_Mono,
} from "next/font/google";
import { headers } from "next/headers";
import HeaderWrapper from "@/components/headerWrapper/headerWrapper";
import Footer from "@/components/footer/footer";
import AnalyticsPageView from "./components/analytics-page-view";
import AdsenseScript from "./components/adsense-script";
import SiteSchemas from "@/components/seo/SiteSchemas";
import SeoDebugTools from "@/components/seo/SeoDebugTools";
import { SITE_CONFIG } from "@/lib/seo/schema/config";
import "./globals.css";
import { StorageBanner, ConsentGate } from "./components/storage-banner";

const roboto = Roboto({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const sourceSans3 = Source_Sans_3({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const barlow = Barlow({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow-condensed",
});

const spaceMono = Space_Mono({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["Courier New", "Courier", "monospace"],
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
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
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: "The Jet Lag Chronicles",
    description:
      "Discover authentic travel experiences, destination guides, and practical tips from seasoned travelers.",
    url: SITE_CONFIG.url,
    siteName: "The Jet Lag Chronicles",
    images: [
      {
        url: `${SITE_CONFIG.url}/default-og.jpg`,
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
    images: [`${SITE_CONFIG.url}/default-og.jpg`],
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
  other: {
    "agd-partner-manual-verification": "",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const showNav = headersList.get("x-show-nav") !== "false";

  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${poppins.className} ${sourceSans3.className} ${barlow.variable} ${barlowCondensed.variable} ${spaceMono.variable}`}
      >
        {/* Site-wide SEO Schemas */}
        <SiteSchemas />

        {/* Development-only debug tools */}
        {process.env.NODE_ENV === "development" && <SeoDebugTools />}

        <ConsentGate>
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GA_ID || "G-E04G0053EJ"}
          />
        </ConsentGate>
        <AdsenseScript />
        <AnalyticsPageView />
        {showNav && <HeaderWrapper />}
        {children}
        {showNav && <Footer />}
        <StorageBanner />
      </body>
    </html>
  );
}
