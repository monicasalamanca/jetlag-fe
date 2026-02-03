/**
 * Consent System - Public API
 * Export all components, hooks, and utilities for use throughout the application
 */

// Components
export { default as StorageBanner } from "./storage-banner";
export { default as ConsentGate } from "./consent-gate";
export { default as PrivacySettingsLink } from "./privacy-settings-link";

// Hooks
export { useConsent, notifyConsentChange } from "./use-consent";
export type { UseConsentReturn } from "./use-consent";

// Utilities
export {
  saveConsentState,
  loadConsentState,
  getConsentValue,
  hasAcceptedConsent,
  hasRejectedConsent,
  hasConsentChoice,
  isStorageAvailable,
  clearConsentState,
} from "./consent-utils";

// Constants and Types
export {
  CONSENT_VERSION,
  CONSENT_COOKIE_NAME,
  CONSENT_STORAGE_KEY,
  CONSENT_MAX_AGE,
} from "./consent-constants";
export type {
  ConsentState,
  ConsentStateValue,
  ConsentMode,
} from "./consent-constants";
