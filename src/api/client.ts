import {
  BlogPost,
  BlogPostResponse,
  ContactUsInfo,
  // CountriesResponse,
  Country,
  Destination,
  Post,
  Slug,
  SlugsResponse,
} from "./types";

// gets one country from params
// this is used for the country page
export const fetchCountry = async (
  countryName: string
): Promise<Country[] | null> => {
  const query = new URLSearchParams({
    "filters[slug][$eq]": countryName,
    "populate[quickFacts]": "*",
    "populate[deepInfo][populate]": "image",
  }).toString();
  // const url = `http://localhost:1337/api/countries?filters[slug][$eq]=${countryName}&populate[quickFacts]=*&populate[deepInfo][populate]=image`;
  const url = `${process.env.STRAPI_URL}/countries?${query}`;

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

// Fetch a blog post based on the category and the slug
export const fetchBlogPost = async (
  category: string,
  slug: string
): Promise<Post[] | null> => {
  const url = `${process.env.STRAPI_URL}/api/blogs?filters[category][slug][$eq]=${category}&filter[slug][$eq]=${slug}&populate=category`;
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

// gets all the latest blog posts
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
  const url = `${process.env.STRAPI_URL}/countries?fields[0]=name&fields[1]=continent`;
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
  const url = `${process.env.STRAPI_URL}/api/contact-messages`;

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

// fetch all the blog slugs
// this is used to generate the sitemap
export const fetchAllBlogSlugs = async (): Promise<Slug[] | null> => {
  const url = `${process.env.STRAPI_URL}/api/blogs?fields[0]=slug&fields[1]=updatedAt&populate[category][fields][0]=slug`;

  try {
    const res = await fetch(url, {
      // cache: "no-store",
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch all blog slugs: ", res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data.map((item: SlugsResponse) => ({
      id: item.id,
      slug: item.attributes.slug,
      updatedAt: item.attributes.updatedAt,
      categoryType: item.attributes.category.data.attributes.type,
      categorySlug: item.attributes.category.data.attributes.slug,
    }));
  } catch (error) {
    console.error("Error fetching all blog slugs: ", error);
    return null;
  }
};
