"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ADSENSE_CLIENT_ID = "ca-pub-1354578788955507";
const EXCLUDED_PATHS = ["/privacy-policy", "/terms-of-service"];
const STORAGE_CONSENT_KEY = "jetlag-storage-consent";

/**
 * AdsenseScript Component
 *
 * Conditionally injects the Google AdSense script into the document head.
 * Only loads the script if:
 * 1. User has accepted storage/cookie consent (localStorage check)
 * 2. Current route is not in the excluded paths list
 *
 * This ensures compliance with privacy requirements and prevents
 * ads from appearing on privacy policy and terms of service pages.
 */
export default function AdsenseScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === "undefined") return;

    // Don't load AdSense on excluded pages
    if (EXCLUDED_PATHS.includes(pathname)) {
      console.log(`[AdSense] Script blocked on excluded path: ${pathname}`);
      return;
    }

    // Check for user consent in localStorage
    let hasConsent = false;
    try {
      const consent = localStorage.getItem(STORAGE_CONSENT_KEY);
      hasConsent = consent === "accepted";
    } catch (error) {
      console.warn("[AdSense] Unable to check consent:", error);
      return;
    }

    // Don't load AdSense without consent
    if (!hasConsent) {
      console.log("[AdSense] Script blocked - no user consent");
      return;
    }

    // Prevent duplicate script injection
    if (document.getElementById("adsbygoogle-script")) {
      console.log("[AdSense] Script already loaded");
      return;
    }

    // Inject the AdSense script
    const script = document.createElement("script");
    script.id = "adsbygoogle-script";
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      console.log(`[AdSense] Script loaded successfully on: ${pathname}`);
    };

    script.onerror = (error) => {
      console.error(`[AdSense] Failed to load script on: ${pathname}`);
      console.error(
        "[AdSense] Common causes: Ad blocker enabled, network issue, or CSP restrictions",
      );
      console.error("[AdSense] Error details:", error);
    };

    document.head.appendChild(script);

    // Cleanup function (optional, but good practice)
    return () => {
      // Note: We don't remove the script on cleanup to avoid reloading
      // AdSense on every route change. Once loaded, it stays loaded.
    };
  }, [pathname]);

  // This component doesn't render any visible UI
  return null;
}
