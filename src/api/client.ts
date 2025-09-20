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
} from "./types";

// gets one country from params
// this is used for the country page
export const fetchCountry = async (
  countryName: string,
): Promise<Country[] | null> => {
  const query = new URLSearchParams({
    "filters[slug][$eq]": countryName,
    "populate[quickFacts]": "*",
    "populate[deepInfo][populate]": "image",
  }).toString();
  // const url = `http://localhost:1337/api/countries?filters[slug][$eq]=${countryName}&populate[quickFacts]=*&populate[deepInfo][populate]=image`;
  const url = `${process.env.STRAPI_URL}/api/countries?${query}`;

  try {
    // const res = await fetch(url, { next: { revalidate: 604800 } }); // its cached for a week
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_READ_API_TOKEN}`,
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
  const url = `${process.env.STRAPI_URL}/api/blogs?filters[lifestyle]=true&filters[slug][$eq]=${slug}`;
  try {
    // const res = await fetch(url, { next: { revalidate: 86400 } }); // its cached for a week
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch a blog post: ", res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data.map((item: BlogPostResponse) => ({
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      description: item.attributes.description,
      content: item.attributes.content,
      publishedAt: item.attributes.publishedAt,
      likes: item.attributes.likes,
      views: item.attributes.views,
    }));
  } catch (error) {
    console.error("Error fetching a blog post: ", error);
    return null;
  }
};

// Fetch a blog post based on the country and the slug
// this is used for the blog post page
export const fetchBlogPost = async (
  category: string,
  slug: string,
): Promise<Post[] | null> => {
  const url = `${process.env.STRAPI_URL}/api/blogs?filters[countries][slug][$eq]=${category}&filters[slug][$eq]=${slug}&populate[poll][populate]=options`;
  try {
    // const res = await fetch(url, { next: { revalidate: 86400 } }); // its cached for a week
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch a blog post: ", res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data.map((item: BlogPostResponse) => {
      const pollData = item.attributes.poll?.data;
      return {
        id: item.id,
        title: item.attributes.title,
        slug: item.attributes.slug,
        description: item.attributes.description,
        content: item.attributes.content,
        publishedAt: item.attributes.publishedAt,
        likes: item.attributes.likes,
        views: item.attributes.views,
        poll: pollData
          ? {
              id: pollData.id,
              slug: pollData.attributes.slug,
              question: pollData.attributes.question,
              options: pollData.attributes.options.map((option) => ({
                id: option.id,
                label: option.label,
                votes: option.votes,
              })),
              ctaTitle: pollData.attributes.ctaTitle,
              ctaDescription: pollData.attributes.ctaDescription,
              ctaButtonText: pollData.attributes.ctaButtonText,
            }
          : null,
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
  const url = `${process.env.STRAPI_URL}/api/blogs?sort=publishedAt:desc&populate[images]=*&populate[category]=*`;

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

    return data.data.map((item: BlogPostResponse) => ({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      content: item.attributes.content,
      publishedAt: item.attributes.publishedAt,
      likes: item.attributes.likes,
      imageUrl:
        item.attributes.images?.data[0]?.attributes?.formats?.thumbnail?.url,
      category: item.attributes.category?.data.attributes.name,
    }));
  } catch (error) {
    console.error("Error fetching the latests blog posts: ", error);
    return null;
  }
};

// gets the list of countries with existing blogs
// this is used to generate the menu for destinations
export const fetchCountriesWithContinents = async (): Promise<
  Destination[] | null
> => {
  const url = `${process.env.STRAPI_URL}/api/countries?fields[0]=name&fields[1]=continent`;
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
  const url = `${process.env.STRAPI_URL}/api/blogs?filters[publishedAt][$notNull]=true&fields[0]=slug&fields[1]=updatedAt&populate[countries][fields][0]=slug`;

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

    // Handle many-to-many relationship - flatten blogs by countries
    const blogSlugs: SlugWithCountry[] = [];
    data.data.forEach(
      (item: {
        id: number;
        attributes: {
          slug: string;
          updatedAt: string;
          countries?: { data: { attributes: { slug: string } }[] };
        };
      }) => {
        if (item.attributes.countries?.data) {
          item.attributes.countries.data.forEach(
            (country: { attributes: { slug: string } }) => {
              blogSlugs.push({
                id: item.id,
                slug: item.attributes.slug,
                updatedAt: item.attributes.updatedAt,
                countrySlug: country.attributes.slug,
              });
            },
          );
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
