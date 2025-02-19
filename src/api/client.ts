import { BASE_URL } from "app/urls";

export async function fetchBlogPost(category: string, slug: string) {
  const url = `${BASE_URL}/api/blogs?filters[categories][slug][$eq]=${category}&filter[slug][$eq]=${slug}&populate=categories`;

  // const res = await fetch(url);
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return null;

  const data = await res.json();

  return data?.data[0]?.attributes || null;
}
