/**
 * React component for injecting JSON-LD structured data
 */

import Script from "next/script";
import { createHash } from "crypto";

interface JsonLdProps {
  data: object | object[];
  fallback?: React.ReactNode;
}

/**
 * Generate deterministic ID for JSON-LD script tag
 */
function generateId(data: object | object[]): string {
  try {
    const payload = Array.isArray(data) ? data : [data];
    const firstItem = payload[0] as Record<string, unknown>;

    // Use @type + url if available, otherwise hash the content
    if (firstItem?.["@type"] && firstItem?.url) {
      const type = String(firstItem["@type"]);
      const url = String(firstItem.url);
      return `jsonld-${type.toLowerCase()}-${createHash("md5").update(url).digest("hex").slice(0, 8)}`;
    }

    // Fallback to content hash
    const contentHash = createHash("md5")
      .update(JSON.stringify(payload))
      .digest("hex")
      .slice(0, 8);
    const type = firstItem?.["@type"];
    const typeString = typeof type === "string" ? type.toLowerCase() : "schema";
    return `jsonld-${typeString}-${contentHash}`;
  } catch {
    // Fallback ID if generation fails
    return `jsonld-fallback-${Date.now()}`;
  }
}

/**
 * Component to inject JSON-LD structured data with error boundaries
 *
 * @example
 * ```tsx
 * <JsonLd data={buildOrganization(orgConfig)} />
 * <JsonLd data={[buildWebSite(siteConfig), buildOrganization(orgConfig)]} />
 * ```
 */
export default function JsonLd({ data, fallback = null }: JsonLdProps) {
  try {
    if (!data) {
      if (process.env.NODE_ENV === "development") {
        console.warn("JsonLd: No data provided");
      }
      return fallback as React.ReactElement;
    }

    const payload = Array.isArray(data) ? data : [data];

    // Validate payload in development
    if (process.env.NODE_ENV === "development") {
      for (const item of payload) {
        if (!item || typeof item !== "object") {
          console.warn("JsonLd: Invalid schema data item:", item);
          continue;
        }

        const schemaItem = item as Record<string, unknown>;
        if (!schemaItem["@context"] || !schemaItem["@type"]) {
          console.warn("JsonLd: Schema missing @context or @type:", schemaItem);
        }
      }
    }

    const id = generateId(data);
    const jsonString = JSON.stringify(payload);

    return (
      <Script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonString }}
        strategy="afterInteractive"
      />
    );
  } catch (error) {
    // Log error in development, fail silently in production
    if (process.env.NODE_ENV === "development") {
      console.error("JsonLd component error:", error);
    }

    return fallback as React.ReactElement;
  }
}
