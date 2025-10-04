/**
 * Utility functions to generate consistent canonical URLs
 * that match redirect logic across the application
 */

export function getCanonicalUrl(path: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://thejetlagchronicles.com";

  // Remove trailing slashes and ensure consistent formatting
  const cleanPath = path.replace(/\/+$/, "") || "";

  // Handle root path
  if (cleanPath === "" || cleanPath === "/") {
    return baseUrl;
  }

  // Ensure path starts with /
  const normalizedPath = cleanPath.startsWith("/")
    ? cleanPath
    : `/${cleanPath}`;

  return `${baseUrl}${normalizedPath}`;
}

/**
 * Generate canonical URL for blog posts with consistent slug formatting
 * Blog posts are either country-specific (/{country}/{slug}) or lifestyle posts (/lifestyle/{slug})
 */
export function getBlogCanonicalUrl(
  slug: string,
  countrySlug?: string,
  isLifestyle?: boolean,
): string {
  const cleanSlug = slug.toLowerCase().trim();

  // Lifestyle posts go to /lifestyle/{slug}
  if (isLifestyle) {
    return getCanonicalUrl(`/lifestyle/${cleanSlug}`);
  }

  // Country-specific posts go to /{country}/{slug}
  if (countrySlug) {
    const cleanCountrySlug = countrySlug.toLowerCase().trim();
    return getCanonicalUrl(`/${cleanCountrySlug}/${cleanSlug}`);
  }

  // Fallback - this shouldn't happen in normal flow since posts should have country or lifestyle
  throw new Error(
    `Blog post "${slug}" must have either a country or be marked as lifestyle`,
  );
}

/**
 * Generate canonical URL for country pages
 */
export function getCountryCanonicalUrl(countrySlug: string): string {
  const cleanSlug = countrySlug.toLowerCase().trim();
  return getCanonicalUrl(`/${cleanSlug}`);
}

/**
 * Normalize any URL to match canonical format
 */
export function normalizeUrl(url: string): string {
  // If it's already a full URL, extract the path
  if (url.startsWith("http")) {
    try {
      const urlObj = new URL(url);
      return getCanonicalUrl(urlObj.pathname);
    } catch {
      return url;
    }
  }

  return getCanonicalUrl(url);
}
