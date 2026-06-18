import {
  BlogPost,
  BlogPostResponseV5,
  ContactUsInfo,
  Country,
  CountryResponseV5,
  CountryNameFormatted,
  CountrySlimV5,
  BlogSlugResponseV5,
  DeepInfoV5,
  Destination,
  Post,
  SlugForLifestyle,
  SlugWithCountry,
  Guide,
  GuideResponseV5,
  DetailedGuide,
  DetailedGuideResponseV5,
  GuideSamplePage,
  HomePageSpotlightData,
  HomePageResponseV5,
  LifestyleSpotlightCard,
  TrendingThisWeekCard,
  TrendingTag,
  TheJetLaggersPickCard,
  ImageV5,
  LifestyleArticle,
  LifestyleGuide,
  LifestyleGuideV5,
} from "./types";
import {
  sanitizeInternalUrls,
  logNonCanonicalUrls,
} from "@/app/utils/urlSanitizer";

// gets one country from params
// this is used for the country page
export const fetchCountry = async (
  countryName: string,
): Promise<Country[] | null> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const query = new URLSearchParams({
    "filters[slug][$eq]": countryName,
    "populate[quickFacts]": "*",
    "populate[deepInfo][populate]": "image",
    "populate[heroImage][fields][0]": "url",
    "populate[heroImage][fields][1]": "formats",
    "populate[heroImage][fields][2]": "alternativeText",
    "populate[heroImage][fields][3]": "width",
    "populate[heroImage][fields][4]": "height",
  }).toString();
  const url = `${baseUrl}/api/countries?${query}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch one country: ", res.statusText);
      return null;
    }

    const data = await res.json();
    return data.data.map((item: CountryResponseV5) => ({
      id: item.id,
      name: item.name,
      tagline: item.tagline,
      intro: item.intro,
      seoTitle: item.seoTitle || undefined,
      seoDescription: item.seoDescription || undefined,
      continent: item.continent,
      slug: item.slug,
      quickFacts: item.quickFacts,
      deepInfo: item.deepInfo.map((deepInfo: DeepInfoV5) => ({
        id: deepInfo.id,
        name: deepInfo.name,
        icon: deepInfo.icon,
        description: deepInfo.description,
        keywords: deepInfo.keywords,
        image: deepInfo.image?.url ?? "",
      })),
      heroImage: item.heroImage
        ? {
            url: item.heroImage.formats?.large?.url || item.heroImage.url,
            alternativeText: item.heroImage.alternativeText,
            width: item.heroImage.width,
            height: item.heroImage.height,
          }
        : null,
    }));
  } catch (error) {
    console.error("Error fetching the page country: ", error);
    return null;
  }
};

// Fetch a blog post from lifestyle
// this is used for the lifestyle page
export const fetchBlogPostFromLifestyle = async (
  slug: string,
): Promise<Post[] | null> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const url = `${baseUrl}/api/blogs?filters[lifestyle]=true&filters[slug][$eq]=${slug}&populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[images][fields][2]=alternativeText&populate[images][fields][3]=width&populate[images][fields][4]=height&populate[tags][fields][0]=name`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch a blog post: ", res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data.map((item: BlogPostResponseV5) => {
      const content = sanitizeInternalUrls(item.content || "");
      const description = sanitizeInternalUrls(item.description || "");

      // Log any www URLs found in development
      logNonCanonicalUrls(item.content || "", `Blog post: ${item.title}`);

      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        description,
        content,
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt,
        views: item.views,
        imageUrl:
          item.images?.[0]?.formats?.large?.url ||
          item.images?.[0]?.formats?.medium?.url ||
          item.images?.[0]?.formats?.small?.url,
        imageWidth:
          item.images?.[0]?.formats?.large?.width ||
          item.images?.[0]?.formats?.medium?.width ||
          item.images?.[0]?.formats?.small?.width,
        imageHeight:
          item.images?.[0]?.formats?.large?.height ||
          item.images?.[0]?.formats?.medium?.height ||
          item.images?.[0]?.formats?.small?.height,
        tags: item.tags?.map((tag) => tag.name) || [],
        seoTitle: item.seoTitle || undefined,
        seoDescription: item.seoDescription || undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching a blog post: ", error);
    return null;
  }
};

// Fetch a blog post based on the country and the slug
// this is used for the blog post page
export const fetchBlogPost = async (
  countrySlug: string,
  slug: string,
): Promise<Post[] | null> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  // Fetch by slug only, then filter by country
  const url = `${baseUrl}/api/blogs?filters[slug][$eq]=${slug}&populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[images][fields][2]=alternativeText&populate[images][fields][3]=width&populate[images][fields][4]=height&populate[country][fields][0]=name&populate[country][fields][1]=slug&populate[tags][fields][0]=name`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch a blog post: ", res.statusText);
      return null;
    }

    const data = await res.json();

    // Filter to match the country by slug
    const filteredData = data.data.filter((item: BlogPostResponseV5) => {
      const countrySlugFromRelation = item.country?.slug;
      return (
        countrySlugFromRelation?.toLowerCase() === countrySlug.toLowerCase()
      );
    });

    if (filteredData.length === 0) {
      return null;
    }

    return filteredData.map((item: BlogPostResponseV5) => {
      const content = sanitizeInternalUrls(item.content || "");
      const description = sanitizeInternalUrls(item.description || "");

      // Log any www URLs found in development
      logNonCanonicalUrls(item.content || "", `Blog post: ${item.title}`);

      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        description,
        content,
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt,
        views: item.views,
        imageUrl:
          item.images?.[0]?.formats?.large?.url ||
          item.images?.[0]?.formats?.medium?.url ||
          item.images?.[0]?.formats?.small?.url,
        imageWidth:
          item.images?.[0]?.formats?.large?.width ||
          item.images?.[0]?.formats?.medium?.width ||
          item.images?.[0]?.formats?.small?.width,
        imageHeight:
          item.images?.[0]?.formats?.large?.height ||
          item.images?.[0]?.formats?.medium?.height ||
          item.images?.[0]?.formats?.small?.height,
        tags: item.tags?.map((tag) => tag.name) || [],
        seoTitle: item.seoTitle || undefined,
        seoDescription: item.seoDescription || undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching a blog post: ", error);
    return null;
  }
};

// Gets the latest blog posts — used server-side with ISR (2-day revalidation).
// Throws on error to trigger the Next.js error boundary.
export const fetchLatestBlogPosts = async (): Promise<BlogPost[]> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    throw new Error("STRAPI_URL is not configured");
  }

  const url = `${baseUrl}/api/blogs?sort=publishedAt:desc&populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[images][fields][2]=alternativeText&populate[images][fields][3]=width&populate[images][fields][4]=height&populate[country][fields][0]=name&populate[country][fields][1]=slug&populate[tags][fields][0]=name`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 172800 }, // ISR: revalidate every 2 days
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch the latest blog posts: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid response format from blog posts API");
    }

    return data.data.map((item: BlogPostResponseV5) => {
      const content = sanitizeInternalUrls(item.content || "");
      const description = sanitizeInternalUrls(item.description || "");

      // Log any www URLs found in development
      logNonCanonicalUrls(
        item.content || "",
        `Latest blog post: ${item.title}`,
      );

      return {
        id: item.id,
        title: item.title,
        description,
        content,
        publishedAt: item.publishedAt,
        slug: item.slug,
        imageUrl:
          item.images?.[0]?.formats?.large?.url ||
          item.images?.[0]?.formats?.medium?.url ||
          item.images?.[0]?.formats?.small?.url ||
          "/placeholder-image.jpg",
        country: item.country?.name,
        tags: item.tags?.map((tag) => tag.name) || [],
        views: item.views,
        lifestyle: item.lifestyle || false,
      };
    });
  } catch (error) {
    console.error("Error fetching the latest blog posts:", error);
    throw error; // Re-throw to trigger Next.js error boundary
  }
};

// gets the list of countries with existing blogs
// this is used to generate the menu for destinations
export const fetchCountriesWithContinents = async (): Promise<
  Destination[] | null
> => {
  const url = `${process.env.STRAPI_URL}/api/countries?fields[0]=name&fields[1]=continent`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_READ_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch countries: ", res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data.map(
      (item: { id: number; name: string; continent: string }) => ({
        id: item.id,
        name: item.name,
        continent: item.continent,
      }),
    );
  } catch (error) {
    console.error("Error fetching countries: ", error);
    return null;
  }
};

// post a contact us message
export const postContactUs = async (data: ContactUsInfo): Promise<boolean> => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-messages`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      console.error("Failed to post contact us message: ", res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error posting contact us message: ", error);
    return false;
  }
};

