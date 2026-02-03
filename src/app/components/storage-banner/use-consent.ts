"use client";

/**
 * React hook for managing consent state
 * Use this to check consent status in components and conditionally render scripts
 */

import { useState, useEffect } from "react";
import {
  loadConsentState,
  hasAcceptedConsent,
  hasRejectedConsent,
  hasConsentChoice,
} from "./consent-utils";
import { ConsentStateValue } from "./consent-constants";

export interface UseConsentReturn {
  consentValue: ConsentStateValue | null;
  hasAccepted: boolean;
  hasRejected: boolean;
  hasChoice: boolean;
  isLoading: boolean;
}

/**
 * Hook to access current consent state
 * @returns Current consent state and helper flags
 */
export function useConsent(): UseConsentReturn {
  const [consentValue, setConsentValue] = useState<ConsentStateValue | null>(
    null,
  );
  const [hasAccepted, setHasAccepted] = useState(false);
  const [hasRejected, setHasRejected] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load consent state on mount
    const state = loadConsentState();
    setConsentValue(state?.state || null);
    setHasAccepted(hasAcceptedConsent());
    setHasRejected(hasRejectedConsent());
    setHasChoice(hasConsentChoice());
    setIsLoading(false);

    // Listen for consent changes (custom event)
    const handleConsentChange = () => {
      const newState = loadConsentState();
      setConsentValue(newState?.state || null);
      setHasAccepted(hasAcceptedConsent());
      setHasRejected(hasRejectedConsent());
      setHasChoice(hasConsentChoice());
    };

    window.addEventListener("consentChange", handleConsentChange);

    return () => {
      window.removeEventListener("consentChange", handleConsentChange);
    };
  }, []);

  return {
    consentValue,
    hasAccepted,
    hasRejected,
    hasChoice,
    isLoading,
  };
}

/**
 * Dispatch a consent change event to notify all listeners
 */
export function notifyConsentChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("consentChange"));
  }
}
