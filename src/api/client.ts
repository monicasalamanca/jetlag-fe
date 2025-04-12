import { BASE_URL } from "app/urls";
import {
  BlogPost,
  BlogPostResponse,
  ContactUsInfo,
  CountriesResponse,
  Country,
  Destination,
  Post,
  Slug,
  SlugsResponse,
} from "./types";

// get all the blog info
export const fetchBlogPost = async (
  category: string,
  slug: string
): Promise<Post[] | null> => {
  const url = `${BASE_URL}/api/blogs?filters[category][slug][$eq]=${category}&filter[slug][$eq]=${slug}&populate=category`;
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } }); // its cached for a week

    if (!res.ok) {
      console.error("Failed to fetch a blog post: ", res.statusText);
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
    }));
  } catch (error) {
    console.error("Error fetching a blog post: ", error);
    return null;
  }
};

// gets all the blogs from only one category
// TODO: to use on category country page
// THIS IS NOT USED
export const fetchBlogPostsFromCategory = async (
  category: string
): Promise<null> => {
  const url = `${BASE_URL}/api/blogs?filters[categories][slug][$eq]=${category}&populate=categories`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return null;

  const data = await res.json();

  return data?.data || null;
};

// gets all the latest blog posts
// TODO: as it gets bigger limit to 3 or 4 posts only
export const fetchLatestBlogPosts = async (): Promise<BlogPost[] | null> => {
  // const url = `${BASE_URL}/api/blogs?sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=3&populate[images]=*&populate[category]=*`;
  const url = `${BASE_URL}/api/blogs?sort=publishedAt:desc&populate[images]=*&populate[category]=*`;

  try {
    const res = await fetch(url, { next: { revalidate: 604800 } }); // it caches for a week

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

// fetchs all the countries
// THIS IS NOT USED
export const fetchAllCountries = async (): Promise<Country[] | null> => {
  const url = `${BASE_URL}/api/countries`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("Failed to fetch all countries: ", res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data.map((item: CountriesResponse) => ({
      id: item.id,
      name: item.attributes.name,
      continent: item.attributes.continent,
      headline: item.attributes.headline,
      description: item.attributes.description,
      mapLink: item.attributes.mapLink,
      language: item.attributes.language,
      power: item.attributes.power,
      currency: item.attributes.currency,
      timeZone: item.attributes.timeZone,
      summerTemp: item.attributes.summerTemp,
      winterTemp: item.attributes.winterTemp,
      springTemp: item.attributes.springTemp,
      automnTemp: item.attributes.automnTemp,
      springBestTimeToTravel: item.attributes.springBestTimeToTravel,
      summerBestTimeToTravel: item.attributes.summerBestTimeToTravel,
      autonmBestTimeToTravel: item.attributes.automnBestTimeToTravel,
      winterBestTimeToTravel: item.attributes.winterBestTimeToTravel,
      foodDishes: item.attributes.foodDishes,
      foodDescription: item.attributes.foodDescription,
      religions: item.attributes.religions,
      religionDescription: item.attributes.religionDescription,
      cultureItems: item.attributes.cultureItems,
      cultureDescription: item.attributes.cultureDescription,
      crimeAndSafetyIndex: item.attributes.crimeAndSafetyIndex,
      crimeAndSafetyDescription: item.attributes.crimeAndSafetyDescription,
    }));
  } catch (error) {
    console.error("Error fetching all countries: ", error);
    return null;
  }
};

// gets one country from params
export const fetchCountry = async (
  countryName: string
): Promise<Country[] | null> => {
  const url = `${BASE_URL}/api/countries?filters[name][$eq]=${countryName}&pogination[limit]=1`;

  try {
    const res = await fetch(url, { next: { revalidate: 604800 } }); // its cached for a week

    if (!res.ok) {
      console.error("Failed fetching to fetch one country: ", res.statusText);
      return null;
    }

    const data = await res.json();
    return data.data.map((item: CountriesResponse) => ({
      id: item.id,
      name: item.attributes.name,
      continent: item.attributes.continent,
      headline: item.attributes.headline,
      description: item.attributes.description,
      mapLink: item.attributes.mapLink,
      language: item.attributes.language,
      power: item.attributes.power,
      currency: item.attributes.currency,
      timeZone: item.attributes.timeZone,
      summerTemp: item.attributes.summerTemp,
      winterTemp: item.attributes.winterTemp,
      springTemp: item.attributes.springTemp,
      automnTemp: item.attributes.automnTemp,
      springBestTimeToTravel: item.attributes.springBestTimeToTravel,
      summerBestTimeToTravel: item.attributes.summerBestTimeToTravel,
      automnBestTimeToTravel: item.attributes.automnBestTimeToTravel,
      winterBestTimeToTravel: item.attributes.winterBestTimeToTravel,
      foodDishes: item.attributes.foodDishes,
      foodDescription: item.attributes.foodDescription,
      religions: item.attributes.religions,
      religionDescription: item.attributes.religionDescription,
      cultureItems: item.attributes.cultureItems,
      cultureDescription: item.attributes.cultureDescription,
      crimeAndSafetyIndex: item.attributes.crimeAndSafetyIndex,
      crimeAndSafetyDescription: item.attributes.crimeAndSafetyDescription,
    }));
  } catch (error) {
    console.error("Error fetching the page country: ", error);
    return null;
  }
};

// gets the list of countries with existing blogs
export const fetchCountriesWithContinents = async (): Promise<
  Destination[] | null
> => {
  const url = `${BASE_URL}/api/countries?fields[0]=name&fields[1]=continent`;
  try {
    const res = await fetch(url, { next: { revalidate: 604800 } }); // its cached for a week
    if (!res.ok) {
      console.error("Failed to fetch countries: ", res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data.map((item: CountriesResponse) => ({
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
  const url = `${BASE_URL}/api/contact-messages`;

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
      cache: "no-store",
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
      category: item.attributes.category.data.attributes.slug,
    }));
  } catch (error) {
    console.error("Error fetching all blog slugs: ", error);
    return null;
  }
};