// fetch all the blog slugs from a country
// this is used to generate the sitemap
export const fetchAllBlogSlugsFromCountries = async (): Promise<
  SlugWithCountry[] | null
> => {
  // Populate the singular `country` relation (blogs belong to one country)
  const url = `${process.env.STRAPI_URL}/api/blogs?fields[0]=slug&fields[1]=updatedAt&populate[country][fields][0]=slug`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch all blog slugs that belong to a country: ",
        res.statusText,
        "Status:",
        res.status,
      );
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    // Flatten blogs by their single country relation
    const blogSlugs: SlugWithCountry[] = [];
    data.data.forEach((item: BlogSlugResponseV5) => {
      if (item.country) {
        blogSlugs.push({
          id: item.id,
          slug: item.slug,
          updatedAt: item.updatedAt,
          countrySlug: item.country.slug,
        });
      }
    });

    return blogSlugs;
  } catch (error) {
    console.error(
      "Error fetching all blog slugs that belong to a country: ",
      error,
    );
    return null;
  }
};

// fetch all the countries
// this is used to generate the sitemap
export const fetchAllCountries = async (): Promise<
  CountryNameFormatted[] | null
> => {
  const url = `${process.env.STRAPI_URL}/api/countries?fields[0]=slug&fields[1]=updatedAt`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch the list of countries: ", res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data.map((item: CountrySlimV5) => ({
      id: item.id,
      slug: item.slug,
      updatedAt: item.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching the list of countries: ", error);
    return null;
  }
};

