/**
 * Page-specific schema components
 */

import JsonLd from "./JsonLd";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildBlogPosting,
  buildFAQPage,
} from "../../lib/seo/schema/builders";
import type {
  ImageMeta,
  BreadcrumbItem,
  ArticleMeta,
  FAQItem,
} from "../../lib/seo/schema/types";

interface PageSchemasProps {
  page: {
    url: string; // absolute URL
    title: string;
    description?: string;
    lang?: string; // e.g., "en"
    image?: ImageMeta;
  };
  breadcrumbs?: BreadcrumbItem[];
  article?: ArticleMeta; // when the page is a blog post
  faq?: FAQItem[]; // optional standalone FAQ
}

/**
 * High-level component to compose per-page schemas
 *
 * @example
 * ```tsx
 * // Country category page (non-article)
 * <PageSchemas
 *   page={{
 *     url: `${SITE_URL}/thailand`,
 *     title: "Thailand Travel — Guides, Tips & Nomad Life",
 *     description: "No-fluff travel and expat insights for Thailand.",
 *     lang: "en",
 *     image: { url: `${SITE_URL}/og/thailand.png`, width: 1200, height: 630, alt: "Thailand" }
 *   }}
 *   breadcrumbs={[
 *     { name: "Home", item: SITE_URL, position: 1 },
 *     { name: "Thailand", item: `${SITE_URL}/thailand`, position: 2 }
 *   ]}
 * />
 *
 * // Blog post page
 * <PageSchemas
 *   page={{
 *     url: `${SITE_URL}/digital-nomad-guide-thailand`,
 *     title: "Complete Digital Nomad Guide to Thailand",
 *     description: "Everything you need to know about living as a digital nomad in Thailand.",
 *     lang: "en"
 *   }}
 *   breadcrumbs={[
 *     { name: "Home", item: SITE_URL, position: 1 },
 *     { name: "Thailand", item: `${SITE_URL}/thailand`, position: 2 },
 *     { name: "Digital Nomad Guide", item: `${SITE_URL}/digital-nomad-guide-thailand`, position: 3 }
 *   ]}
 *   article={{
 *     url: `${SITE_URL}/digital-nomad-guide-thailand`,
 *     slug: "digital-nomad-guide-thailand",
 *     title: "Complete Digital Nomad Guide to Thailand",
 *     description: "Everything you need to know about living as a digital nomad in Thailand.",
 *     cover: { url: `${SITE_URL}/images/thailand-nomad.jpg`, width: 1200, height: 630, alt: "Digital nomad working in Thailand" },
 *     tags: ["digital nomad", "thailand", "remote work"],
 *     categories: ["Thailand", "Digital Nomad"],
 *     readingTimeMins: 15,
 *     wordCount: 3000,
 *     country: "Thailand",
 *     datePublished: "2024-01-15T10:00:00Z",
 *     dateModified: "2024-02-01T10:00:00Z",
 *     author: { name: "Monica & Danny", url: `${SITE_URL}/about` }
 *   }}
 * />
 * ```
 */
export default function PageSchemas({
  page,
  breadcrumbs,
  article,
  faq,
}: PageSchemasProps) {
  // Always render WebPage
  const webPageSchema = buildWebPage(page);

  return (
    <>
      <JsonLd data={webPageSchema} />

      {/* Breadcrumbs if provided */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <JsonLd data={buildBreadcrumbList(breadcrumbs)} />
      )}

      {/* Article schema if this is a blog post */}
      {article && <JsonLd data={buildBlogPosting(article)} />}

      {/* FAQ schema from article or standalone */}
      {(article?.faq || faq) && (
        <JsonLd data={buildFAQPage(article?.faq || faq!)} />
      )}
    </>
  );
}

// Usage examples in comments:
/*
// Example 1: Country category page (non-article)
<SiteSchemas />
<PageSchemas
  page={{
    url: `${SITE_URL}/thailand`,
    title: "Thailand Travel — Guides, Tips & Nomad Life",
    description: "No-fluff travel and expat insights for Thailand.",
    lang: "en",
    image: { url: `${SITE_URL}/og/thailand.png`, width: 1200, height: 630, alt: "Thailand" }
  }}
  breadcrumbs={[
    { name: "Home", item: SITE_URL, position: 1 },
    { name: "Thailand", item: `${SITE_URL}/thailand`, position: 2 }
  ]}
/>

// Example 2: Blog post with FAQ
<SiteSchemas />
<PageSchemas
  page={{
    url: `${SITE_URL}/digital-nomad-guide-thailand`,
    title: "Complete Digital Nomad Guide to Thailand",
    description: "Everything you need to know about living as a digital nomad in Thailand.",
    lang: "en"
  }}
  breadcrumbs={[
    { name: "Home", item: SITE_URL, position: 1 },
    { name: "Thailand", item: `${SITE_URL}/thailand`, position: 2 },
    { name: "Digital Nomad Guide", item: `${SITE_URL}/digital-nomad-guide-thailand`, position: 3 }
  ]}
  article={{
    url: `${SITE_URL}/digital-nomad-guide-thailand`,
    slug: "digital-nomad-guide-thailand",
    title: "Complete Digital Nomad Guide to Thailand",
    description: "Everything you need to know about living as a digital nomad in Thailand.",
    cover: { url: `${SITE_URL}/images/thailand-nomad.jpg`, width: 1200, height: 630 },
    tags: ["digital nomad", "thailand", "remote work"],
    categories: ["Thailand", "Digital Nomad"],
    readingTimeMins: 15,
    wordCount: 3000,
    country: "Thailand",
    datePublished: "2024-01-15T10:00:00Z",
    dateModified: "2024-02-01T10:00:00Z",
    author: { name: "Monica & Danny", url: `${SITE_URL}/about` },
    faq: [
      { question: "Is Thailand good for digital nomads?", answer: "Yes, Thailand offers excellent infrastructure..." },
      { question: "What visa do I need?", answer: "For digital nomads, consider the Tourist visa..." }
    ]
  }}
/>

// Example 3: Simple page with standalone FAQ
<SiteSchemas />
<PageSchemas
  page={{
    url: `${SITE_URL}/faq`,
    title: "Frequently Asked Questions",
    description: "Common questions about travel and digital nomad life."
  }}
  faq={[
    { question: "How do you fund your travels?", answer: "We work remotely and have multiple income streams..." },
    { question: "What gear do you travel with?", answer: "We keep our gear minimal but functional..." }
  ]}
/>
*/
