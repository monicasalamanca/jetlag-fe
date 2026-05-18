/**
 * Configuration management for SEO schemas
 * Centralizes all site-specific configuration
 */

import type { OrgConfig, SiteConfig } from "./types";

// Environment-based configuration
const isDev = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

// Site configuration (should come from env vars in production)
export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://thejetlagchronicles.com",
  name: process.env.NEXT_PUBLIC_SITE_NAME || "The Jet Lag Chronicles",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Travel guides, digital nomad tips, and expat insights from around the world",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@thejetlagchronicles.com",
  social: {
    twitter:
      process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/thejetLaggers_X",
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE_URL ||
      "https://www.youtube.com/@TheJetLaggers_yt",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://www.instagram.com/thejetlaggers_ig",
  },
  logo: {
    url: process.env.NEXT_PUBLIC_LOGO_URL || "/logo.png",
    width: 512,
    height: 512,
  },
  defaultAuthor: {
    name: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR || "Moni and Dunny",
    url: "/about-us",
  },
} as const;

// Default organization configuration
export const DEFAULT_ORG_CONFIG: OrgConfig = {
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: {
    url: `${SITE_CONFIG.url}${SITE_CONFIG.logo.url}`,
    width: SITE_CONFIG.logo.width,
    height: SITE_CONFIG.logo.height,
    alt: `${SITE_CONFIG.name} Logo`,
  },
  sameAs: [
    SITE_CONFIG.social.twitter,
    SITE_CONFIG.social.youtube,
    SITE_CONFIG.social.instagram,
  ],
  contactEmail: SITE_CONFIG.contactEmail,
};

// Default site configuration
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  inLanguage: "en",
};

// Schema configuration
export const SCHEMA_CONFIG = {
  context: "https://schema.org" as const,
  enableDebugLogs: isDev,
  enableValidation: isDev,
  searchEndpoint: "/search",
} as const;

// Validation helpers
export function validateConfig() {
  const requiredEnvVars = ["NEXT_PUBLIC_SITE_URL"];
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0 && isProduction) {
    console.warn(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  return missing.length === 0;
}

// Type-safe config access
export function getSiteConfig() {
  validateConfig();
  return SITE_CONFIG;
}

export function getOrgConfig(overrides?: Partial<OrgConfig>): OrgConfig {
  return { ...DEFAULT_ORG_CONFIG, ...overrides };
}

export function getSiteSchemaConfig(
  overrides?: Partial<SiteConfig>,
): SiteConfig {
  return { ...DEFAULT_SITE_CONFIG, ...overrides };
}
