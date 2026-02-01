"use client";

import { useEffect, useRef } from "react";
import s from "./google-ad-unit.module.scss";

interface GoogleAdUnitProps {
  adSlot?: string;
  adClient?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

// Global flag to track if AdSense script has been injected
let adsenseScriptInjected = false;

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

const GoogleAdUnit: React.FC<GoogleAdUnitProps> = ({
  adSlot = "2730891803",
  adClient = "ca-pub-1354578788955507",
  adFormat = "auto",
  fullWidthResponsive = true,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const adPushed = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Inject AdSense script only once per page
    if (!adsenseScriptInjected) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      adsenseScriptInjected = true;
    }

    // Wait for both the script to load and DOM to be ready before pushing
    const pushAd = () => {
      try {
        if (adRef.current && !adPushed.current) {
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
        console.error("AdSense error:", error);
      }
    };

    // Delay to ensure DOM is fully rendered
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
};

export default GoogleAdUnit;
