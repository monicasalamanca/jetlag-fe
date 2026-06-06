// ─── Shared utility types (unchanged) ───────────────────────────────────────

export type Format = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInbytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type Formats = {
  large?: Format;
  small?: Format;
  medium?: Format;
  thumbnail?: Format;
};

// ─── V5 wire types (flat — no .attributes, no { data: [...] } wrappers) ─────

export type ImageV5 = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats: Formats;
};

export type TagV5 = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  group: string;
};

export type CountryRefV5 = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

export type BlogPostResponseV5 = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  views: number;
  lifestyle?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  images?: ImageV5[];
  country?: CountryRefV5 | null;
  tags?: TagV5[];
};

export type DeepInfoV5 = {
  id: number;
  name: string;
  icon: string;
  description: string;
  keywords: string;
  image: ImageV5 | null;
};

export type CountryResponseV5 = {
  id: number;
  documentId: string;
  name: string;
  tagline: string;
  intro: string;
  seoTitle?: string;
  seoDescription?: string;
  continent: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  quickFacts: QuickFact[];
  deepInfo: DeepInfoV5[];
  heroImage?: ImageV5 | null;
};

export type CountrySlimV5 = {
  id: number;
  documentId: string;
  slug: string;
  updatedAt: string;
};

export type BlogSlugResponseV5 = {
  id: number;
  documentId: string;
  slug: string;
  updatedAt: string;
  country?: { id: number; documentId: string; slug: string } | null;
};

export type GuideResponseV5 = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  pageCount: number;
  priceCents: number | null;
  originalPriceCents: number | null;
  currency: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage?: ImageV5 | null;
};

export type GuideBundleOrSingleV5 = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  pageCount: number;
  priceCents: number | null;
  originalPriceCents: number | null;
  currency: string;
  isFeatured: boolean;
  isLifestyle: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type DetailedGuideResponseV5 = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  type: "single" | "bundle";
  pageCount: number;
  priceCents: number | null;
  originalPriceCents: number | null;
  currency: string;
  isFeatured: boolean;
  isLifestyle: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage?: ImageV5 | null;
  format: GuideFormat[];
  whoFor: GuideWhoFor[];
  whoNotFor: GuideWhoNotFor[];
  whatsInside: GuideWhatsInside[];
  samplePages?: ImageV5[];
  includedInBundles?: GuideBundleOrSingleV5[];
  bundleIncludes?: GuideBundleOrSingleV5[];
};

export type HomePageResponseV5 = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  lifestyleSpotlight?: BlogPostResponseV5[];
  trendingThisWeek?: BlogPostResponseV5[];
  theJetLaggersPicks?: BlogPostResponseV5[];
};

// ─── Domain types (consumed by components — unchanged) ───────────────────────

export type Country = {
  id: number;
  name: string;
  slug: string;
  continent: string;
  tagline: string;
  intro: string;
  seoTitle?: string;
  seoDescription?: string;
  quickFacts: QuickFact[];
  deepInfo: DeepInfo[];
  heroImage?: {
    url: string;
    alternativeText: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type CountryNameFormatted = {
  id: number;
  slug: string;
  updatedAt: string;
};

export type QuickFact = {
  id: number;
  label: string;
  description: string;
  icon: string;
};

export type DeepInfo = {
  id: number;
  name: string;
  icon: string;
  description: string;
  keywords: string;
  image: string;
};

export type BlogPost = {
  id: number;
  title: string;
  description: string;
  content: string;
  views: number;
  lifestyle?: boolean;
  publishedAt: string;
  imageUrl: string;
  country?: string;
  slug: string;
  tags: string[];
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  views: number;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Destination = {
  id: number;
  name: string;
  continent: string;
};

export type GroupedCountries = {
  [continent: string]: string[];
};

export type ContactUsInfo = {
  name: string;
  email: string;
  message: string;
};

export type SlugWithCountry = {
  id: number;
  slug: string;
  updatedAt: string;
  countrySlug: string;
};

export type SlugForLifestyle = {
  id: number;
  slug: string;
  updatedAt: string;
};

// ─── Guide domain types ───────────────────────────────────────────────────────

export type Guide = {
  id: number;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: string;
  pageCount: number;
  priceCents: number | null;
  originalPriceCents: number | null;
  currency: string;
  coverImage: {
    url: string;
    width: number;
    height: number;
    formats?: Record<string, { url: string; width: number; height: number }>;
    alternativeText?: string | null;
  };
};

export type GuideFormat = {
  id: number;
  type: string;
  lemonSqueezyUrl: string;
};

export type GuideWhoFor = {
  id: number;
  whoFor: string;
};

export type GuideWhoNotFor = {
  id: number;
  whoNotFor: string;
};

export type GuideWhatsInside = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type GuideSamplePageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type GuideSamplePage = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats: {
    small?: GuideSamplePageFormat;
    thumbnail?: GuideSamplePageFormat;
    [key: string]: GuideSamplePageFormat | undefined;
  };
};

export type GuideBundleOrSingle = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  pageCount: number;
  priceCents: number | null;
  originalPriceCents: number | null;
  currency: string;
  isFeatured: boolean;
  isLifestyle: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type DetailedGuide = {
  id: number;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: "single" | "bundle";
  pageCount: number;
  priceCents: number | null;
  originalPriceCents: number | null;
  currency: string;
  isFeatured: boolean;
  isLifestyle: boolean;
  coverImage: {
    url: string;
    width: number;
    height: number;
    formats?: Record<string, { url: string; width: number; height: number }>;
    alternativeText?: string | null;
  };
  format: GuideFormat[];
  whoFor: GuideWhoFor[];
  whoNotFor: GuideWhoNotFor[];
  whatsInside: GuideWhatsInside[];
  samplePages: GuideSamplePage[];
  includedInBundles?: GuideBundleOrSingle[];
  bundleIncludes?: GuideBundleOrSingle[];
};

// ─── Homepage card types (unchanged) ─────────────────────────────────────────

export type TrendingTag = {
  label: string;
  variant: "blue" | "navy" | "green" | "coral" | "gold";
};

export type TrendingThisWeekCard = {
  id: number;
  title: string;
  slug: string;
  lifestyle: boolean;
  countryName: string | null;
  imageUrl: string;
  tags: TrendingTag[];
  readTime?: number;
};

export type TheJetLaggersPickCard = {
  id: number;
  title: string;
  slug: string;
  description: string;
  lifestyle: boolean;
  countryName: string | null;
  imageUrl: string;
  tags: TrendingTag[];
  readTime?: number;
};

export type LifestyleSpotlightCard = {
  id: number;
  title: string;
  slug: string;
  lifestyle: boolean;
  countryName: string | null;
  tags: string[];
  imageUrl: string;
  excerpt: string;
};

export type HomePageSpotlightData = {
  lifestyleSpotlight: LifestyleSpotlightCard[];
  trendingThisWeek: TrendingThisWeekCard[];
  theJetLaggersPicks: TheJetLaggersPickCard[];
};
