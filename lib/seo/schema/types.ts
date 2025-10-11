/**
 * TypeScript types for SEO schema input models and JSON-LD output types
 */

// Input model types
export interface OrgConfig {
  name: string;
  url: string;
  logo: ImageMeta;
  sameAs?: string[];
  contactEmail?: string;
}

export interface SiteConfig {
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
}

export interface ImageMeta {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface AuthorMeta {
  name: string;
  url?: string;
  sameAs?: string[];
  avatarUrl?: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string; // absolute URL
  position: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface VideoMeta {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  durationISO: string; // PT format
  contentUrl?: string;
  embedUrl?: string;
}

export interface ArticleMeta {
  url: string;
  slug: string;
  title: string;
  description: string;
  cover: ImageMeta;
  images?: ImageMeta[];
  tags?: string[];
  categories?: string[];
  readingTimeMins?: number;
  wordCount?: number;
  country?: string;
  datePublished: string;
  dateModified?: string;
  author: AuthorMeta;
  publisher?: AuthorMeta;
  canonical?: string;
  faq?: FAQItem[];
  video?: VideoMeta;
}

// JSON-LD output types for intellisense
export interface Organization {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: {
    "@type": "ImageObject";
    url: string;
    width: number;
    height: number;
  };
  sameAs?: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    email: string;
    contactType: "customer service";
  };
}

export interface WebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  publisher: {
    "@type": "Organization";
    name: string;
  };
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": "required name=search_term_string";
  };
}

export interface WebPage {
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  isPartOf: {
    "@type": "WebSite";
    name: string;
    url: string;
  };
  primaryImageOfPage?: {
    "@type": "ImageObject";
    url: string;
    width: number;
    height: number;
  };
}

export interface BlogPosting {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  url: string;
  description: string;
  image: Array<{
    "@type": "ImageObject";
    url: string;
    width: number;
    height: number;
  }>;
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Person";
    name: string;
    url?: string;
    sameAs?: string[];
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  keywords?: string[];
  articleSection?: string[];
  wordCount?: number;
  timeRequired?: string;
  contentLocation?: {
    "@type": "Country";
    name: string;
  };
  video?: {
    "@type": "VideoObject";
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
    contentUrl?: string;
    embedUrl?: string;
  };
}

export interface BreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQPage {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface VideoObject {
  "@context": "https://schema.org";
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl?: string;
}
