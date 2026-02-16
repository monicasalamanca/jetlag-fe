import {
  BlogPost,
  BlogPostResponse,
  ContactUsInfo,
  Country,
  CountryName,
  CountryNameFormatted,
  Destination,
  Post,
  SlugForLifestyle,
  SlugWithCountry,
  SlugsResponseForLifestyle,
  Guide,
  GuideResponse,
  DetailedGuide,
  DetailedGuideResponse,
  LifestyleSpotlightCard,
  LifestyleSpotlightResponse,
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
  }).toString();
  // const url = `http://localhost:1337/api/countries?filters[slug][$eq]=${countryName}&populate[quickFacts]=*&populate[deepInfo][populate]=image`;
  const url = `${baseUrl}/api/countries?${query}`;

  try {
    // const res = await fetch(url, { next: { revalidate: 604800 } }); // its cached for a week
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      tagline: item.attributes.tagline,
      intro: item.attributes.intro,
      continent: item.attributes.continent,
      slug: item.attributes.slug,
      quickFacts: item.attributes.quickFacts,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deepInfo: item.attributes.deepInfo.map((deepInfo: any) => ({
        id: deepInfo.id,
        name: deepInfo.name,
        icon: deepInfo.icon,
        description: deepInfo.description,
        keywords: deepInfo.keywords,
        image: deepInfo.image.data.attributes.url,
      })),
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

  const url = `${baseUrl}/api/blogs?filters[lifestyle]=true&filters[slug][$eq]=${slug}&populate[images]=*`;
  try {
    // const res = await fetch(url, { next: { revalidate: 86400 } }); // its cached for a week
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
    return data.data.map((item: BlogPostResponse) => {
      const content = sanitizeInternalUrls(item.attributes.content || "");
      const description = sanitizeInternalUrls(
        item.attributes.description || "",
      );

      // Log any www URLs found in development
      logNonCanonicalUrls(
        item.attributes.content || "",
        `Blog post: ${item.attributes.title}`,
      );

      return {
        id: item.id,
        title: item.attributes.title,
        slug: item.attributes.slug,
        description,
        content,
        publishedAt: item.attributes.publishedAt,
        views: item.attributes.views,
        imageUrl:
          item.attributes.images?.data?.[0]?.attributes?.formats?.large?.url ||
          item.attributes.images?.data?.[0]?.attributes?.formats?.medium?.url ||
          item.attributes.images?.data?.[0]?.attributes?.formats?.small?.url,
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
  const url = `${baseUrl}/api/blogs?filters[slug][$eq]=${slug}&populate[images]=*&populate[country]=*`;
  try {
    // const res = await fetch(url, { next: { revalidate: 86400 } }); // its cached for a week
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
    const filteredData = data.data.filter((item: BlogPostResponse) => {
      const countrySlugFromRelation =
        item.attributes.country?.data?.attributes?.slug;
      return (
        countrySlugFromRelation?.toLowerCase() === countrySlug.toLowerCase()
      );
    });

    if (filteredData.length === 0) {
      return null;
    }

    const data2 = { data: filteredData };

    return data2.data.map((item: BlogPostResponse) => {
      const content = sanitizeInternalUrls(item.attributes.content || "");
      const description = sanitizeInternalUrls(
        item.attributes.description || "",
      );

      // Log any www URLs found in development
      logNonCanonicalUrls(
        item.attributes.content || "",
        `Blog post: ${item.attributes.title}`,
      );

      return {
        id: item.id,
        title: item.attributes.title,
        slug: item.attributes.slug,
        description,
        content,
        publishedAt: item.attributes.publishedAt,
        views: item.attributes.views,
        imageUrl:
          item.attributes.images?.data?.[0]?.attributes?.formats?.large?.url ||
          item.attributes.images?.data?.[0]?.attributes?.formats?.medium?.url ||
          item.attributes.images?.data?.[0]?.attributes?.formats?.small?.url,
      };
    });
  } catch (error) {
    console.error("Error fetching a blog post: ", error);
    return null;
  }
};

// gets all the latest blog posts
// this is used for the home page
// TODO: as it gets bigger limit to 3 or 4 posts only
export const fetchLatestBlogPosts = async (): Promise<BlogPost[] | null> => {
  // const url = `${process.env.STRAPI_URL}/api/blogs?sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=3&populate[images]=*&populate[category]=*`;
  const url = `${process.env.STRAPI_URL}/api/blogs?sort=publishedAt:desc&populate[images]=*&populate[country]=*&populate[tags]=*`;

  try {
    // const res = await fetch(url, { next: { revalidate: 604800 } }); // it caches for a week
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_READ_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch the latest blog posts: ", res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data.map((item: BlogPostResponse) => {
      const content = sanitizeInternalUrls(item.attributes.content || "");
      const description = sanitizeInternalUrls(
        item.attributes.description || "",
      );

      // Log any www URLs found in development
      logNonCanonicalUrls(
        item.attributes.content || "",
        `Latest blog post: ${item.attributes.title}`,
      );

      return {
        id: item.id,
        title: item.attributes.title,
        description,
        content,
        publishedAt: item.attributes.publishedAt,
        slug: item.attributes.slug,
        imageUrl:
          item.attributes.images?.data?.[0]?.attributes?.formats?.large?.url ||
          item.attributes.images?.data?.[0]?.attributes?.formats?.medium?.url ||
          item.attributes.images?.data?.[0]?.attributes?.formats?.small?.url,
        country: item.attributes.country?.data?.attributes?.name,
        tags:
          item.attributes.tags?.data?.map((tag) => tag.attributes.name) || [],
        views: item.attributes.views,
        lifestyle: item.attributes.lifestyle || false,
      };
    });
  } catch (error) {
    console.error("Error fetching the latests blog posts: ", error);
    return null;
  }
};

// Client-side version of fetchLatestBlogPosts for use in client components
export const fetchLatestBlogPostsClient = async (): Promise<
  BlogPost[] | null
> => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_STRAPI_URL is not defined");
    return null;
  }

  const url = `${baseUrl}/api/blogs?sort=publishedAt:desc&populate[images]=*&populate[country]=*&populate[tags]=*`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch the latest blog posts (client): ",
        res.statusText,
      );
      return null;
    }

    const data = await res.json();

    return data.data.map((item: BlogPostResponse) => {
      const content = sanitizeInternalUrls(item.attributes.content || "");
      const description = sanitizeInternalUrls(
        item.attributes.description || "",
      );

      // Log any www URLs found in development
      logNonCanonicalUrls(
        item.attributes.content || "",
        `Latest blog post (client): ${item.attributes.title}`,
      );

      return {
        id: item.id,
        title: item.attributes.title,
        description,
        content,
        publishedAt: item.attributes.publishedAt,
        slug: item.attributes.slug,
        imageUrl:
          item.attributes.images?.data?.[0]?.attributes?.formats?.large?.url ||
          item.attributes.images?.data?.[0]?.attributes?.formats?.medium?.url ||
          item.attributes.images?.data?.[0]?.attributes?.formats?.small?.url ||
          "/placeholder-image.jpg",
        country: item.attributes.country?.data?.attributes?.name,
        tags:
          item.attributes.tags?.data?.map((tag) => tag.attributes.name) || [],
        views: item.attributes.views,
        lifestyle: item.attributes.lifestyle || false,
      };
    });
  } catch (error) {
    console.error("Error fetching the latest blog posts (client): ", error);
    return null;
  }
};

