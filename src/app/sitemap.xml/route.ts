export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import {
  fetchAllBlogSlugsFromCountries,
  fetchAllBlogSlugsFromCategory,
} from "@/api/client";
import { SlugWithCategory, SlugWithCountry } from "@/api/types";

export async function GET() {
  try {
    const postsFromCountries = await fetchAllBlogSlugsFromCountries();
    const postsFromCategories = await fetchAllBlogSlugsFromCategory();

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://thejetlagchronicles.com/";

    const staticRoutes = ["", "about-us", "chronicles"]
      .map(
        (path) => `
<url>
  <loc>${baseUrl}/${path}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</url>`,
      )
      .join("");

    const dynamicCountryRoutes =
      (postsFromCountries &&
        postsFromCountries
          .map(
            (post: SlugWithCountry) => `
      <url>
        <loc>${baseUrl}/${post.countrySlug}/${post.slug}</loc>
        <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
      </url>`,
          )
          .join("")) ||
      "";

    const dynamicCategoryRoutes =
      (postsFromCategories &&
        postsFromCategories
          .map(
            (post: SlugWithCategory) => `
        <url>
          <loc>${baseUrl}/${post.categorySlug}/${post.slug}</loc>
          <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
        </url>`,
          )
          .join("")) ||
      "";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${staticRoutes}
          ${dynamicCountryRoutes}
          ${dynamicCategoryRoutes}
        </urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("[SITEMAP_ERROR]", error);

    return NextResponse.json(
      { error: "Failed to generate sitemap" },
      { status: 500 },
    );
  }
}
