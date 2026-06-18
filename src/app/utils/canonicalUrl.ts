function getCanonicalUrl(path: string): string {
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