// gets the list of countries with existing blogs
// this is used to generate the menu for destinations
export const fetchCountriesWithContinents = async (): Promise<
  Destination[] | null
> => {
  const url = `${process.env.STRAPI_URL}/api/countries?filters[publishedAt][$notNull]=true&fields[0]=name&fields[1]=continent`;
  try {
    // const res = await fetch(url, { next: { revalidate: 604800 } }); // its cached for a week
    const res = await fetch(url, {
      // cache: "no-store",
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      continent: item.attributes.continent,
    }));
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
  const url = `${process.env.STRAPI_URL}/api/blogs?filters[publishedAt][$notNull]=true&fields[0]=slug&fields[1]=updatedAt&populate[country][fields][0]=slug`;

  try {
    const res = await fetch(url, {
      // cache: "no-store",
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
    data.data.forEach(
      (item: {
        id: number;
        attributes: {
          slug: string;
          updatedAt: string;
          country?: { data?: { attributes: { slug: string } } };
        };
      }) => {
        const countryData = item.attributes.country?.data;
        if (countryData) {
          blogSlugs.push({
            id: item.id,
            slug: item.attributes.slug,
            updatedAt: item.attributes.updatedAt,
            countrySlug: countryData.attributes.slug,
          });
        }
      },
    );

    return blogSlugs;
  } catch (error) {
    console.error(
      "Error fetching all blog slugs that belong to a country: ",
      error,
    );
    return null;
  }
};

// fetch all teh countries
// this is used to generate the sitemap
export const fetchAllCountries = async (): Promise<
  CountryNameFormatted[] | null
> => {
  const url = `${process.env.STRAPI_URL}/api/countries?fields[0]=slug&fields[1]=updatedAt`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      // next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch the list of countries: ", res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data.map((item: CountryName) => ({
      id: item.id,
      slug: item.attributes.slug,
      updatedAt: item.attributes.updatedAt,
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
  const url = `${process.env.STRAPI_URL}/api/blogs?filters[lifestyle][$eq]=true&filters[publishedAt][$notNull]=true&fields[0]=slug&fields[1]=updatedAt`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      // next: { revalidate: 3600 },
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

    return data.data.map((item: SlugsResponseForLifestyle) => ({
      id: item.id,
      slug: item.attributes.slug,
      updatedAt: item.attributes.updatedAt,
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

// Client-side version to fetch all guides
// this is used for the guides page
export const fetchGuidesClient = async (): Promise<Guide[] | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_STRAPI_URL is not defined");
    return null;
  }

  const url = `${baseUrl}/api/guides?sort=publishedAt:desc&populate=coverImage`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch guides (client): ", res.statusText);
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data.map((item: GuideResponse) => {
      const coverImageData = item.attributes.coverImage?.data;

      return {
        id: item.id,
        title: item.attributes.title,
        slug: item.attributes.slug,
        description: item.attributes.description,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        publishedAt: item.attributes.publishedAt,
        type: item.attributes.type,
        pageCount: item.attributes.pageCount,
        priceCents: item.attributes.priceCents,
        originalPriceCents: item.attributes.originalPriceCents,
        currency: item.attributes.currency,
        coverImage: coverImageData
          ? {
              url:
                coverImageData.attributes.formats?.small?.url ||
                coverImageData.attributes.formats?.medium?.url ||
                coverImageData.attributes.url,
              width:
                coverImageData.attributes.formats?.small?.width ||
                coverImageData.attributes.width,
              height:
                coverImageData.attributes.formats?.small?.height ||
                coverImageData.attributes.height,
              formats: coverImageData.attributes.formats,
              alternativeText: coverImageData.attributes.alternativeText,
            }
          : null,
      };
    });
  } catch (error) {
    console.error("Error fetching guides (client): ", error);
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
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_STRAPI_URL is not defined");
    return null;
  }

  // Build the populate parameter based on type
  const typeSpecificPopulate =
    type === "single"
      ? "populate[includedInBundles]=*"
      : "populate[bundleIncludes]=*";

  const url = `${baseUrl}/api/guides?filters[slug][$eq]=${slug}&populate[coverImage]=*&populate[format]=*&populate[whoFor]=*&populate[whoNotFor]=*&populate[whatsInside]=*&populate[samplePages]=*&${typeSpecificPopulate}`;

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

    const item: DetailedGuideResponse = data.data[0];
    const coverImageData = item.attributes.coverImage.data;

    return {
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      description: item.attributes.description,
      createdAt: item.attributes.createdAt,
      updatedAt: item.attributes.updatedAt,
      publishedAt: item.attributes.publishedAt,
      type: item.attributes.type,
      pageCount: item.attributes.pageCount,
      priceCents: item.attributes.priceCents,
      originalPriceCents: item.attributes.originalPriceCents,
      currency: item.attributes.currency,
      isFeatured: item.attributes.isFeatured,
      isLifestyle: item.attributes.isLifestyle,
      coverImage: {
        url:
          coverImageData.attributes.formats?.small?.url ||
          coverImageData.attributes.formats?.medium?.url ||
          coverImageData.attributes.url,
        width:
          coverImageData.attributes.formats?.small?.width ||
          coverImageData.attributes.width,
        height:
          coverImageData.attributes.formats?.small?.height ||
          coverImageData.attributes.height,
        formats: coverImageData.attributes.formats,
        alternativeText: coverImageData.attributes.alternativeText,
      },
      format: item.attributes.format || [],
      whoFor: item.attributes.whoFor || [],
      whoNotFor: item.attributes.whoNotFor || [],
      whatsInside: item.attributes.whatsInside || [],
      samplePages: item.attributes.samplePages?.data || [],
      includedInBundles: item.attributes.includedInBundles?.data,
      bundleIncludes: item.attributes.bundleIncludes?.data,
    };
  } catch (error) {
    console.error(`Error fetching guide (${slug}, ${type}): `, error);
    return null;
  }
};

/**
 * Fetch lifestyle spotlight cards for the homepage
 * Used to display 3 featured lifestyle cards on the home page
 *
 * @returns An array of 3 LifestyleSpotlightCard objects
 * @throws Error if the fetch fails or data is invalid (to trigger Next.js error boundary)
 */
export const fetchLifestyleSpotlightCards = async (): Promise<
  LifestyleSpotlightCard[]
> => {
  // 🧪 TEST ERROR: Uncomment to test error boundary
  const ENABLE_TEST_ERROR = false; // Set to false to disable test error

  if (ENABLE_TEST_ERROR) {
    throw new Error("TEST: Error boundary is working!");
  }

  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_READ_API_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    throw new Error("STRAPI_URL is not defined");
  }

  const url = `${baseUrl}/api/home-pages?populate[lifestyleSpotlight][fields][0]=title&populate[lifestyleSpotlight][fields][1]=slug&populate[lifestyleSpotlight][fields][2]=lifestyle&populate[lifestyleSpotlight][populate][country][fields][0]=name&populate[lifestyleSpotlight][populate][tags][fields][0]=name&populate[lifestyleSpotlight][populate][images]=*`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 604800 }, // Revalidate once per week (7 days)
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch lifestyle spotlight cards: ${res.statusText}`,
      );
    }

    const data: LifestyleSpotlightResponse = await res.json();

    if (!data.data || data.data.length === 0) {
      throw new Error("No home page data found");
    }

    const homePageData = data.data[0];
    const spotlightBlogs =
      homePageData.attributes.lifestyleSpotlight?.data || [];

    if (spotlightBlogs.length === 0) {
      throw new Error("No lifestyle spotlight blogs found");
    }

    // Map the response to LifestyleSpotlightCard format
    return spotlightBlogs.map((blog) => ({
      id: blog.id,
      title: blog.attributes.title,
      slug: blog.attributes.slug,
      lifestyle: blog.attributes.lifestyle,
      countryName: blog.attributes.country?.data?.attributes?.name || null,
      tags: blog.attributes.tags?.data?.map((tag) => tag.attributes.name) || [],
      imageUrl:
        blog.attributes.images?.data?.[0]?.attributes?.formats?.small?.url ||
        blog.attributes.images?.data?.[0]?.attributes?.formats?.medium?.url ||
        blog.attributes.images?.data?.[0]?.attributes?.url ||
        "/placeholder-image.jpg",
    }));
  } catch (error) {
    console.error("Error fetching lifestyle spotlight cards:", error);
    throw error; // Re-throw to trigger Next.js error boundary
  }
};