// fetch all the blog slugs where lifestyle is true
// this is used to generate the sitemap
export const fetchAllBlogSlugsFromLifestyle = async (): Promise<
  SlugForLifestyle[] | null
> => {
  const url = `${process.env.STRAPI_URL}/api/blogs?filters[lifestyle][$eq]=true&fields[0]=slug&fields[1]=updatedAt`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch all blog slugs that belong to a country: ",
        res.statusText,
      );
      return null;
    }

    const data = await res.json();

    return data.data.map((item: BlogSlugResponseV5) => ({
      id: item.id,
      slug: item.slug,
      updatedAt: item.updatedAt,
    }));
  } catch (error) {
    console.error(
      "Error fetching all blog slugs that belong to a category: ",
      error,
    );
    return null;
  }
};

// gets all blogs for a specific country via Next.js API route
// this is used for the coming soon section to show Thailand blogs
export const fetchBlogsByCountry = async (
  countrySlug: string,
): Promise<BlogPost[] | null> => {
  try {
    const url = `/api/blogs?country=${countrySlug}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch blogs for ${countrySlug}: `,
        res.statusText,
      );
      return null;
    }

    const blogs = await res.json();
    return blogs;
  } catch (error) {
    console.error(`Error fetching blogs for ${countrySlug}: `, error);
    return null;
  }
};

