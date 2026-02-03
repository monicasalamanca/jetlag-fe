"use client";

import Script from "next/script";
import { ConsentGate } from "@/components/storage-banner";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-1354578788955507";

/**
 * AdsenseScript Component
 *
 * Conditionally injects the Google AdSense script into the document head.
 * Only loads the script if:
 * 1. User has accepted storage/cookie consent (localStorage check)
 *
 * This ensures compliance with privacy requirements.
 * Script is loaded once globally for all ad units on the page.
 *
 * @environment NEXT_PUBLIC_ADSENSE_CLIENT_ID - AdSense publisher ID (required)
 */
export default function AdsenseScript() {
  if (!ADSENSE_CLIENT_ID || ADSENSE_CLIENT_ID === "ca-pub-XXXXXXXXXX") {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[AdSense] NEXT_PUBLIC_ADSENSE_CLIENT_ID not configured. Ads will not display.",
      );
    }
    return null;
  }

  return (
    <ConsentGate>
      <Script
        id="adsense-global-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </ConsentGate>
  );
}
