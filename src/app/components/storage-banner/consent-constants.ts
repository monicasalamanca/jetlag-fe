/**
 * Consent System Constants and Types
 * Version 1.0 - Initial implementation with Accept/Reject all
 */

export const CONSENT_VERSION = "1.0";
export const CONSENT_COOKIE_NAME = "tjc_consent";
export const CONSENT_STORAGE_KEY = "jetlag-storage-consent";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60; // 180 days in seconds

export type ConsentStateValue = "accepted" | "rejected";

export interface ConsentState {
  state: ConsentStateValue;
  version: string;
  timestamp: number;
}

export type ConsentMode = "banner" | "settings";
