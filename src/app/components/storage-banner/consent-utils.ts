/**
 * Consent Storage Utilities
 * Handles localStorage, cookie, and in-memory fallback for consent state
 */

import {
  CONSENT_VERSION,
  CONSENT_COOKIE_NAME,
  CONSENT_STORAGE_KEY,
  CONSENT_MAX_AGE,
  ConsentState,
  ConsentStateValue,
} from "./consent-constants";

// In-memory fallback for when storage is unavailable
let inMemoryConsent: ConsentState | null = null;

/**
 * Set a cookie with proper security flags
 */
function setCookie(name: string, value: string, maxAge: number): boolean {
  try {
    const secure = window.location.protocol === "https:" ? "Secure;" : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax; ${secure} Max-Age=${maxAge}`;
    return true;
  } catch (error) {
    console.warn("Failed to set cookie:", error);
    return false;
  }
}

/**
 * Get a cookie value by name
 */
function getCookie(name: string): string | null {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift();
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    return null;
  } catch (error) {
    console.warn("Failed to read cookie:", error);
    return null;
  }
}

/**
 * Delete a cookie
 */
function deleteCookie(name: string): void {
  try {
    document.cookie = `${name}=; Path=/; SameSite=Lax; Max-Age=0`;
  } catch (error) {
    console.warn("Failed to delete cookie:", error);
  }
}

/**
 * Clear all Google Analytics cookies
 * Called when user rejects or withdraws consent
 */
function clearAnalyticsCookies(): void {
  try {
    // Get all cookies
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const cookieName = cookie.split("=")[0].trim();

      // Delete Google Analytics cookies (_ga, _gid, _gat, _ga_*)
      if (
        cookieName.startsWith("_ga") ||
        cookieName.startsWith("_gid") ||
        cookieName.startsWith("_gat")
      ) {
        deleteCookie(cookieName);
        console.info(`Cleared analytics cookie: ${cookieName}`);
      }

      // Delete Google Ads cookies
      if (cookieName.startsWith("_gcl") || cookieName.startsWith("_gac")) {
        deleteCookie(cookieName);
        console.info(`Cleared ads cookie: ${cookieName}`);
      }
    }

    // Also clear any GA data from localStorage
    try {
      const localStorageKeys = Object.keys(localStorage);
      for (const key of localStorageKeys) {
        if (key.startsWith("_ga") || key.includes("google")) {
          localStorage.removeItem(key);
          console.info(`Cleared analytics localStorage: ${key}`);
        }
      }
    } catch (error) {
      console.warn("Failed to clear analytics from localStorage:", error);
    }
  } catch (error) {
    console.warn("Failed to clear analytics cookies:", error);
  }
}

/**
 * Signal consent update to Google Analytics (Consent Mode v2)
 * This tells Google Analytics to stop tracking when consent is withdrawn
 */
function updateGoogleConsentMode(granted: boolean): void {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
        ad_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
      });
      console.info(
        `Google Consent Mode updated: ${granted ? "granted" : "denied"}`,
      );
    }
  } catch (error) {
    console.warn("Failed to update Google Consent Mode:", error);
  }
}

/**
 * Check if storage (localStorage/cookie) is available
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);

    // Also test cookie
    setCookie("__cookie_test__", "test", 60);
    const cookieWorks = getCookie("__cookie_test__") === "test";
    deleteCookie("__cookie_test__");

    return cookieWorks;
  } catch {
    return false;
  }
}

/**
 * Save consent state to localStorage and cookie
 * If rejecting consent, also clears all tracking cookies and stops analytics
 */
export function saveConsentState(state: ConsentStateValue): boolean {
  const consentState: ConsentState = {
    state,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  };

  const serialized = JSON.stringify(consentState);
  let success = false;

  // If rejecting consent, clear all tracking cookies first
  if (state === "rejected") {
    clearAnalyticsCookies();
    updateGoogleConsentMode(false);
  } else if (state === "accepted") {
    updateGoogleConsentMode(true);
  }

  // Try localStorage
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
    success = true;
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }

  // Try cookie (always attempt)
  const cookieSuccess = setCookie(
    CONSENT_COOKIE_NAME,
    serialized,
    CONSENT_MAX_AGE,
  );
  success = success || cookieSuccess;

  // Fallback to in-memory if both fail
  if (!success) {
    inMemoryConsent = consentState;
    console.warn("Using in-memory consent storage (session only)");
  }

  return success;
}

/**
 * Load consent state from localStorage, cookie, or memory
 */
export function loadConsentState(): ConsentState | null {
  // Try localStorage first
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ConsentState;
      // Validate version
      if (parsed.version === CONSENT_VERSION) {
        return parsed;
      }
      // Version mismatch - clear old consent
      console.info("Consent version mismatch, re-prompting user");
      clearConsentState();
      return null;
    }
  } catch (error) {
    console.warn("Failed to read from localStorage:", error);
  }

  // Try cookie
  try {
    const cookieValue = getCookie(CONSENT_COOKIE_NAME);
    if (cookieValue) {
      const parsed = JSON.parse(cookieValue) as ConsentState;
      // Validate version
      if (parsed.version === CONSENT_VERSION) {
        // Sync to localStorage if available
        try {
          localStorage.setItem(CONSENT_STORAGE_KEY, cookieValue);
        } catch {
          // Ignore if localStorage fails
        }
        return parsed;
      }
      // Version mismatch
      console.info("Consent version mismatch, re-prompting user");
      clearConsentState();
      return null;
    }
  } catch (error) {
    console.warn("Failed to read from cookie:", error);
  }

  // Check in-memory fallback
  if (inMemoryConsent) {
    if (inMemoryConsent.version === CONSENT_VERSION) {
      return inMemoryConsent;
    }
    // Version mismatch
    inMemoryConsent = null;
  }

  return null;
}

/**
 * Clear consent state from all storage locations
 */
export function clearConsentState(): void {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear localStorage:", error);
  }

  deleteCookie(CONSENT_COOKIE_NAME);
  inMemoryConsent = null;
}

/**
 * Get current consent value (accepted/rejected/null)
 */
export function getConsentValue(): ConsentStateValue | null {
  const state = loadConsentState();
  return state ? state.state : null;
}

/**
 * Check if user has accepted consent
 */
export function hasAcceptedConsent(): boolean {
  return getConsentValue() === "accepted";
}

/**
 * Check if user has rejected consent
 */
export function hasRejectedConsent(): boolean {
  return getConsentValue() === "rejected";
}

/**
 * Check if consent choice has been made
 */
export function hasConsentChoice(): boolean {
  return loadConsentState() !== null;
}
