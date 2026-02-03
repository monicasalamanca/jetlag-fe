"use client";

import { useEffect, useRef } from "react";
import { ConsentGate } from "../storage-banner";
import s from "./google-ad-unit.module.scss";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-1354578788955507";

interface GoogleAdUnitProps {
  adSlot?: string;
  adClient?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

/**
 * Inner component that only renders when consent is given
 * Assumes AdSense script is already loaded globally by AdsenseScript component
 */
function AdUnitInner({
  adSlot = "2730891803",
  adClient = ADSENSE_CLIENT_ID,
  adFormat = "auto",
  fullWidthResponsive = true,
}: GoogleAdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adPushed = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Wait for AdSense script to load and DOM to be ready before pushing
    const pushAd = () => {
      try {
        if (adRef.current && !adPushed.current) {
          // Check if AdSense script is loaded
          if (typeof window.adsbygoogle === "undefined") {
            // Script not loaded yet, retry
            setTimeout(pushAd, 100);
            return;
          }

          // Ensure the element has dimensions before pushing
          const rect = adRef.current.getBoundingClientRect();
          if (rect.width > 0 || rect.height > 0) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adPushed.current = true;
          } else {
            // Retry after a short delay if element not ready
            setTimeout(pushAd, 100);
          }
        }
      } catch (error) {
        console.error("[AdSense] Error initializing ad unit:", error);
      }
    };

    // Delay to ensure DOM is fully rendered and script loaded
    const timer = setTimeout(pushAd, 100);

    return () => clearTimeout(timer);
  }, [adClient]);

  // Don't render on server
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className={s.adContainer}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

// Main component that wraps with ConsentGate
const GoogleAdUnit: React.FC<GoogleAdUnitProps> = (props) => {
  return (
    <ConsentGate
      fallback={
        <div className={s.adContainer}>
          <div className={s.adPlaceholder}>Ad space</div>
        </div>
      }
    >
      <AdUnitInner {...props} />
    </ConsentGate>
  );
};

export default GoogleAdUnit;
