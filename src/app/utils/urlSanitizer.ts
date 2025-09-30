/**
 * Utility to sanitize content and ensure all internal URLs
 * use the canonical domain without www
 */

const CANONICAL_DOMAIN = "thejetlagchronicles.com";
const CANONICAL_URL = `https://${CANONICAL_DOMAIN}`;

/**
 * Remove www from internal URLs in content
 */
export function sanitizeInternalUrls(content: string): string {
  if (!content) return content;

  // Replace www.thejetlagchronicles.com with thejetlagchronicles.com
  const sanitized = content
    .replace(/https?:\/\/www\.thejetlagchronicles\.com/g, CANONICAL_URL)
    .replace(
      /href=["']https?:\/\/www\.thejetlagchronicles\.com/g,
      `href="${CANONICAL_URL}`,
    )
    .replace(
      /src=["']https?:\/\/www\.thejetlagchronicles\.com/g,
      `src="${CANONICAL_URL}`,
    );

  return sanitized;
}

/**
 * Ensure URL uses canonical domain (no www)
 */
export function getCanonicalDomain(url: string): string {
  if (!url) return url;

  return url.replace(
    /https?:\/\/www\.thejetlagchronicles\.com/g,
    CANONICAL_URL,
  );
}

/**
 * Validate if URL is internal and canonical
 */
export function isCanonicalInternalUrl(url: string): boolean {
  if (!url) return false;

  const isInternal = url.includes("thejetlagchronicles.com");
  const hasWww = url.includes("www.thejetlagchronicles.com");

  return isInternal && !hasWww;
}

/**
 * Log non-canonical URLs in development
 */
export function logNonCanonicalUrls(
  content: string,
  context: string = "",
): void {
  if (process.env.NODE_ENV !== "development") return;

  const wwwMatches = content.match(/https?:\/\/www\.thejetlagchronicles\.com/g);

  if (wwwMatches && wwwMatches.length > 0) {
    console.warn(
      `🚨 Found ${wwwMatches.length} www URLs in ${context}:`,
      wwwMatches,
    );
    console.warn(
      "These should be updated in Strapi to use thejetlagchronicles.com (without www)",
    );
  }
}
