/**
 * Site-wide schemas that should be included on all pages
 */

import JsonLd from "./JsonLd";
import { buildOrganization, buildWebSite } from "../../lib/seo/schema/builders";
import type { OrgConfig, SiteConfig } from "../../lib/seo/schema/types";
import { getOrgConfig, getSiteSchemaConfig } from "../../lib/seo/schema/config";

interface SiteSchemasProps {
  orgOverrides?: Partial<OrgConfig>;
  siteOverrides?: Partial<SiteConfig>;
}

/**
 * Renders base site-wide schemas for all pages with memoization
 *
 * @example
 * ```tsx
 * // Default configuration
 * <SiteSchemas />
 *
 * // With overrides
 * <SiteSchemas
 *   orgOverrides={{ contactEmail: "custom@example.com" }}
 *   siteOverrides={{ description: "Custom description" }}
 * />
 * ```
 */
export default function SiteSchemas({
  orgOverrides,
  siteOverrides,
}: SiteSchemasProps = {}) {
  let organizationSchema = null;
  try {
    organizationSchema = buildOrganization(getOrgConfig(orgOverrides));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error building organization schema:", error);
    }
  }

  let webSiteSchema = null;
  try {
    webSiteSchema = buildWebSite(getSiteSchemaConfig(siteOverrides));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error building website schema:", error);
    }
  }

  return (
    <>
      {organizationSchema && <JsonLd data={organizationSchema} />}
      {webSiteSchema && <JsonLd data={webSiteSchema} />}
    </>
  );
}
