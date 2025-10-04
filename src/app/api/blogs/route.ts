import { NextRequest, NextResponse } from "next/server";
import { BlogPost, BlogPostResponse } from "@/api/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const countrySlug = searchParams.get("country");

  if (!countrySlug) {
    return NextResponse.json(
      { error: "Country slug is required" },
      { status: 400 },
    );
  }

  const strapiUrl =
    process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const baseUrl = strapiUrl || "https://jetlag-be-production.up.railway.app";
  const url = `${baseUrl}/api/blogs?sort=publishedAt:desc&populate[images]=*&populate[countries]=*`;

  try {
    // Server-side can access all environment variables
    const token =
      process.env.STRAPI_TOKEN ||
      process.env.STRAPI_READ_API_TOKEN ||
      process.env.STRAPI_API_READ_TOKEN ||
      process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!token) {
      console.error("No API token found on server");
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 },
      );
    }

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch blogs for ${countrySlug}: `,
        res.statusText,
      );
      return NextResponse.json(
        { error: "Failed to fetch blogs" },
        { status: res.status },
      );
    }

    const blogData = await res.json();

    // Transform the data
    const allBlogs = blogData.data.map((item: BlogPostResponse) => ({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      content: item.attributes.content,
      publishedAt: item.attributes.publishedAt,
      likes: item.attributes.likes,
      slug: item.attributes.slug,
      imageUrl:
        item.attributes.images?.data?.[0]?.attributes?.formats?.thumbnail
          ?.url ||
        item.attributes.images?.data?.[0]?.attributes?.formats?.medium?.url ||
        item.attributes.images?.data?.[0]?.attributes?.formats?.small?.url,
      countries:
        item.attributes.countries?.data?.map(
          (country) => country.attributes.name,
        ) || [],
    }));

    // Filter for specific country content
    if (countrySlug === "thailand") {
      const filteredBlogs = allBlogs.filter(
        (blog: BlogPost) =>
          blog.title.toLowerCase().includes("thailand") ||
          blog.title.toLowerCase().includes("thai") ||
          blog.content.toLowerCase().includes("thailand") ||
          blog.slug.includes("thailand"),
      );
      return NextResponse.json(filteredBlogs);
    }

    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error(`Error fetching blogs for ${countrySlug}: `, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
