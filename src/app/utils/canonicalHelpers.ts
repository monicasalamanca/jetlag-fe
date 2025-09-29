/**
 * Example implementation patterns showing how to ensure canonical URLs
 * match redirect targets in your page components
 */

import { redirect } from "next/navigation";
import { Metadata } from "next";
import { createMetadata } from "@/app/utils/metadata";
import {
  getBlogCanonicalUrl,
  getCountryCanonicalUrl,
} from "@/app/utils/canonicalUrl";

// Type definitions for blog and country data
interface BlogTag {
  name: string;
}

interface BlogAuthor {
  name: string;
}

interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  featuredImage?: { url: string };
  publishedAt?: string;
  updatedAt?: string;
  tags?: BlogTag[];
  authors?: BlogAuthor[];
}

interface Country {
  slug: string;
  name: string;
  description?: string;
  featuredImage?: { url: string };
}

// Validation utility for development
export function validateCanonicalConsistency(
  currentPath: string,
  canonicalUrl: string,
): void {
  if (process.env.NODE_ENV === "development") {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://thejetlagchronicles.com";
    const canonicalPath = canonicalUrl.replace(baseUrl, "");

    console.assert(
      currentPath === canonicalPath,
      `🚨 Canonical URL mismatch detected!
      Current path: ${currentPath}
      Canonical path: ${canonicalPath}
      This may cause SEO issues. Ensure redirect logic matches canonical URL generation.`,
    );
  }
}

/**
 * Helper to generate blog post metadata with canonical URL
 */
export async function generateBlogMetadata(
  blogSlug: string,
  countrySlug?: string,
  fetchBlogPost?: (slug: string) => Promise<BlogPost | null>,
): Promise<Metadata> {
  if (!fetchBlogPost) {
    throw new Error("fetchBlogPost function is required");
  }

  const blog = await fetchBlogPost(blogSlug);

  if (!blog) {
    return createMetadata({
      title: "Post Not Found",
      description: "The blog post you're looking for could not be found.",
      url: "/404",
    });
  }

  // Generate canonical URL - this MUST match your redirect logic
  const canonicalUrl = getBlogCanonicalUrl(blog.slug, countrySlug);

  return createMetadata({
    title: blog.title,
    description: blog.description || blog.excerpt || "Travel blog post",
    url: canonicalUrl, // This will be used for canonical tag
    image: blog.featuredImage?.url,
    type: "article",
    publishedTime: blog.publishedAt,
    modifiedTime: blog.updatedAt,
    tags: blog.tags?.map((tag: BlogTag) => tag.name),
    authors: blog.authors?.map((author: BlogAuthor) => author.name),
  });
}

/**
 * Helper to generate country metadata with canonical URL
 */
export async function generateCountryMetadata(
  countrySlug: string,
  fetchCountry?: (slug: string) => Promise<Country | null>,
): Promise<Metadata> {
  if (!fetchCountry) {
    throw new Error("fetchCountry function is required");
  }

  const country = await fetchCountry(countrySlug);

  if (!country) {
    return createMetadata({
      title: "Country Not Found",
      description: "The country page you're looking for could not be found.",
      url: "/404",
    });
  }

  const canonicalUrl = getCountryCanonicalUrl(country.slug);

  return createMetadata({
    title: `${country.name} Travel Guide`,
    description:
      country.description ||
      `Discover ${country.name} with our comprehensive travel guide`,
    url: canonicalUrl,
    image: country.featuredImage?.url,
    type: "website",
  });
}

/**
 * Helper to handle redirects consistently with canonical URLs
 */
export function handleCanonicalRedirect(
  currentPath: string,
  canonicalUrl: string,
): void {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://thejetlagchronicles.com";
  const canonicalPath = canonicalUrl.replace(baseUrl, "");

  // Validate consistency in development
  validateCanonicalConsistency(currentPath, canonicalUrl);

  // If current URL doesn't match canonical, redirect
  if (currentPath !== canonicalPath) {
    redirect(canonicalPath);
  }
}
