"use client";

import { useEffect } from "react";

/**
 * Development-only client component for SEO debugging tools
 * Only loads in development mode
 */
export default function SeoDebugTools() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Simple validation function
    const validateSingleSchema = (
      schema: Record<string, unknown>,
      schemaType?: string,
    ): boolean => {
      try {
        if (!schema["@context"] || !schema["@type"]) {
          console.warn(`❌ Schema missing required fields:`, schema);
          return false;
        }
        console.log(
          `✅ Schema validation passed for ${schemaType || schema["@type"]}`,
        );
        return true;
      } catch (error) {
        console.error(`❌ Schema validation error:`, error);
        return false;
      }
    };

    // Debug all schemas on current page
    const debugPageSchemas = (): void => {
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
    };

    // Check for duplicate schemas
    const checkDuplicateSchemas = (): void => {
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
    };

    // Get testing URLs
    const getGoogleTestUrl = (pageUrl?: string): string => {
      const url = pageUrl || window.location.href;
      return `https://search.google.com/test/rich-results?url=${encodeURIComponent(url)}`;
    };

    const getSchemaValidatorUrl = (pageUrl?: string): string => {
      const url = pageUrl || window.location.href;
      return `https://validator.schema.org/#url=${encodeURIComponent(url)}`;
    };

    // Add global debug functions
    interface SeoDebugTools {
      debugPageSchemas: typeof debugPageSchemas;
      checkDuplicateSchemas: typeof checkDuplicateSchemas;
      getGoogleTestUrl: typeof getGoogleTestUrl;
      getSchemaValidatorUrl: typeof getSchemaValidatorUrl;
    }

    (window as typeof window & { __seoDebug: SeoDebugTools }).__seoDebug = {
      debugPageSchemas,
      checkDuplicateSchemas,
      getGoogleTestUrl,
      getSchemaValidatorUrl,
    };

    console.log(`
🔧 SEO Schema Debug Tools Available:
   
   window.__seoDebug.debugPageSchemas()      - Show all schemas on page
   window.__seoDebug.checkDuplicateSchemas() - Check for duplicates
   window.__seoDebug.getGoogleTestUrl()      - Get Google test URL
   window.__seoDebug.getSchemaValidatorUrl() - Get schema validator URL
    `);
  }, []);

  // This component doesn't render anything
  return null;
}
