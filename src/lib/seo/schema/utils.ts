/**
 * Enhanced utility functions with error handling and validation
 */

import { SITE_CONFIG, SCHEMA_CONFIG } from "./config";

export const SITE_URL = SITE_CONFIG.url;

/**
 * Deep clean object by removing null, undefined, empty strings, and empty arrays/objects
 */
export function clean<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return undefined as T;
  }

  if (typeof obj === "string") {
    return (obj.trim() === "" ? undefined : obj) as T;
  }

  if (Array.isArray(obj)) {
    const cleaned = obj.map(clean).filter((item) => item !== undefined);
    return (cleaned.length === 0 ? undefined : cleaned) as T;
  }

  if (typeof obj === "object") {
    const cleaned: Record<string, unknown> = {};
    let hasValidProps = false;

    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = clean(value);
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
        hasValidProps = true;
      }
    }

    return (hasValidProps ? cleaned : undefined) as T;
  }

  return obj;
}

/**
 * Ensure URL is absolute with validation
 */
export function absUrl(pathOrUrl: string, base?: string): string {
  if (!pathOrUrl) return base || SITE_CONFIG.url;

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  const baseUrl = base || SITE_CONFIG.url;
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Convert date to ISO-8601 string with validation
 */
export function iso(dateInput: string | Date): string {
  if (!dateInput) return new Date().toISOString();

  try {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dateInput}`);
    }
    return date.toISOString();
  } catch (error) {
    if (SCHEMA_CONFIG.enableDebugLogs) {
      console.error("Error converting date:", error);
    }
    return new Date().toISOString(); // Fallback to current date
  }
}

/**
 * Calculate word count from text
 */
export function toWordCount(text?: string): number {
  if (!text || typeof text !== "string") return 0;
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}
