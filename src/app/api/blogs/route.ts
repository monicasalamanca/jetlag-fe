import { NextRequest, NextResponse } from "next/server";
import { BlogPostResponseV5 } from "@/api/types";

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
  const url = `${baseUrl}/api/blogs?filters[country][slug][$eq]=${countrySlug}&sort=publishedAt:desc&populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[images][fields][2]=alternativeText&populate[images][fields][3]=width&populate[images][fields][4]=height&populate[country][fields][0]=name&populate[country][fields][1]=slug&populate[tags][fields][0]=name&pagination[pageSize]=100`;

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
    const blogs = blogData.data.map((item: BlogPostResponseV5) => ({
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
