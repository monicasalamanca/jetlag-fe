export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import {
  fetchAllBlogSlugsFromCountries,
  fetchAllCountries,
  fetchAllBlogSlugsFromLifestyle,
} from "@/api/client";
import {
  CountryNameFormatted,
  SlugForLifestyle,
  SlugWithCountry,
} from "@/api/types";

export async function GET() {
  try {
    const postsFromCountries = await fetchAllBlogSlugsFromCountries();
    const countries = await fetchAllCountries();
    const postsFromLifestyle = await fetchAllBlogSlugsFromLifestyle();

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://thejetlagchronicles.com";

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
      (countries &&
        countries
          .map(
            (country: CountryNameFormatted) => `
      <url>
        <loc>${baseUrl}/${country.slug}</loc>
        <lastmod>${new Date(country.updatedAt).toISOString()}</lastmod>
        <priority>1.0</priority>
        <changefreq>monthly</changefreq>
      </url>`,
          )
          .join("")) ||
      "";

    const dynamicCountryBlogsRoutes =
      (postsFromCountries &&
        postsFromCountries
          .map(
            (post: SlugWithCountry) => `
      <url>
        <loc>${baseUrl}/${post.countrySlug}/${post.slug}</loc>
        <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
        <priority>0.8</priority>
        <changefreq>weekly</changefreq>
      </url>`,
          )
          .join("")) ||
      "";

    const lifestyleRoute = `<url>
      <loc>${baseUrl}/lifestyle</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
      <changefreq>monthly</changefreq>
    </url>`;

    const dynamicLifestyleRoutes =
      (postsFromLifestyle &&
        postsFromLifestyle
          .map(
            (post: SlugForLifestyle) => `
        <url>
          <loc>${baseUrl}/lifestyle/${post.slug}</loc>
          <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
          <priority>0.8</priority>
          <changefreq>weekly</changefreq>
        </url>`,
          )
          .join("")) ||
      "";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${staticRoutes}
          ${lifestyleRoute}
          ${dynamicCountryRoutes}
          ${dynamicCountryBlogsRoutes}
          ${dynamicLifestyleRoutes}
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
