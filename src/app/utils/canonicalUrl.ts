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
 */
export function getBlogCanonicalUrl(
  slug: string,
  countrySlug?: string,
): string {
  const cleanSlug = slug.toLowerCase().trim();

  if (countrySlug) {
    const cleanCountrySlug = countrySlug.toLowerCase().trim();
    return getCanonicalUrl(`/${cleanCountrySlug}/${cleanSlug}`);
  }

  return getCanonicalUrl(`/blog/${cleanSlug}`);
}

/**
 * Generate canonical URL for country pages
 */
export function getCountryCanonicalUrl(countrySlug: string): string {
  const cleanSlug = countrySlug.toLowerCase().trim();
  return getCanonicalUrl(`/${cleanSlug}`);
}

/**
 * Generate canonical URL for lifestyle posts
 */
export function getLifestyleCanonicalUrl(slug: string): string {
  const cleanSlug = slug.toLowerCase().trim();
  return getCanonicalUrl(`/lifestyle/${cleanSlug}`);
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