// Server-safe version — calls Strapi directly, safe to use in server components and generateStaticParams
export const fetchBlogsByCountryServer = async (
  countrySlug: string,
): Promise<BlogPost[] | null> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_TOKEN ||
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.STRAPI_API_READ_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const url = `${baseUrl}/api/blogs?filters[country][slug][$eq]=${countrySlug}&sort=publishedAt:desc&populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[images][fields][2]=alternativeText&populate[images][fields][3]=width&populate[images][fields][4]=height&populate[country][fields][0]=name&populate[country][fields][1]=slug&populate[tags][fields][0]=name&pagination[pageSize]=100`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 21600 },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch blogs for ${countrySlug}:`,
        res.statusText,
      );
      return null;
    }

    const data = await res.json();
    return data.data.map((item: BlogPostResponseV5) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      content: item.content,
      publishedAt: item.publishedAt,
      slug: item.slug,
      imageUrl:
        item.images?.[0]?.formats?.thumbnail?.url ||
        item.images?.[0]?.formats?.medium?.url ||
        item.images?.[0]?.formats?.small?.url,
      country: item.country?.name,
      tags: item.tags?.map((tag) => tag.name) || [],
      lifestyle: item.lifestyle || false,
      views: item.views,
    }));
  } catch (error) {
    console.error(`Error fetching blogs for ${countrySlug}:`, error);
    return null;
  }
};

// Server-side version to fetch all guides (used for the guides page)
export const fetchGuides = async (): Promise<Guide[] | null> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const url = `${baseUrl}/api/guides?sort=publishedAt:desc&populate=coverImage`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.error("Failed to fetch guides: ", res.statusText);
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) return [];

    return data.data.map((item: GuideResponseV5) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      type: item.type,
      pageCount: item.pageCount,
      priceCents: item.priceCents,
      originalPriceCents: item.originalPriceCents,
      currency: item.currency,
      coverImage: item.coverImage
        ? {
            url:
              item.coverImage.formats?.small?.url ||
              item.coverImage.formats?.medium?.url ||
              item.coverImage.url,
            width:
              item.coverImage.formats?.small?.width || item.coverImage.width,
            height:
              item.coverImage.formats?.small?.height || item.coverImage.height,
            formats: item.coverImage.formats,
            alternativeText: item.coverImage.alternativeText,
          }
        : null,
    }));
  } catch (error) {
    console.error("Error fetching guides: ", error);
    return null;
  }
};

// Slim fetcher for sitemap generation — returns only slug + updatedAt
export const fetchAllGuideSlugs = async (): Promise<
  { slug: string; updatedAt: string }[] | null
> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const url = `${baseUrl}/api/guides?fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=100`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error("Failed to fetch guide slugs for sitemap:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data.data.map((item: CountrySlimV5) => ({
      slug: item.slug,
      updatedAt: item.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching guide slugs for sitemap:", error);
    return null;
  }
};

/**
 * Fetch a specific guide by slug and type
 * Used for the specific guide landing page
 *
 * @param slug - The guide slug from the URL
 * @param type - The guide type ("single" or "bundle")
 * @returns A DetailedGuide object or null if not found/error
 */
export const fetchGuideBySlugAndType = async (
  slug: string,
  type: "single" | "bundle",
): Promise<DetailedGuide | null> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    console.error("STRAPI_URL is not defined");
    return null;
  }

  // Build the populate parameter based on type
  const typeSpecificPopulate =
    type === "single"
      ? "populate[includedInBundles][fields][0]=slug&populate[includedInBundles][fields][1]=title&populate[includedInBundles][fields][2]=description&populate[includedInBundles][fields][3]=originalPriceCents&populate[includedInBundles][fields][4]=pageCount&populate[includedInBundles][fields][5]=type&populate[includedInBundles][fields][6]=currency"
      : "populate[bundleIncludes][fields][0]=slug&populate[bundleIncludes][fields][1]=title&populate[bundleIncludes][fields][2]=description&populate[bundleIncludes][fields][3]=originalPriceCents&populate[bundleIncludes][fields][4]=pageCount&populate[bundleIncludes][fields][5]=type&populate[bundleIncludes][fields][6]=currency";

  const url = `${baseUrl}/api/guides?filters[slug][$eq]=${slug}&populate[coverImage][fields][0]=url&populate[coverImage][fields][1]=formats&populate[coverImage][fields][2]=alternativeText&populate[coverImage][fields][3]=width&populate[coverImage][fields][4]=height&populate[format]=*&populate[whoFor]=*&populate[whoNotFor]=*&populate[whatsInside]=*&populate[samplePages][fields][0]=url&populate[samplePages][fields][1]=formats&populate[samplePages][fields][2]=alternativeText&populate[samplePages][fields][3]=width&populate[samplePages][fields][4]=height&populate[samplePages][fields][5]=name&populate[samplePages][fields][6]=caption&${typeSpecificPopulate}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch guide (${slug}, ${type}): `,
        res.statusText,
      );
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      console.error(`No guide found for slug: ${slug}`);
      return null;
    }

    const item: DetailedGuideResponseV5 = data.data[0];

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      type: item.type,
      pageCount: item.pageCount,
      priceCents: item.priceCents,
      originalPriceCents: item.originalPriceCents,
      currency: item.currency,
      isFeatured: item.isFeatured,
      isLifestyle: item.isLifestyle,
      coverImage: item.coverImage
        ? {
            url:
              item.coverImage.formats?.small?.url ||
              item.coverImage.formats?.medium?.url ||
              item.coverImage.url,
            width:
              item.coverImage.formats?.small?.width || item.coverImage.width,
            height:
              item.coverImage.formats?.small?.height || item.coverImage.height,
            formats: item.coverImage.formats,
            alternativeText: item.coverImage.alternativeText,
          }
        : { url: "", width: 0, height: 0 },
      format: item.format || [],
      whoFor: item.whoFor || [],
      whoNotFor: item.whoNotFor || [],
      whatsInside: item.whatsInside || [],
      samplePages: (item.samplePages || []).map(
        (page: ImageV5): GuideSamplePage => ({
          id: page.id,
          documentId: page.documentId,
          name: page.name,
          alternativeText: page.alternativeText,
          caption: page.caption,
          width: page.width,
          height: page.height,
          url: page.url,
          formats: page.formats as GuideSamplePage["formats"],
        }),
      ),
      includedInBundles: item.includedInBundles,
      bundleIncludes: item.bundleIncludes,
    };
  } catch (error) {
    console.error(`Error fetching guide (${slug}, ${type}): `, error);
    return null;
  }
};

/**
 * Fetch homepage spotlight data: Lifestyle Spotlight (3 blogs) + Trending This Week (2 blogs)
 * Single request, single cache key, single failure mode.
 *
 * @returns HomePageSpotlightData containing both card arrays
 * @throws Error if the fetch fails or data is invalid (to trigger Next.js error boundary)
 */
export const fetchHomePageSections =
  async (): Promise<HomePageSpotlightData> => {
    const baseUrl =
      process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    const token =
      process.env.STRAPI_READ_API_TOKEN ||
      process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!baseUrl) {
      throw new Error("STRAPI_URL is not defined");
    }

    const url = `${baseUrl}/api/home-pages?populate[lifestyleSpotlight][populate][country][fields][0]=name&populate[lifestyleSpotlight][populate][tags][fields][0]=name&populate[lifestyleSpotlight][populate][images][fields][0]=url&populate[lifestyleSpotlight][populate][images][fields][1]=formats&populate[lifestyleSpotlight][populate][images][fields][2]=alternativeText&populate[trendingThisWeek][populate][country][fields][0]=name&populate[trendingThisWeek][populate][tags][fields][0]=name&populate[trendingThisWeek][populate][images][fields][0]=url&populate[trendingThisWeek][populate][images][fields][1]=formats&populate[trendingThisWeek][populate][images][fields][2]=alternativeText&populate[theJetLaggersPicks][populate][country][fields][0]=name&populate[theJetLaggersPicks][populate][tags][fields][0]=name&populate[theJetLaggersPicks][populate][images][fields][0]=url&populate[theJetLaggersPicks][populate][images][fields][1]=formats&populate[theJetLaggersPicks][populate][images][fields][2]=alternativeText`;

    try {
      const res = await fetch(url, {
        next: { revalidate: 604800 }, // Revalidate once per week (7 days)
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch homepage spotlight data: ${res.statusText}`,
        );
      }

      const rawData = await res.json();

      if (!rawData.data || rawData.data.length === 0) {
        throw new Error("No home page data found");
      }

      const homePage: HomePageResponseV5 = rawData.data[0];

      const spotlightBlogs = homePage.lifestyleSpotlight || [];
      const trendingBlogs = homePage.trendingThisWeek || [];
      const picksBlogs = (homePage.theJetLaggersPicks || []).slice(0, 4);

      const lifestyleSpotlight: LifestyleSpotlightCard[] = spotlightBlogs.map(
        (blog) => ({
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          lifestyle: blog.lifestyle ?? false,
          countryName: blog.country?.name || null,
          tags: blog.tags?.map((tag) => tag.name) || [],
          imageUrl:
            blog.images?.[0]?.formats?.small?.url ||
            blog.images?.[0]?.formats?.medium?.url ||
            blog.images?.[0]?.url ||
            "/placeholder-image.jpg",
          excerpt: blog.description || "",
        }),
      );

      const trendingThisWeek: TrendingThisWeekCard[] = trendingBlogs.map(
        (blog) => {
          const rawTags = blog.tags?.map((t) => t.name) || [];
          const tags: TrendingTag[] = [];
          const countryName = blog.country?.name || null;
          if (countryName) {
            tags.push({ label: countryName, variant: "blue" });
          }
          if (rawTags[0]) {
            tags.push({ label: rawTags[0], variant: "navy" });
          }
          return {
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            lifestyle: blog.lifestyle ?? false,
            countryName,
            imageUrl:
              blog.images?.[0]?.formats?.small?.url ||
              blog.images?.[0]?.formats?.medium?.url ||
              blog.images?.[0]?.url ||
              "/placeholder-image.jpg",
            tags,
          };
        },
      );

      const theJetLaggersPicks: TheJetLaggersPickCard[] = picksBlogs.map(
        (blog) => {
          const countryName = blog.country?.name || null;
          const rawTags = blog.tags?.map((t) => t.name) || [];
          const tags: TrendingTag[] = [];
          if (countryName) {
            tags.push({ label: countryName, variant: "blue" });
          }
          if (rawTags[0]) {
            tags.push({ label: rawTags[0], variant: "navy" });
          }
          return {
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            description: blog.description || "",
            lifestyle: blog.lifestyle ?? false,
            countryName,
            imageUrl:
              blog.images?.[0]?.formats?.small?.url ||
              blog.images?.[0]?.formats?.medium?.url ||
              blog.images?.[0]?.url ||
              "/placeholder-image.jpg",
            tags,
          };
        },
      );

      return { lifestyleSpotlight, trendingThisWeek, theJetLaggersPicks };
    } catch (error) {
      console.error("Error fetching homepage spotlight data:", error);
      throw error; // Re-throw to trigger Next.js error boundary
    }
  };

