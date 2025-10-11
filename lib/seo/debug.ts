/**
 * Development utilities for testing and debugging SEO schemas
 * Only available in development mode
 */

import { SCHEMA_CONFIG } from "./schema/config";

/**
 * Validate a single schema object
 */
export function validateSingleSchema(
  schema: Record<string, unknown>,
  schemaType?: string,
): boolean {
  if (!SCHEMA_CONFIG.enableValidation) return true;

  try {
    // Check required fields
    if (!schema["@context"]) {
      console.error(`❌ Missing @context in ${schemaType || "schema"}`);
      return false;
    }

    if (!schema["@type"]) {
      console.error(`❌ Missing @type in ${schemaType || "schema"}`);
      return false;
    }

    // URL validation
    const urlFields = ["url", "logo", "image", "sameAs"];
    for (const field of urlFields) {
      const value = schema[field];
      if (value) {
        if (typeof value === "string") {
          if (!isValidUrl(value)) {
            console.error(`❌ Invalid URL in ${field}: ${value}`);
            return false;
          }
        } else if (Array.isArray(value)) {
          for (const url of value) {
            if (typeof url === "string" && !isValidUrl(url)) {
              console.error(`❌ Invalid URL in ${field} array: ${url}`);
              return false;
            }
          }
        } else if (
          typeof value === "object" &&
          value !== null &&
          "url" in value
        ) {
          const objectValue = value as { url: unknown };
          if (
            typeof objectValue.url === "string" &&
            !isValidUrl(objectValue.url)
          ) {
            console.error(`❌ Invalid URL in ${field}.url: ${objectValue.url}`);
            return false;
          }
        }
      }
    }

    // Date validation
    const dateFields = ["datePublished", "dateModified", "uploadDate"];
    for (const field of dateFields) {
      const value = schema[field];
      if (value && typeof value === "string" && !isValidISODate(value)) {
        console.error(`❌ Invalid date in ${field}: ${value}`);
        return false;
      }
    }

    console.log(
      `✅ Schema validation passed for ${schemaType || schema["@type"]}`,
    );
    return true;
  } catch (error) {
    console.error(`❌ Schema validation error:`, error);
    return false;
  }
}

/**
 * Validate multiple schemas
 */
export function validateSchemas(schemas: Record<string, unknown>[]): boolean {
  if (!SCHEMA_CONFIG.enableValidation) return true;

  let allValid = true;
  for (const schema of schemas) {
    if (!validateSingleSchema(schema)) {
      allValid = false;
    }
  }
  return allValid;
}

/**
 * Extract and log all schemas from the current page
 */
export function debugPageSchemas(): void {
  if (typeof window === "undefined") return;

  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  );
  console.group("📊 Page Schema Debug");

  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.innerHTML);
      const schemas = Array.isArray(data) ? data : [data];

      console.group(`Script ${index + 1} (ID: ${script.id || "no-id"})`);
      schemas.forEach((schema, schemaIndex) => {
        console.log(`Schema ${schemaIndex + 1}:`, schema);
        validateSingleSchema(schema, schema["@type"]);
      });
      console.groupEnd();
    } catch (error) {
      console.error(`❌ Failed to parse script ${index + 1}:`, error);
    }
  });

  console.groupEnd();
}

/**
 * Check for duplicate schemas
 */
export function checkDuplicateSchemas(): void {
  if (typeof window === "undefined") return;

  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  );
  const seenTypes = new Map<string, number>();

  scripts.forEach((script) => {
    try {
      const data = JSON.parse(script.innerHTML);
      const schemas = Array.isArray(data) ? data : [data];

      schemas.forEach((schema) => {
        const type = schema["@type"];
        if (type) {
          seenTypes.set(type, (seenTypes.get(type) || 0) + 1);
        }
      });
    } catch {
      // Skip invalid scripts
    }
  });

  console.group("🔍 Duplicate Schema Check");
  let hasDuplicates = false;

  seenTypes.forEach((count, type) => {
    if (count > 1) {
      console.warn(`⚠️ Found ${count} schemas of type: ${type}`);
      hasDuplicates = true;
    } else {
      console.log(`✅ Single schema of type: ${type}`);
    }
  });

  if (!hasDuplicates) {
    console.log("✅ No duplicate schemas found");
  }

  console.groupEnd();
}

/**
 * Generate Google Rich Results Test URL
 */
export function getGoogleTestUrl(pageUrl?: string): string {
  const url =
    pageUrl || (typeof window !== "undefined" ? window.location.href : "");
  return `https://search.google.com/test/rich-results?url=${encodeURIComponent(url)}`;
}

/**
 * Generate Schema.org validator URL
 */
export function getSchemaValidatorUrl(pageUrl?: string): string {
  const url =
    pageUrl || (typeof window !== "undefined" ? window.location.href : "");
  return `https://validator.schema.org/#url=${encodeURIComponent(url)}`;
}

/**
 * Helper functions
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidISODate(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return date.toISOString() === dateString;
  } catch {
    return false;
  }
}

/**
 * Add global debug functions to window in development
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  interface SeoDebugTools {
    validateSchemas: typeof validateSchemas;
    debugPageSchemas: typeof debugPageSchemas;
    checkDuplicateSchemas: typeof checkDuplicateSchemas;
    getGoogleTestUrl: typeof getGoogleTestUrl;
    getSchemaValidatorUrl: typeof getSchemaValidatorUrl;
  }

  (window as typeof window & { __seoDebug: SeoDebugTools }).__seoDebug = {
    validateSchemas: validateSchemas,
    debugPageSchemas: debugPageSchemas,
    checkDuplicateSchemas: checkDuplicateSchemas,
    getGoogleTestUrl: getGoogleTestUrl,
    getSchemaValidatorUrl: getSchemaValidatorUrl,
  };

  console.log(`
🔧 SEO Schema Debug Tools Available:
   
   window.__seoDebug.debugPageSchemas()      - Show all schemas on page
   window.__seoDebug.checkDuplicateSchemas() - Check for duplicates
   window.__seoDebug.getGoogleTestUrl()      - Get Google test URL
   window.__seoDebug.getSchemaValidatorUrl() - Get schema validator URL
  `);
}
