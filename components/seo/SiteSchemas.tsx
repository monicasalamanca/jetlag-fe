/**
 * Site-wide schemas that should be included on all pages
 */

import { useMemo } from "react";
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
  const organizationSchema = useMemo(() => {
    try {
      return buildOrganization(getOrgConfig(orgOverrides));
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error building organization schema:", error);
      }
      return null;
    }
  }, [orgOverrides]);

  const webSiteSchema = useMemo(() => {
    try {
      return buildWebSite(getSiteSchemaConfig(siteOverrides));
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error building website schema:", error);
      }
      return null;
    }
  }, [siteOverrides]);

  return (
    <>
      {organizationSchema && <JsonLd data={organizationSchema} />}
      {webSiteSchema && <JsonLd data={webSiteSchema} />}
    </>
  );
}
