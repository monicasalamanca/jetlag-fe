export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { fetchAllBlogSlugs } from "@/api/client";
import { Slug } from "@/api/types";

export async function GET() {
  try {
    const posts = await fetchAllBlogSlugs();

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://thejetlagchronicles.com/";

    const staticRoutes = ["", "about-us", "chronicles"]
      .map(
        (path) => `
<url>
  <loc>${baseUrl}/${path}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</url>`
      )
      .join("");

    const dynamicRoutes =
      posts &&
      posts
        .map(
          (post: Slug) => `
      <url>
        <loc>${baseUrl}/${post.categorySlug}/${post.slug}</loc>
        <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
      </url>`
        )
        .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${staticRoutes}
          ${dynamicRoutes}
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
      { status: 500 }
    );
  }
}
