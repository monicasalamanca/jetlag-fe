"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
} from "@/app/utils/analytics";
import { ConsentGate } from "@/components/storage-banner"; // ✨ NEW

function AnalyticsPageViewInner() {
  const pathname = usePathname();
  const startTime = useRef<number>(0);
  const scrollDepthTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Track page view
    const url = `${window.location.origin}${pathname}`;
    const title = document.title;

    trackPageView(url, title);

    // Reset tracking for new page
    startTime.current = Date.now();
    scrollDepthTracked.current = new Set();

    // Scroll depth tracking
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, and 100% milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !scrollDepthTracked.current.has(milestone) &&
          pathname
        ) {
          scrollDepthTracked.current.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      });
    };

    // Time on page tracking
    const handleBeforeUnload = () => {
      if (startTime.current && pathname) {
        const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
        // Only track if user spent more than 10 seconds on page
        if (timeOnPage > 10) {
          trackTimeOnPage(timeOnPage, pathname);
        }
      }
    };

    // Visibility change tracking (for tab switching)
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        startTime.current &&
        pathname
      ) {
        const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
        if (timeOnPage > 10) {
          trackTimeOnPage(timeOnPage, pathname);
        }
      } else if (document.visibilityState === "visible") {
        startTime.current = Date.now(); // Reset timer when tab becomes visible again
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}

export default function AnalyticsPageView() {
  return (
    <ConsentGate>
      <AnalyticsPageViewInner />
    </ConsentGate>
  );
}
