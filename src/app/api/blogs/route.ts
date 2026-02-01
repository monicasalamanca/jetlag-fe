import { NextRequest, NextResponse } from "next/server";
import { BlogPostResponse } from "@/api/types";

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

  // Build Strapi filter for country - filter by the country relation's slug
  const url = `${baseUrl}/api/blogs?filters[country][slug][$eq]=${countrySlug}&sort=publishedAt:desc&populate[images]=*&populate[country]=*&populate[tags]=*&pagination[pageSize]=100`;

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

    // Transform the data - Strapi already filtered by country, so no need to filter again
    const blogs = blogData.data.map((item: BlogPostResponse) => ({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      content: item.attributes.content,
      publishedAt: item.attributes.publishedAt,
      slug: item.attributes.slug,
      imageUrl:
        item.attributes.images?.data?.[0]?.attributes?.formats?.thumbnail
          ?.url ||
        item.attributes.images?.data?.[0]?.attributes?.formats?.medium?.url ||
        item.attributes.images?.data?.[0]?.attributes?.formats?.small?.url,
      country: item.attributes.country?.data?.attributes?.name,
      tags: item.attributes.tags?.data?.map((tag) => tag.attributes.name) || [],
      lifestyle: item.attributes.lifestyle || false,
    }));

    return NextResponse.json(blogs);
  } catch (error) {
    console.error(`Error fetching blogs for ${countrySlug}: `, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
