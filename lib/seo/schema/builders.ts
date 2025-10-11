/**
 * Schema.org JSON-LD builders for The Jet Lag Chronicles
 */

import type {
  OrgConfig,
  SiteConfig,
  ArticleMeta,
  BreadcrumbItem,
  FAQItem,
  ImageMeta,
  VideoMeta,
  Organization,
  WebSite,
  WebPage,
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  VideoObject,
} from "./types";
import { clean, absUrl, iso } from "./utils";
import { SITE_CONFIG } from "./config";

/**
 * Build Organization schema
 */
export function buildOrganization(org: OrgConfig): Organization {
  return clean({
    "@context": "https://schema.org" as const,
    "@type": "Organization" as const,
    name: org.name,
    url: absUrl(org.url),
    logo: {
      "@type": "ImageObject" as const,
      url: absUrl(org.logo.url),
      width: org.logo.width,
      height: org.logo.height,
    },
    sameAs: org.sameAs,
    contactPoint: org.contactEmail
      ? {
          "@type": "ContactPoint" as const,
          email: org.contactEmail,
          contactType: "customer service" as const,
        }
      : undefined,
  });
}

/**
 * Build WebSite schema with search action
 */
export function buildWebSite(site: SiteConfig): WebSite {
  return clean({
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    name: site.name,
    url: absUrl(site.url),
    description: site.description,
    inLanguage: site.inLanguage || "en",
    publisher: {
      "@type": "Organization" as const,
      name: site.name,
    },
    potentialAction: {
      "@type": "SearchAction" as const,
      target: {
        "@type": "EntryPoint" as const,
        urlTemplate: `${absUrl(site.url)}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string" as const,
    },
  });
}

/**
 * Build BreadcrumbList schema
 */
export function buildBreadcrumbList(items: BreadcrumbItem[]): BreadcrumbList {
  return clean({
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: items.map((item) => ({
      "@type": "ListItem" as const,
      position: item.position,
      name: item.name,
      item: absUrl(item.item),
    })),
  });
}

/**
 * Build WebPage schema
 */
export function buildWebPage(params: {
  url: string;
  title: string;
  description?: string;
  lang?: string;
  image?: ImageMeta;
}): WebPage {
  return clean({
    "@context": "https://schema.org" as const,
    "@type": "WebPage" as const,
    name: params.title,
    url: absUrl(params.url),
    description: params.description,
    inLanguage: params.lang || "en",
    isPartOf: {
      "@type": "WebSite" as const,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    primaryImageOfPage: params.image
      ? {
          "@type": "ImageObject" as const,
          url: absUrl(params.image.url),
          width: params.image.width,
          height: params.image.height,
        }
      : undefined,
  });
}

/**
 * Build BlogPosting schema
 */
export function buildBlogPosting(article: ArticleMeta): BlogPosting {
  const images = [article.cover, ...(article.images || [])];

  return clean({
    "@context": "https://schema.org" as const,
    "@type": "BlogPosting" as const,
    headline: article.title,
    url: absUrl(article.url),
    description: article.description,
    image: images.map((img) => ({
      "@type": "ImageObject" as const,
      url: absUrl(img.url),
      width: img.width,
      height: img.height,
    })),
    datePublished: iso(article.datePublished),
    dateModified: article.dateModified ? iso(article.dateModified) : undefined,
    author: {
      "@type": "Person" as const,
      name: article.author.name,
      url: article.author.url ? absUrl(article.author.url) : undefined,
      sameAs: article.author.sameAs,
    },
    publisher: {
      "@type": "Organization" as const,
      name: article.publisher?.name || SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject" as const,
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo.url}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage" as const,
      "@id": absUrl(article.url),
    },
    keywords: article.tags,
    articleSection: article.categories,
    wordCount: article.wordCount,
    timeRequired: article.readingTimeMins
      ? `PT${article.readingTimeMins}M`
      : undefined,
    contentLocation: article.country
      ? {
          "@type": "Country" as const,
          name: article.country,
        }
      : undefined,
    video: article.video
      ? {
          "@type": "VideoObject" as const,
          name: article.video.name,
          description: article.video.description,
          thumbnailUrl: absUrl(article.video.thumbnailUrl),
          uploadDate: iso(article.video.uploadDate),
          duration: article.video.durationISO,
          contentUrl: article.video.contentUrl
            ? absUrl(article.video.contentUrl)
            : undefined,
          embedUrl: article.video.embedUrl
            ? absUrl(article.video.embedUrl)
            : undefined,
        }
      : undefined,
  });
}

/**
 * Build FAQPage schema
 */
export function buildFAQPage(faq: FAQItem[]): FAQPage {
  return clean({
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: faq.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answer,
      },
    })),
  });
}

/**
 * Build VideoObject schema
 */
export function buildVideoObject(video: VideoMeta): VideoObject {
  return clean({
    "@context": "https://schema.org" as const,
    "@type": "VideoObject" as const,
    name: video.name,
    description: video.description,
    thumbnailUrl: absUrl(video.thumbnailUrl),
    uploadDate: iso(video.uploadDate),
    duration: video.durationISO,
    contentUrl: video.contentUrl ? absUrl(video.contentUrl) : undefined,
    embedUrl: video.embedUrl ? absUrl(video.embedUrl) : undefined,
  });
}
