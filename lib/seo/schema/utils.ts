/**
 * Enhanced utility functions with error handling and validation
 */

import { SITE_CONFIG, SCHEMA_CONFIG } from "./config";

// Legacy exports for backward compatibility
export const SITE_URL = SITE_CONFIG.url;
export const SITE_NAME = SITE_CONFIG.name;
export const ORG_LOGO_URL = `${SITE_CONFIG.url}${SITE_CONFIG.logo.url}`;
export const ORG_SAME_AS = [
  SITE_CONFIG.social.twitter,
  SITE_CONFIG.social.youtube,
  SITE_CONFIG.social.instagram,
];

/**
 * Safely serialize object to JSON-LD string with error handling
 */
export function jsonLd<T>(obj: T): string {
  try {
    const cleaned = clean(obj);
    if (
      SCHEMA_CONFIG.enableValidation &&
      cleaned &&
      typeof cleaned === "object"
    ) {
      validateSchema(cleaned as Record<string, unknown>);
    }
    return JSON.stringify(cleaned);
  } catch (error) {
    if (SCHEMA_CONFIG.enableDebugLogs) {
      console.error("Error serializing JSON-LD:", error);
    }
    return "{}"; // Fallback to empty object
  }
}

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

/**
 * Validate schema structure (development only)
 */
export function validateSchema(schema: Record<string, unknown>): boolean {
  if (!SCHEMA_CONFIG.enableValidation) return true;

  try {
    // Basic required fields check
    if (!schema["@context"] || !schema["@type"]) {
      console.warn("Schema missing required @context or @type:", schema);
      return false;
    }

    // URL validation
    for (const [key, value] of Object.entries(schema)) {
      if (
        typeof value === "string" &&
        (key.includes("url") || key.includes("Url"))
      ) {
        if (!isValidUrl(value)) {
          console.warn(`Invalid URL in schema: ${key} = ${value}`);
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Schema validation error:", error);
    return false;
  }
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safe property access with fallback
 */
export function safeGet<T>(
  obj: Record<string, unknown> | null | undefined,
  path: string,
  fallback: T,
): T {
  try {
    const keys = path.split(".");
    let current: unknown = obj;
    for (const key of keys) {
      if (current === null || current === undefined) return fallback;
      current = (current as Record<string, unknown>)[key];
    }
    return current !== undefined ? (current as T) : fallback;
  } catch {
    return fallback;
  }
}
