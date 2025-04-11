// src/app/api/sitemap/regenerate/route.ts
import { NextResponse } from "next/server";
import { fetchAllBlogSlugs } from "@/api/client"; // this assumes your Strapi logic is in src/api/client.ts
import fs from "fs";
import path from "path";
import { Slug } from "@/api/types";

const SECRET = process.env.SITEMAP_SECRET || "";

export async function POST(req: Request) {
  const headerSecret = req.headers.get("x-sitemap-secret");
  if (headerSecret !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await fetchAllBlogSlugs(); // We'll define this next if you haven't already

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://jetlag-fe.vercel.app/";

    const staticRoutes = ["", "about-us", "chronicles"]
      .map(
        (path) => `
<url>
  <loc>${baseUrl}/${path}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes}
${
  posts &&
  posts
    .map(
      (post: Slug) => `
  <url>
    <loc>${baseUrl}/${post.category}/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
  </url>`
    )
    .join("")
}
</urlset>`;

    fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), sitemap);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sitemap generation failed:", err);
    return NextResponse.json(
      { error: "Sitemap generation failed" },
      { status: 500 }
    );
  }
}