// Fetch lifestyle blog posts for the lifestyle page articles section.
// ISR: 2-day revalidation (matches the lifestyle page itself).
export const fetchLifestyleArticles = async (): Promise<LifestyleArticle[]> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    throw new Error("STRAPI_URL is not configured");
  }

  const url =
    `${baseUrl}/api/blogs` +
    `?filters[lifestyle][$eq]=true` +
    `&sort=publishedAt:desc` +
    `&populate[images][fields][0]=url` +
    `&populate[images][fields][1]=formats` +
    `&populate[images][fields][2]=alternativeText` +
    `&populate[tags][fields][0]=name` +
    `&pagination[pageSize]=20`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 172800 },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch lifestyle articles: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid response format from lifestyle articles API");
    }

    return data.data.map(
      (item: BlogPostResponseV5): LifestyleArticle => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description || "",
        publishedAt: item.publishedAt,
        imageUrl:
          item.images?.[0]?.formats?.medium?.url ||
          item.images?.[0]?.formats?.small?.url ||
          item.images?.[0]?.url,
        tags: item.tags?.map((tag) => tag.name) || [],
      }),
    );
  } catch (error) {
    console.error("Error fetching lifestyle articles:", error);
    throw error;
  }
};

// Fetch all guides with cover image and whatsInside tags, for the lifestyle guides section.
// ISR: 1-day revalidation.
export const fetchLifestyleGuides = async (): Promise<LifestyleGuide[]> => {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    throw new Error("STRAPI_URL is not configured");
  }

  const url =
    `${baseUrl}/api/guides` +
    `?sort=publishedAt:desc` +
    `&populate[coverImage][fields][0]=url` +
    `&populate[coverImage][fields][1]=formats` +
    `&populate[coverImage][fields][2]=alternativeText` +
    `&populate[coverImage][fields][3]=width` +
    `&populate[coverImage][fields][4]=height` +
    `&populate[whatsInside]=*` +
    `&pagination[pageSize]=10`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch lifestyle guides: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid response format from lifestyle guides API");
    }

    return data.data.map(
      (item: LifestyleGuideV5): LifestyleGuide => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description || "",
        type: item.type || "single",
        priceCents: item.priceCents,
        currency: item.currency || "USD",
        coverImageUrl:
          item.coverImage?.formats?.medium?.url ||
          item.coverImage?.formats?.small?.url ||
          item.coverImage?.url,
        coverImageAlt: item.coverImage?.alternativeText ?? null,
        whatsInside: (item.whatsInside || []).map((w) => ({
          id: w.id,
          title: w.title,
        })),
      }),
    );
  } catch (error) {
    console.error("Error fetching lifestyle guides:", error);
    throw error;
  }
};
