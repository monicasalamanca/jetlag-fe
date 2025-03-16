import { BASE_URL } from "app/urls";
import { BlogPost, BlogPostResponse } from "./types";

export async function fetchBlogPost(category: string, slug: string) {
  const url = `${BASE_URL}/api/blogs?filters[category][slug][$eq]=${category}&filter[slug][$eq]=${slug}&populate=category`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return null;

  const data = await res.json();

  return data.data.map((item: BlogPostResponse) => ({
    id: item.id,
    title: item.attributes.title,
    description: item.attributes.description,
    content: item.attributes.content,
    publishedAt: item.attributes.publishedAt,
    likes: item.attributes.likes,
  }));
}

// gets all the blogs from only one category
export async function fetchBlogPostsFromCategory(category: string) {
  const url = `${BASE_URL}/api/blogs?filters[categories][slug][$eq]=${category}&populate=categories`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return null;

  const data = await res.json();

  return data?.data || null;
}

export const fetchLatestBlogPosts = async (): Promise<BlogPost[] | null> => {
  const url = `${BASE_URL}/api/blogs?sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=3&populate[images]=*&populate[category]=*`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return null;

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
};
