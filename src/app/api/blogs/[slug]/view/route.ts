// import { NextResponse } from "next/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/")[4]; // blogs/[slug]/view

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const strapiUrl = process.env.STRAPI_URL;
  const strapiToken = process.env.STRAPI_WRITE_API_TOKEN;

  try {
    const res = await fetch(
      `${strapiUrl}/api/blogs?filters[slug][$eq]=${slug}&fields[0]=views`,
      {
        headers: {
          Authorization: `Bearer ${strapiToken}`,
        },
      }
    );

    const data = await res.json();
    const blog = data.data?.[0];
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const blogId = blog.id;
    const currentViews = blog.attributes.views || 0;

    await fetch(`${strapiUrl}/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      body: JSON.stringify({
        data: {
          views: currentViews + 1,
        },
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[VIEW ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update views" },
      { status: 500 }
    );
  }
}
